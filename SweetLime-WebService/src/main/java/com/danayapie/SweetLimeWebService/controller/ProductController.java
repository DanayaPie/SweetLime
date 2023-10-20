package com.danayapie.SweetLimeWebService.controller;

import com.danayapie.SweetLimeWebService.exception.InvalidUrlOrDomainException;
import com.danayapie.SweetLimeWebService.exception.WebDoesNotExistException;
import com.danayapie.SweetLimeWebService.model.Product;
import com.danayapie.SweetLimeWebService.service.ProductService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.net.URISyntaxException;
import java.security.InvalidParameterException;
import java.util.List;
import java.util.Map;

@RestController
public class ProductController {

    private Logger logger = LoggerFactory.getLogger(ProductController.class);

    @Autowired
    private ProductService productService;
    
    @PostMapping(path = "/productUrl")
    public ResponseEntity<Object> getProductByUrl(@RequestBody Map<String, String> json) {
        logger.info("ProductController.getProductByUrl() invoked");

        try {
            List<Product> productsToGet = productService.getProductByUrl(json.get("productUrl"));
            return ResponseEntity.status(200).body(productsToGet);

        } catch (InvalidParameterException | InvalidUrlOrDomainException | WebDoesNotExistException | URISyntaxException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
