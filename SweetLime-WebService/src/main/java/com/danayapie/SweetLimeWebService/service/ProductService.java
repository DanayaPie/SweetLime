package com.danayapie.SweetLimeWebService.service;

import com.danayapie.SweetLimeWebService.dao.ProductDao;
import com.danayapie.SweetLimeWebService.exception.InvalidUrlOrDomainException;
import com.danayapie.SweetLimeWebService.exception.WebDoesNotExistException;
import com.danayapie.SweetLimeWebService.model.Product;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.net.URISyntaxException;
import java.util.List;

@Service
public class ProductService {

    private Logger logger = LoggerFactory.getLogger(ProductService.class);

    @Autowired
    private ProductDao productDao;

    @Autowired
    private SupportedWebService supportedWebService;

    public List<Product> getProductByUrl(String productUrl) throws InvalidUrlOrDomainException, WebDoesNotExistException, URISyntaxException {
        logger.info("ProductService.getProductByUrl() invoked");

        productUrl.trim();

        // check if website is supported
        supportedWebService.getWebByUrl(productUrl);

        List<Product> productsToGet = productDao.getProductByUrl(productUrl);
        return productsToGet;
    }
}
