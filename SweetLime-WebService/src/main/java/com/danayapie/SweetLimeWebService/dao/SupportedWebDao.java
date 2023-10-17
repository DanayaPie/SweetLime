package com.danayapie.SweetLimeWebService.dao;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.danayapie.SweetLimeWebService.model.SupportedWebsite;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class SupportedWebDao {

    private Logger logger = LoggerFactory.getLogger(SupportedWebDao.class);

    @Autowired
    private DynamoDBMapper dynamoDBMapper;

    public List<SupportedWebsite> getAllSupportedWeb() {
        logger.info("SupportedWebDao.getAllSupportedWeb() invoked");

        DynamoDBScanExpression scanExpression = new DynamoDBScanExpression();
        List<SupportedWebsite> allSupportedWebs = dynamoDBMapper.scan(SupportedWebsite.class, scanExpression);

        return allSupportedWebs;
    }
}
