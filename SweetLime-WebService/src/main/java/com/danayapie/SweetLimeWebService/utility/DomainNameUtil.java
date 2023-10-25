package com.danayapie.SweetLimeWebService.utility;

import com.danayapie.SweetLimeWebService.exception.InvalidUrlOrDomainException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class DomainNameUtil {

    private static Logger logger = LoggerFactory.getLogger(DomainNameUtil.class);

    public static String extractValidateDomainName(String urlString) throws URISyntaxException, InvalidUrlOrDomainException {
        logger.info("DomainNameUtil.extractValidateDomainName() invoked");

        if (!urlString.startsWith("http") && !urlString.startsWith("https")) {
            urlString = "http://" + urlString;
        }
        URI uri = new URI(urlString);
        String host = uri.getHost();
        String domainName = host.startsWith("www.") ? host.substring(4) : host;

        String regex = "^((?!-)[A-Za-z0-9-]"
                + "{1,63}(?<!-)\\.)"
                + "+[A-Za-z]{2,6}";

        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(domainName);

        if (!matcher.matches()) {
            throw new InvalidUrlOrDomainException("Invalid URL or domain name.");
        }
        return domainName.toLowerCase();
    }
}
