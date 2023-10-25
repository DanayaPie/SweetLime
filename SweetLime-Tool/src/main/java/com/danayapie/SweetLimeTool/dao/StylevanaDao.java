package com.danayapie.SweetLimeTool.dao;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.danayapie.SweetLimeTool.model.Product;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class StylevanaDao {

    private Logger logger = LoggerFactory.getLogger(StylevanaDao.class);

    @Autowired
    private DynamoDBMapper dynamoDBMapper;

    public List<DynamoDBMapper.FailedBatch> addProductByUrl(List<Product> productsToAddList) {
        logger.info("StylevanaDao.addProductByUrl() invoked");

        return dynamoDBMapper.batchSave(productsToAddList);
    }

    public List<Product> getAllProducts() {
        logger.info("StylevanaDao.getAllProducts() invoked");

        DynamoDBScanExpression scanExpression = new DynamoDBScanExpression();
        return dynamoDBMapper.scan(Product.class, scanExpression);
    }

    public List<DynamoDBMapper.FailedBatch> batchUpdateProducts(List<Product> productsToUpdateList) {
        logger.info("StylevanaDao.batchUpdateProducts() invoked");

        return dynamoDBMapper.batchSave(productsToUpdateList);
    }
}
