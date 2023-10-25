package com.danayapie.SweetLimeWebService.controller;

import com.danayapie.SweetLimeWebService.exception.InvalidUrlOrDomainException;
import com.danayapie.SweetLimeWebService.exception.WebAlreadyExistExcpetion;
import com.danayapie.SweetLimeWebService.exception.WebDoesNotExistException;
import com.danayapie.SweetLimeWebService.model.SupportedWebsite;
import com.danayapie.SweetLimeWebService.service.SupportedWebService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URISyntaxException;
import java.security.InvalidParameterException;
import java.util.List;
import java.util.Map;

@RestController
public class SupportedWebController {

    private Logger logger = LoggerFactory.getLogger(SupportedWebController.class);

    @Autowired
    private SupportedWebService webService;

    @PostMapping(path = "/supportedWeb")
    public ResponseEntity<Object> addWeb(@RequestBody Map<String, String> json) {
        logger.info("SupportedWebController.addWeb() invoked");

        try {
            SupportedWebsite webToAdd = webService.addWeb(json.get("domainName"));
            return ResponseEntity.status(200).body(webToAdd);

        } catch (InvalidParameterException | WebDoesNotExistException | WebAlreadyExistExcpetion | URISyntaxException | InvalidUrlOrDomainException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping(path = "/supportedWebs")
    public ResponseEntity<Object> getAllWebs() {
        logger.info("SupportedWebController.getAllWebs() invoked");

        try {
            List<SupportedWebsite> allSupportedWebs = webService.getAllWebs();
            return ResponseEntity.status(200).body(allSupportedWebs);

        } catch (InvalidParameterException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping(path = "/supportedWeb/{webId}")
    public ResponseEntity<Object> getWebById(@PathVariable String webId) {
        logger.info("SupportedWebController.getWebById() invoked");

        try {
            SupportedWebsite webToGet = webService.getWebById(webId);
            return ResponseEntity.status(200).body(webToGet);

        } catch (InvalidParameterException | WebDoesNotExistException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping(path = "/supportedWebUrl/{webUrl}")
    public ResponseEntity<Object> getWebByUrl(@PathVariable String webUrl) {
        logger.info("SupportedWebController.getWebByUrl() invoked");

        try {
            SupportedWebsite webToGet = webService.getWebByUrl(webUrl);
            return ResponseEntity.status(200).body(webToGet);

        } catch (InvalidParameterException | WebDoesNotExistException | URISyntaxException | InvalidUrlOrDomainException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
