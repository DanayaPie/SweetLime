package com.danayapie.SweetLimeWebService.dao;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBQueryExpression;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.amazonaws.services.dynamodbv2.model.ScanRequest;
import com.amazonaws.services.dynamodbv2.model.ScanResult;
import com.danayapie.SweetLimeWebService.model.SupportedWebsite;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class SupportedWebDao {

    private Logger logger = LoggerFactory.getLogger(SupportedWebDao.class);

    @Autowired
    private DynamoDBMapper dynamoDBMapper;

    public SupportedWebsite addWeb(SupportedWebsite webToAdd) {
        logger.info("SupportedWebDao.addWeb() invoked");

        dynamoDBMapper.save(webToAdd);
        return webToAdd;
    }

    public List<SupportedWebsite> getAllWeb() {
        logger.info("SupportedWebDao.getAllWeb() invoked");

        DynamoDBScanExpression scanExpression = new DynamoDBScanExpression();
        List<SupportedWebsite> allWebs = dynamoDBMapper.scan(SupportedWebsite.class, scanExpression);

        return allWebs;
    }

    public SupportedWebsite getWebById(String webId) {
        logger.info("SupportedWebDao.getWebById() invoked");

        SupportedWebsite webRetrieved = dynamoDBMapper.load(SupportedWebsite.class, webId);

        return webRetrieved;
    }

    public  List<SupportedWebsite> getWebByUrl(String domainName) {
        logger.info("SupportedWebDao.getWebByUrl() invoked");

        Map<String, AttributeValue> evaMap = new HashMap<>();
        evaMap.put(":domainName", new AttributeValue().withS(domainName));

        DynamoDBScanExpression scanExpression = new DynamoDBScanExpression()
                .withFilterExpression("DomainName = :domainName")
                .withExpressionAttributeValues(evaMap);

        List<SupportedWebsite> websRetrieved = dynamoDBMapper.scan(SupportedWebsite.class, scanExpression);
        return websRetrieved;
    }
}
