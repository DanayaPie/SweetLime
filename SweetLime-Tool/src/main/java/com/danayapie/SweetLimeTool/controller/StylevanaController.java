package com.danayapie.SweetLimeTool.controller;

import com.danayapie.SweetLimeTool.model.Product;
import com.danayapie.SweetLimeTool.service.StylevanaService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.security.InvalidParameterException;
import java.util.List;
import java.util.Map;

@RestController
public class StylevanaController {

    private Logger logger = LoggerFactory.getLogger(StylevanaController.class);

    @Autowired
    private StylevanaService stylevanaService;

    @PostMapping(path = "/stylevanaUrl")
    public ResponseEntity<Object> addProductByUrl(@RequestBody Map<String, String> json) {
        logger.info("StylevanaController.addProductByUrl() invoked");

        try {
            List<Product> productsToAdd = stylevanaService.addProductByUrl(json.get("productUrl"));
            return ResponseEntity.status(200).body(productsToAdd);

        } catch (InvalidParameterException | IOException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping(path = "/stylevanaProducts")
    public ResponseEntity<Object> getAllProducts() {
        logger.info("StylevanaController.getAllProducts() invoked");

        try {
            List<Product> allProducts = stylevanaService.getAllProducts();
            return ResponseEntity.status(200).body(allProducts);

        } catch (InvalidParameterException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping(path = "/stylevanaUpdate")
    public ResponseEntity<Object> batchUpdateProducts() {
        logger.info("StylevanaController.batchUpdateProducts() invoked");

        try {
            List<Product> allProducts = stylevanaService.batchUpdateProducts();
            return ResponseEntity.status(200).body(allProducts);

        } catch (InvalidParameterException | IOException | InterruptedException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
