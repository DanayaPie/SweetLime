package com.danayapie.SweetLimeTool.service;

import com.danayapie.SweetLimeTool.model.Product;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.micrometer.common.util.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.math.BigDecimal;
import java.net.URL;
import java.security.InvalidParameterException;
import java.time.Instant;
import java.util.*;

@Service
public class StylevanaService {

    private Logger logger = LoggerFactory.getLogger(StylevanaService.class);


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

        logger.info("productJsonStr: " + productNamePriceJson);
        logger.info("productAttributesJson: " + productAttributesJson);

        /*
            unmarshalling/ parsing/ deserialize Json String to Json obj
         */
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Product> productsToAdd = new HashMap<>();

        JsonNode namePriceJsonNode = objectMapper.readTree(productNamePriceJson);
        logger.info("namePriceNode: " + namePriceJsonNode);

        JsonNode attributesJsonNode = objectMapper.readTree(productAttributesJson);
        logger.info("attributesJsonNode: " + attributesJsonNode);

        // mapping and unmarshalling product name, priceHistory, and url
        Iterator<String> iter = namePriceJsonNode.fieldNames();
        while (iter.hasNext()) {
            productsToAdd.put(iter.next(), new Product());
        }

        long updatedDate = Instant.now().getEpochSecond();

        for (Map.Entry<String, Product> entry : productsToAdd.entrySet()) {
            String name = namePriceJsonNode.get(entry.getKey()).get("name").asText();
            String priceStr = namePriceJsonNode.get(entry.getKey()).get("price").asText();

            double dollars = Double.parseDouble(priceStr);
            logger.debug("price: " + Math.round(dollars * 100));

            Map<String, Long> priceHistoryMap = new HashMap();
            priceHistoryMap.put("Price", Math.round(dollars * 100));
            priceHistoryMap.put("UpdatedDate", updatedDate);

            List<Map<String, Long>> priceHistoryList = new ArrayList<>();
            priceHistoryList.add(priceHistoryMap);

            Product product = new Product();
            product.setProductUrl(productUrl);
            product.setProductName(name);
            product.setPriceHistory(priceHistoryList);

            productsToAdd.put(entry.getKey(), product);
        }

        logger.info("here");

        // mapping and unmarshalling color and size attributes


        logger.info("productsToAdd.toString(): " + productsToAdd);



//        Product productToAdd = objectMapper.readValue(productJsonStr, Product.class);
//
//        logger.info("productToAdd: " + String.valueOf(productToAdd));

        return null;
    }
}
