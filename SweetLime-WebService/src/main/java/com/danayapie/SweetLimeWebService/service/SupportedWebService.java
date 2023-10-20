package com.danayapie.SweetLimeWebService.service;

import com.danayapie.SweetLimeWebService.dao.SupportedWebDao;
import com.danayapie.SweetLimeWebService.exception.WebAlreadyExistExcpetion;
import com.danayapie.SweetLimeWebService.exception.WebDoesNotExistException;
import com.danayapie.SweetLimeWebService.model.SupportedWebsite;
import com.danayapie.SweetLimeWebService.utility.ExtractDomainName;
import io.micrometer.common.util.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.URISyntaxException;
import java.security.InvalidParameterException;
import java.time.Instant;
import java.util.List;
import java.util.Locale;

@Service
public class SupportedWebService {

    private Logger logger = LoggerFactory.getLogger(SupportedWebService.class);

    @Autowired
    private SupportedWebDao webDao;

    public SupportedWebsite addWeb(String urlString) throws WebAlreadyExistExcpetion, WebDoesNotExistException, URISyntaxException {
        logger.info("SupportedWebService.addWeb() invoked");

        urlString = urlString.trim();

        // validate blank inputs
        if (StringUtils.isBlank(urlString)) {
            throw new InvalidParameterException("Domain name cannot be blank.");
        }

        // extract Domain name
        String domainName = ExtractDomainName.getDomainName(urlString);

        // check if website exist
        if (webDao.getWebByUrl(domainName).size() != 0) {
            throw new WebAlreadyExistExcpetion("Website already exist.");
        }

        long createdDate = Instant.now().getEpochSecond();

        SupportedWebsite webToAdd = new SupportedWebsite();
        webToAdd.setDomainName(domainName);
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

    public SupportedWebsite getWebByUrl(String webUrl) throws WebDoesNotExistException, URISyntaxException {
        logger.info("SupportedWebService.getWebByUrl() invoked");

        // extract domain name
        String domainName = ExtractDomainName.getDomainName(webUrl.trim());

        List<SupportedWebsite> websToGet = webDao.getWebByUrl(domainName);

        if (websToGet.size() == 0 || websToGet == null) {
            throw new WebDoesNotExistException("Website with URL of " + webUrl + " does not exist.");
        }

        return websToGet.get(0);
    }
}
