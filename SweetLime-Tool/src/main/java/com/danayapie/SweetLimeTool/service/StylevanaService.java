package com.danayapie.SweetLimeTool.service;

import com.danayapie.SweetLimeTool.dao.StylevanaDao;
import com.danayapie.SweetLimeTool.model.Product;
import com.danayapie.SweetLimeTool.utility.StylevanaUtil;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.micrometer.common.util.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.security.InvalidParameterException;
import java.time.Instant;
import java.util.*;

@Service
public class StylevanaService {

    private Logger logger = LoggerFactory.getLogger(StylevanaService.class);

    @Autowired
    StylevanaDao stylevanaDao;

    public List<Product> addProductByUrl(String productUrl) throws IOException {
        logger.info("StylevanaService.addProductByUrl() invoked");

        // validate blank url
        if (StringUtils.isBlank(productUrl)) {
            throw new InvalidParameterException("URL cannot be blank.");
        }

        // get product json string from url
        List<String> productInfoFromURL = StylevanaUtil.extractProductInfoJsonString(productUrl);
        String productNamePriceJson = productInfoFromURL.get(0);
        String productAttributesJson = productInfoFromURL.get(1);

        logger.debug("productJsonStr: " + productNamePriceJson);
        logger.debug("productAttributesJson: " + productAttributesJson);

        ObjectMapper objectMapper = new ObjectMapper();

        /*
            mapping + unmarshalling: product name, priceHistory, url, and createdDate
         */
        JsonNode namePriceJsonNode = objectMapper.readTree(productNamePriceJson);
        logger.debug("namePriceNode: " + namePriceJsonNode);

        Map<String, Product> productsToAddMap = new HashMap<>();

        Iterator<String> iterProduct = namePriceJsonNode.fieldNames();
        while (iterProduct.hasNext()) {
            productsToAddMap.put(iterProduct.next(), new Product());
        }

        long createdDate = Instant.now().getEpochSecond();

        for (Map.Entry<String, Product> entry : productsToAddMap.entrySet()) {
            String name = namePriceJsonNode.get(entry.getKey()).get("name").asText();
            String priceStr = namePriceJsonNode.get(entry.getKey()).get("final_price").asText();
            long priceCent = Math.round(Double.parseDouble(priceStr) * 100);

            Map<String, Long> priceHistoryMap = new HashMap();
            priceHistoryMap.put("Price", priceCent);
            priceHistoryMap.put("UpdatedDate", createdDate);

            List<Map<String, Long>> priceHistoryList = new ArrayList<>();
            priceHistoryList.add(priceHistoryMap);

            Product product = new Product();
            product.setProductUrl(productUrl);
            product.setProductName(name);
            product.setPriceHistory(priceHistoryList);
            product.setCreatedDate(createdDate);

            productsToAddMap.put(entry.getKey(), product);
        }

        /*
            mapping + unmarshalling attributes
            - Product can have up to 2 attributes; Color or Color and Milliliter or Color and Piece
         */
        JsonNode attributesJsonNode = objectMapper.readTree(productAttributesJson).get("attributes");
        logger.debug("attributesJsonNode: " + attributesJsonNode);

        List<String> attributesToAddList = new ArrayList();

        Iterator<String> iterAttribute = attributesJsonNode.fieldNames();
        while (iterAttribute.hasNext()) {
            attributesToAddList.add(iterAttribute.next());
        }

        // unmarshalling Color
        JsonNode colorJsonNode = attributesJsonNode.get("183").get("options");
        for (int i = 0; i < colorJsonNode.size(); i++) {
            String stylevanaProductId = colorJsonNode.get(i).get("products").get(0).asText();
            logger.debug("colorJsonNode.get(i).get(\"products\"): " + colorJsonNode.get(i).get("products").get(0).asText());

            if (productsToAddMap.containsKey(stylevanaProductId)) {
                Map<String, String> colorMap = new HashMap<>();
                colorMap.put("Color", colorJsonNode.get(i).get("label").asText());

                Product productToAdd = productsToAddMap.get(stylevanaProductId);
                productToAdd.setOptions(colorMap);
            }
        }

        if (attributesToAddList.size() > 1) {

            // unmarshalling Beauty Milliliter
            if (attributesToAddList.get(1) == "194") {
                JsonNode mlJsonNode = attributesJsonNode.get("194").get("options");
                for (int i = 0; i < mlJsonNode.size(); i++) {
                    String stylevanaProductId = colorJsonNode.get(i).get("products").get(0).asText();

                    if (productsToAddMap.containsKey(stylevanaProductId)) {
                        Product productToadd = productsToAddMap.get(stylevanaProductId);

                        Map<String, String> sizeMap = productToadd.getOptions();
                        sizeMap.put("Size", mlJsonNode.get(i).get("label").asText());

                        productToadd.setOptions(sizeMap);
                    }
                }

                // unmarshalling Beauty Piece
            } else if (attributesToAddList.get(1) == "198") {
                JsonNode pieceJsonNode = attributesJsonNode.get("198").get("options");
                for (int i = 0; i < pieceJsonNode.size(); i++) {
                    String stylevanaProductId = colorJsonNode.get(i).get("products").get(0).asText();

                    if (productsToAddMap.containsKey(stylevanaProductId)) {
                        Product productToadd = productsToAddMap.get(stylevanaProductId);

                        Map<String, String> sizeMap = productToadd.getOptions();
                        sizeMap.put("Size", pieceJsonNode.get(i).get("label").asText());

                        productToadd.setOptions(sizeMap);
                    }
                }
            }
        }

        List<Product> productsToAddList = new ArrayList<>();
        for (Map.Entry<String, Product> entry : productsToAddMap.entrySet()) {
            productsToAddList.add(entry.getValue());
        }

        stylevanaDao.addProductByUrl(productsToAddList);
        return productsToAddList;
    }

