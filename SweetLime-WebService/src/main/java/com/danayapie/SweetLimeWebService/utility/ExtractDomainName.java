package com.danayapie.SweetLimeWebService.utility;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.net.URI;
import java.net.URISyntaxException;

public class ExtractDomainName {

    private static Logger logger = LoggerFactory.getLogger(ExtractDomainName.class);

    public static String getDomainName(String urlString) throws URISyntaxException {
        logger.info("ExtractDomainName.getDomainName() invoked");

        if (!urlString.startsWith("http") && !urlString.startsWith("https")) {
            urlString = "http://" + urlString;
        }
        URI uri = new URI(urlString);
        String host = uri.getHost();
        String domainName = host.startsWith("www.") ? host.substring(4) : host;

        logger.debug("domainName: " + domainName);

        return domainName.toLowerCase();
    }
}
