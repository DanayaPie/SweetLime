package com.danayapie.SweetLimeWebService.controller;

import com.amazonaws.Response;
import com.danayapie.SweetLimeWebService.exception.InvalidUrlOrDomainException;
import com.danayapie.SweetLimeWebService.exception.WebDoesNotExistException;
import com.danayapie.SweetLimeWebService.model.Product;
import com.danayapie.SweetLimeWebService.service.ProductService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.net.URISyntaxException;
import java.security.InvalidParameterException;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = {"http://localhost:8080", "http://localhost:4200"}, maxAge = 3600)
@RestController
public class ProductController {

    private Logger logger = LoggerFactory.getLogger(ProductController.class);

    @Autowired
    private ProductService productService;

    @PostMapping(path = "/url")
    public ResponseEntity<Object> getProductByUrl(@RequestBody Map<String, String> json) {
        logger.info("ProductController.getProductByUrl() invoked");

        try {
            List<Product> productsToGet = productService.getProductByUrl(json.get("productUrl"));
            return ResponseEntity.status(200).body(productsToGet);

        } catch (InvalidParameterException | InvalidUrlOrDomainException | WebDoesNotExistException | URISyntaxException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PostMapping(path = "/id")
    public ResponseEntity<Object> getProductById(@RequestBody Map<String, String> json) {
        logger.info("ProductController.getProductById() invoked");

        try {
            Product productToGet = productService.getProductById(json.get("productId"));
            return ResponseEntity.status(200).body(productToGet);
        } catch (InvalidParameterException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