    public List<Product> getAllProducts() {
        logger.info("StylevanaService.getAllProducts() invoked");

        return stylevanaDao.getAllProducts();
    }

    public List<Product> batchUpdateProducts() throws IOException, InterruptedException {
        logger.info("StylevanaService.batchUpdateProducts() invoked");

        List<Product> productsToUpdate = getAllProducts();
        Map<String, List<Product>> productsByUrlMap = new HashMap<>();

        // group product with the same url
        for (Product product : productsToUpdate) {
            String productUrl = product.getProductUrl();

            if (!productsByUrlMap.containsKey(productUrl)) {
                productsByUrlMap.put(productUrl, new ArrayList<Product>());
            }
            productsByUrlMap.get(productUrl).add(product);
        }

        List<Product> productsToUpdateList = new ArrayList<>();

        for (Map.Entry<String, List<Product>> entry : productsByUrlMap.entrySet()) {
            // get json string from url
            String productNamePriceJson = StylevanaUtil.extractPriceJsonString(entry.getKey());

            // unmarshalling price and name Json String to Json obj
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode namePriceJsonNode = objectMapper.readTree(productNamePriceJson);

            for (Iterator<String> fieldNames = namePriceJsonNode.fieldNames(); fieldNames.hasNext(); ) {
                logger.debug("fieldNames: " + fieldNames);

                String productToUpdate = fieldNames.next();
                String name = namePriceJsonNode.get(productToUpdate).get("name").asText();
                String priceStr = namePriceJsonNode.get(productToUpdate).get("final_price").asText();
                long priceCent = Math.round(Double.parseDouble(priceStr) * 100);

                for (Product product : entry.getValue()) {
                    if (product.getProductName().equals(name)) {
                        logger.debug("product name match");

                        List<Map<String, Long>> priceHistoryList = product.getPriceHistory();

                        if (priceHistoryList.get(priceHistoryList.size() - 1).get("Price") != priceCent) {
                            logger.debug("price changed");

                            long updatedDate = Instant.now().getEpochSecond();
                            Map<String, Long> priceHistoryMap = new HashMap<>();
                            priceHistoryMap.put("Price", priceCent);
                            priceHistoryMap.put("UpdatedDate", updatedDate);
                            priceHistoryList.add(priceHistoryMap);
                            productsToUpdateList.add(product);
                        }
                    }
                }
            }

            Thread.sleep(60000);
        }

        stylevanaDao.batchUpdateProducts(productsToUpdateList);
        return productsToUpdateList;
    }
}
