package com.danayapie.SweetLimeWebService.controller;

import com.danayapie.SweetLimeWebService.model.SupportedWebsite;
import com.danayapie.SweetLimeWebService.service.SupportedWebService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class SupportedWebController {

    private Logger logger = LoggerFactory.getLogger(SupportedWebController.class);

    @Autowired
    private SupportedWebService supportedWebService;

    @GetMapping(path = "/supportedWeb")
    public ResponseEntity<Object> getAllSupportedWeb() {
        logger.info("SupportedWebController.getAllSupportedWeb() invoked");

        List<SupportedWebsite> allSupportedWebs = supportedWebService.getAllSupportedWeb();

        return ResponseEntity.status(200).body(allSupportedWebs);
    }

//    @GetMapping(path = "/supportedWeb/{webUrl}")
//    public ResponseEntity<Object> getWebByWebUrl(@PathVariable String webUrl) {
//        logger.info("SupportedWebController.getWebByWebUrl() invoked");
//
//        SupportedWebsite SupportedWeb = suppo
//        return
//    }
}
