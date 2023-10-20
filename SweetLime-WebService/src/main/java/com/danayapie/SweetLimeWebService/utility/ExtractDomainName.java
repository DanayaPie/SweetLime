package com.danayapie.SweetLimeWebService.utility;

import java.net.MalformedURLException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ExtractDomainName {

    private static Logger logger = LoggerFactory.getLogger(ExtractDomainName.class);

    public static String getDomainName(String urlString) throws URISyntaxException {

        if (!urlString.startsWith("http") && !urlString.startsWith("https")) {
            urlString = "http://" + urlString;
        }
        URI uri = new URI(urlString);
        String host = uri.getHost();
        String domainName = host.startsWith("www.") ? host.substring(4) : host;
        logger.info("domainName: " + domainName);

        return domainName;
    }
}
