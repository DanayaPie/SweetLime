package com.danayapie.SweetLimeTool.service;

import com.danayapie.SweetLimeTool.dao.StylevanaDao;
import com.danayapie.SweetLimeTool.model.Product;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.micrometer.common.util.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.URL;
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
        String outStream = new Scanner(new URL(productUrl.trim()).openStream()).useDelimiter("\\A").next();
        String[] lines = outStream.split("\n");

        String productNamePriceJson = null;
        String productAttributesJson = null;

        for (int i = 0; i < lines.length; i++) {
            String line = lines[i].trim();
            if (line.contains("var myAssociatedProducts = ")) {
                int indexStart = line.indexOf(" = ") + 3;
                int indexEnd = line.indexOf(";");
                productNamePriceJson = line.substring(indexStart, indexEnd);
            }

            if (line.contains("var spConfig = ")) {
                int indexStart = line.indexOf("{");
                int indexEnd = line.indexOf(";");
                productAttributesJson = line.substring(indexStart, indexEnd);
            }
        }

        logger.debug("productJsonStr: " + productNamePriceJson);
        logger.debug("productAttributesJson: " + productAttributesJson);

        /*
            unmarshalling/ parsing/ deserialize Json String to Json obj
         */
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Product> productsToAdd = new HashMap<>();

        // mapping and unmarshalling product name, priceHistory, url, and createdDate
        JsonNode namePriceJsonNode = objectMapper.readTree(productNamePriceJson);
        logger.debug("namePriceNode: " + namePriceJsonNode);

        Iterator<String> iter = namePriceJsonNode.fieldNames();
        while (iter.hasNext()) {
            productsToAdd.put(iter.next(), new Product());
        }

        long createdDate = Instant.now().getEpochSecond();

        for (Map.Entry<String, Product> entry : productsToAdd.entrySet()) {
            String name = namePriceJsonNode.get(entry.getKey()).get("name").asText();
            String priceStr = namePriceJsonNode.get(entry.getKey()).get("price").asText();

            double dollars = Double.parseDouble(priceStr);
            logger.debug("price: " + Math.round(dollars * 100));

            Map<String, Long> priceHistoryMap = new HashMap();
            priceHistoryMap.put("Price", Math.round(dollars * 100));
            priceHistoryMap.put("UpdatedDate", createdDate);

            List<Map<String, Long>> priceHistoryList = new ArrayList<>();
            priceHistoryList.add(priceHistoryMap);

            Product product = new Product();
            product.setProductUrl(productUrl);
            product.setProductName(name);
            product.setPriceHistory(priceHistoryList);
            product.setCreatedDate(createdDate);

            productsToAdd.put(entry.getKey(), product);
        }

        // mapping and unmarshalling color and size attributes
        JsonNode attributesJsonNode = objectMapper.readTree(productAttributesJson);
        logger.debug("attributesJsonNode: " + attributesJsonNode);

        // unmarshalling Color
        JsonNode colorJsonNode = attributesJsonNode.get("attributes").get("183").get("options");

        for (int i = 0; i < colorJsonNode.size(); i++) {

            String stylevanaProductId = colorJsonNode.get(i).get("products").get(0).asText();
            logger.debug("colorJsonNode.get(i).get(\"products\"): " + colorJsonNode.get(i).get("products").get(0).asText());

            if (productsToAdd.containsKey(stylevanaProductId)) {

                Map<String, String> colorMap = new HashMap<>();
                colorMap.put("Color", colorJsonNode.get(i).get("label").asText());

                Product productToAdd = productsToAdd.get(stylevanaProductId);
                productToAdd.setOptions(colorMap);
            }
        }

        // unmarshalling Beauty Milliliter
        JsonNode mlJsonNode = attributesJsonNode.get("attributes").get("194").get("options");

        for (int i = 0; i < mlJsonNode.size(); i++) {

            String stylevanaProductId = colorJsonNode.get(i).get("products").get(0).asText();

            if (productsToAdd.containsKey(stylevanaProductId)) {

                Product productToadd = productsToAdd.get(stylevanaProductId);

                Map<String, String> sizeMap = productToadd.getOptions();
                sizeMap.put("Size", mlJsonNode.get(i).get("label").asText());

                productToadd.setOptions(sizeMap);
            }
        }

        logger.debug("productsToAdd.toString(): " + productsToAdd);

        List<Product> productsToAddList = new ArrayList<>();
        for (Map.Entry<String, Product> entry : productsToAdd.entrySet()) {
            productsToAddList.add(entry.getValue());
        }

        stylevanaDao.addProductByUrl(productsToAddList);
        return productsToAddList;
    }
}
