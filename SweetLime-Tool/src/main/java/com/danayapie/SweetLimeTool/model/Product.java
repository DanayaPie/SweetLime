package com.danayapie.SweetLimeTool.model;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAutoGeneratedKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;

import java.util.List;
import java.util.Map;
import java.util.Objects;

@DynamoDBTable(tableName = "Product")
public class Product {

    @DynamoDBHashKey(attributeName = "ProductId")
    @DynamoDBAutoGeneratedKey
    private String productId;

    @DynamoDBAttribute(attributeName = "ProductName")
    private String productName;

    @DynamoDBAttribute(attributeName = "ProductUrl")
    private String productUrl;

    @DynamoDBAttribute(attributeName = "Options")
    private Map<String, String> options;

    @DynamoDBAttribute(attributeName = "PriceHistory")
    private List<Map<String, Long>> priceHistory;

    @DynamoDBAttribute(attributeName = "ImageLocation")
    private String imageLocation;

    @DynamoDBAttribute(attributeName = "CreatedDate")
    private long createdDate;

    @DynamoDBAttribute(attributeName = "DeletedDate")
    private long deletedDate;

    public Product() {
    }

    public Product(String productId, String productName, String productUrl, Map<String, String> options, List<Map<String, Long>> priceHistory, String imageLocation, long createdDate, long deletedDate) {
        this.productId = productId;
        this.productName = productName;
        this.productUrl = productUrl;
        this.options = options;
        this.priceHistory = priceHistory;
        this.imageLocation = imageLocation;
        this.createdDate = createdDate;
        this.deletedDate = deletedDate;
    }

    public String getProductId() {
        return productId;
    }

    public void setProductId(String productId) {
        this.productId = productId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getProductUrl() {
        return productUrl;
    }

    public void setProductUrl(String productUrl) {
        this.productUrl = productUrl;
    }

    public Map<String, String> getOptions() {
        return options;
    }

    public void setOptions(Map<String, String> options) {
        this.options = options;
    }

    public List<Map<String, Long>> getPriceHistory() {
        return priceHistory;
    }

    public void setPriceHistory(List<Map<String, Long>> priceHistory) {
        this.priceHistory = priceHistory;
    }

    public String getImageLocation() {
        return imageLocation;
    }

    public void setImageLocation(String imageLocation) {
        this.imageLocation = imageLocation;
    }

    public long getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(long createdDate) {
        this.createdDate = createdDate;
    }

    public long getDeletedDate() {
        return deletedDate;
    }

    public void setDeletedDate(long deletedDate) {
        this.deletedDate = deletedDate;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Product)) return false;
        Product product = (Product) o;
        return Objects.equals(productId, product.productId) && Objects.equals(productName, product.productName) && Objects.equals(productUrl, product.productUrl) && Objects.equals(options, product.options);
    }

    @Override
    public int hashCode() {
        return Objects.hash(productId, productName, productUrl, options);
    }
}