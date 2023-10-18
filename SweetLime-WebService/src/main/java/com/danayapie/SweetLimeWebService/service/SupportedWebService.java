package com.danayapie.SweetLimeWebService.service;

import com.danayapie.SweetLimeWebService.dao.SupportedWebDao;
import com.danayapie.SweetLimeWebService.exception.WebAlreadyExistExcpetion;
import com.danayapie.SweetLimeWebService.exception.WebDoesNotExistException;
import com.danayapie.SweetLimeWebService.model.SupportedWebsite;
import com.danayapie.SweetLimeWebService.utility.ValidateSupportedWeb;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
public class SupportedWebService {

    private Logger logger = LoggerFactory.getLogger(SupportedWebService.class);

    @Autowired
    private SupportedWebDao webDao;


    public SupportedWebsite addWeb(String webName, String webUrl) throws WebAlreadyExistExcpetion, WebDoesNotExistException {
        logger.info("SupportedWebService.addWeb() invoked");

        // validate blank inputs
        ValidateSupportedWeb.validateWebNameWebUrlBlank(webName, webUrl);

        webUrl = webUrl.trim().toLowerCase();

//        // check if website exist
//        if (webDao.getWebByUrl(webUrl) != null) {
//            throw new WebAlreadyExistExcpetion("Website already exist.");
//        }

        webName = webName.trim().toUpperCase();
        long createdDate = Instant.now().getEpochSecond();

        SupportedWebsite webToAdd = new SupportedWebsite();
        webToAdd.setWebName(webName);
        webToAdd.setWebUrl(webUrl);
        webToAdd.setCreatedDate(createdDate);

        webDao.addWeb(webToAdd);
        return webToAdd;
    }

    public List<SupportedWebsite> getAllWeb() {
        logger.info("SupportedWebService.getAllWeb() invoked");

        List<SupportedWebsite> allSupportedWebs = webDao.getAllWeb();

        return allSupportedWebs;
    }

    public SupportedWebsite getWebById(String webId) throws WebDoesNotExistException {
        logger.info("SupportedWebService.getWebById() invoked");

        SupportedWebsite webToGet = webDao.getWebById(webId);

        if (webToGet == null) {
            throw new WebDoesNotExistException("Website with ID of " + webId + " does not exist.");
        }
        return webToGet;
    }

    public SupportedWebsite getWebByUrl(String webUrl) throws WebDoesNotExistException {
        logger.info("SupportedWebService.getWebByUrl() invoked");

        List<SupportedWebsite> websToGet = webDao.getWebByUrl(webUrl.trim());

        if (websToGet.size() == 0 || websToGet == null) {
            throw new WebDoesNotExistException("Website with URL of " + webUrl + "does not exist.");
        }

        return websToGet.get(0);
    }
}
