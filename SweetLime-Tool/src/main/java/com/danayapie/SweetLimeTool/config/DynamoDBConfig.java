package com.danayapie.SweetLimeTool.config;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.client.builder.AwsClientBuilder;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DynamoDBConfig {

    @Value("${aws.dynamodb.endpoint}")
    private String endpoint;

    @Value("${aws.dynamodb.region}")
    private String region;

    @Value("${aws.dynamodb.accessKey}")
    private String accessKey;

    @Value("${aws.dynamodb.secretKey}")
    private String secretKey;


    @Bean
    // constructs new mapper with the service object and configuration given enabling CRUD operations
    public DynamoDBMapper dynamoDBMapper() {
        return new DynamoDBMapper(buildAmazonDynamoDB());

    }

    // create a new client for accessing dynamoDB using endpoint URL
    private AmazonDynamoDB buildAmazonDynamoDB() {
        return AmazonDynamoDBClientBuilder
                .standard()
                .withEndpointConfiguration(
                        new AwsClientBuilder.EndpointConfiguration(
                                endpoint,
                                region))
                .withCredentials(new AWSStaticCredentialsProvider(
                        new BasicAWSCredentials(
                                accessKey,
                                secretKey)))
                .build();
    }
}
