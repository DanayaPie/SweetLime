package com.danayapie.SweetLimeWebService.service;

import com.danayapie.SweetLimeWebService.dao.SupportedWebDao;
import com.danayapie.SweetLimeWebService.model.SupportedWebsite;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SupportedWebService {

    private Logger logger = LoggerFactory.getLogger(SupportedWebService.class);

    @Autowired
    private SupportedWebDao supportedWebDao;

    public List<SupportedWebsite> getAllSupportedWeb() {
        logger.info("SupportedWebService.getAllSupportedWeb() invoked");

        List<SupportedWebsite> allSupportedWebs = supportedWebDao.getAllSupportedWeb();

        return allSupportedWebs;
    }
}
