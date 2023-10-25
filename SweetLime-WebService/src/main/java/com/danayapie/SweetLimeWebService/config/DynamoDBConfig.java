package com.danayapie.SweetLimeWebService.config;

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
    public DynamoDBMapper dynamoDBMapper() {
        return new DynamoDBMapper(buildAmazonDynamoDB());

    }

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

//
//    @Bean
//    // create a new client for accessing dynamoDB using endpoint URL
//    public AmazonDynamoDB amazonDynamoDB() {
//        return AmazonDynamoDBClientBuilder.standard()
//                .withEndpointConfiguration(new AwsClientBuilder.EndpointConfiguration(endpoint, region))
//                .withCredentials(awsDynamoDBCredentials()).build();
//    }
//
//    // interface for providing AWS credentials
//    private AWSCredentialsProvider awsDynamoDBCredentials() {
//        return new AWSStaticCredentialsProvider(new BasicAWSCredentials(accessKey, secretKey));
//    }
//
//    @Primary
//    @Bean
//    // constructs new mapper with the service object and configuration given enabling CRUD operations
//    public DynamoDBMapper dynamoDBMapper(AmazonDynamoDB amazonDynamoDB, DynamoDBMapperConfig config) {
//        return new DynamoDBMapper(amazonDynamoDB, config);
//    }
//
//    @Primary
//    @Bean
//    public DynamoDBMapperConfig dynamoDBMapperConfig() {
//        return DynamoDBMapperConfig.builder()
//                // save operation will UPDATE all attributes where data is changed
//                .withSaveBehavior(DynamoDBMapperConfig.SaveBehavior.UPDATE)
//                // mapper instance uses an eventually consistent read request where the response might not reflect the latest changes made to the database, but it can lower latency and cost
//                .withConsistentReads(DynamoDBMapperConfig.ConsistentReads.EVENTUAL)
//                .withPaginationLoadingStrategy(DynamoDBMapperConfig.PaginationLoadingStrategy.LAZY_LOADING)
//                .build();
//    }
}
