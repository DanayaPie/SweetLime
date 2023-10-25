package com.danayapie.SweetLimeTool.service;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBSaveExpression;
import com.amazonaws.services.dynamodbv2.model.ComparisonOperator;
import com.amazonaws.services.dynamodbv2.model.ExpectedAttributeValue;
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

        /*
            unmarshalling/ parsing/ deserialize Json String to Json obj
         */
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Product> productsToAddMap = new HashMap<>();

        // mapping and unmarshalling product name, priceHistory, url, and createdDate
        JsonNode namePriceJsonNode = objectMapper.readTree(productNamePriceJson);
        logger.debug("namePriceNode: " + namePriceJsonNode);

        Iterator<String> iter = namePriceJsonNode.fieldNames();
        while (iter.hasNext()) {
            productsToAddMap.put(iter.next(), new Product());
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

        // mapping and unmarshalling color and size attributes
        JsonNode attributesJsonNode = objectMapper.readTree(productAttributesJson);
        logger.debug("attributesJsonNode: " + attributesJsonNode);

        // unmarshalling Color
        JsonNode colorJsonNode = attributesJsonNode.get("attributes").get("183").get("options");

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

        // unmarshalling Beauty Milliliter
        JsonNode mlJsonNode = attributesJsonNode.get("attributes").get("194").get("options");

        for (int i = 0; i < mlJsonNode.size(); i++) {

            String stylevanaProductId = colorJsonNode.get(i).get("products").get(0).asText();

            if (productsToAddMap.containsKey(stylevanaProductId)) {

                Product productToadd = productsToAddMap.get(stylevanaProductId);

                Map<String, String> sizeMap = productToadd.getOptions();
                sizeMap.put("Size", mlJsonNode.get(i).get("label").asText());

                productToadd.setOptions(sizeMap);
            }
        }

        logger.debug("productsToAddMap.toString(): " + productsToAddMap);

        List<Product> productsToAddList = new ArrayList<>();
        for (Map.Entry<String, Product> entry : productsToAddMap.entrySet()) {
            productsToAddList.add(entry.getValue());
        }

        stylevanaDao.addProductByUrl(productsToAddList);
        return productsToAddList;
    }

    public List<Product> getAllProducts() {
        logger.info("StylevanaService.getAllProducts() invoked");

        List<Product> allProducts = stylevanaDao.getAllProducts();

        return allProducts;
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

            /*
                unmarshalling Json String to Json obj
             */
            ObjectMapper objectMapper = new ObjectMapper();

            // unmarshalling and mapping product name, and priceHistory
            JsonNode namePriceJsonNode = objectMapper.readTree(productNamePriceJson);


            Iterator<String> iter = namePriceJsonNode.fieldNames();
            while (iter.hasNext()) {
                String productToUpdate = iter.next();
                logger.info("productToUpdate: " + productToUpdate);

                String name = namePriceJsonNode.get(productToUpdate).get("name").asText();
                String priceStr = namePriceJsonNode.get(productToUpdate).get("final_price").asText();

                long priceCent = Math.round(Double.parseDouble(priceStr) * 100);

                for (Product product : entry.getValue()) {
                    if (product.getProductName().equals(name)) {
                        logger.info("product name match");

                        List<Map<String, Long>> priceHistoryList = product.getPriceHistory();
                        if (priceHistoryList.get(0).get("Price") != priceCent) {
                            logger.info("product price not match");

                            long updatedDate = Instant.now().getEpochSecond();

                            Map<String, Long> priceHistoryMap = new HashMap<>();
                            priceHistoryMap.put("Price", priceCent);
                            priceHistoryMap.put("UpdatedDate", updatedDate);

                            priceHistoryList.add(priceHistoryMap);
                            
                            // add product to the updated list
                            productsToUpdateList.add(product);
                        }
                    }
                }
            }

            // sleep for 1 minute before extract another url
            Thread.sleep(60000);
        }

        stylevanaDao.batchUpdateProducts(productsToUpdateList);
        return productsToUpdateList;
    }
}