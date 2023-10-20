package com.danayapie.SweetLimeWebService.dao;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.danayapie.SweetLimeWebService.model.Product;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class ProductDao {

    private Logger logger = LoggerFactory.getLogger(ProductDao.class);

    @Autowired
    private DynamoDBMapper dynamoDBMapper;

    public List<Product> getProductByUrl(String productUrl) {
        logger.info("ProductDao.getProductByUrl() invoked");

        Map<String, AttributeValue> evaMap = new HashMap<>();
        evaMap.put(":productUrl", new AttributeValue().withS(productUrl));

        DynamoDBScanExpression scanExpression = new DynamoDBScanExpression()
                .withFilterExpression("ProductUrl = :productUrl")
                .withExpressionAttributeValues(evaMap);

        List<Product> productsRetrieved = dynamoDBMapper.scan(Product.class, scanExpression);
        return productsRetrieved;
    }
}
