package com.danayapie.SweetLimeWebService.service;

import com.danayapie.SweetLimeWebService.dao.SupportedWebDao;
import com.danayapie.SweetLimeWebService.exception.InvalidUrlOrDomainException;
import com.danayapie.SweetLimeWebService.exception.WebAlreadyExistExcpetion;
import com.danayapie.SweetLimeWebService.exception.WebDoesNotExistException;
import com.danayapie.SweetLimeWebService.model.SupportedWebsite;
import com.danayapie.SweetLimeWebService.utility.DomainNameUtil;
import io.micrometer.common.util.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.net.URISyntaxException;
import java.security.InvalidParameterException;
import java.time.Instant;
import java.util.List;

@Service
public class SupportedWebService {

    private Logger logger = LoggerFactory.getLogger(SupportedWebService.class);

    @Autowired
    private SupportedWebDao webDao;

    public SupportedWebsite addWeb(String urlString) throws WebAlreadyExistExcpetion, WebDoesNotExistException, URISyntaxException, InvalidUrlOrDomainException {
        logger.info("SupportedWebService.addWeb() invoked");

        urlString = urlString.trim();

        // validate blank inputs
        if (StringUtils.isBlank(urlString)) {
            throw new InvalidParameterException("Domain name cannot be blank.");
        }

        String domainName = DomainNameUtil.extractValidateDomainName(urlString);
        long createdDate = Instant.now().getEpochSecond();

        /* check if website exist
         *   - check with frontend local map
         */
//        if (webDao.getWebByUrl(domainName).size() != 0) {
//            throw new WebAlreadyExistExcpetion("Website already exist.");
//        }

        SupportedWebsite webToAdd = new SupportedWebsite();
        webToAdd.setDomainName(domainName);
        webToAdd.setCreatedDate(createdDate);

        return webDao.addWeb(webToAdd);
    }

    public List<SupportedWebsite> getAllWebs() {
        logger.info("SupportedWebService.getAllWebs() invoked");

        return webDao.getAllWebs();
    }

    public SupportedWebsite getWebById(String webId) throws WebDoesNotExistException {
        logger.info("SupportedWebService.getWebById() invoked");

        SupportedWebsite webToGet = webDao.getWebById(webId);
        if (webToGet == null) {
            throw new WebDoesNotExistException("Website with ID of " + webId + " does not exist.");
        }
        return webToGet;
    }

    public SupportedWebsite getWebByUrl(String webUrl) throws WebDoesNotExistException, URISyntaxException, InvalidUrlOrDomainException {
        logger.info("SupportedWebService.getWebByUrl() invoked");

        String domainName = DomainNameUtil.extractValidateDomainName(webUrl.trim());
        List<SupportedWebsite> websToGet = webDao.getWebByUrl(domainName);

        if (websToGet.size() == 0 || websToGet == null) {
            throw new WebDoesNotExistException(domainName + " is currently not supported by Sweet Lime.");
        }

        return websToGet.get(0);
    }
}