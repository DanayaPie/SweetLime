package com.danayapie.SweetLimeWebService.utility;

import io.micrometer.common.util.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.security.InvalidParameterException;

public class ValidateSupportedWeb {

    private static Logger logger = LoggerFactory.getLogger(ValidateSupportedWeb.class);

    public static void validateWebNameWebUrlBlank(String webName, String webUrl) {
        logger.info("ValidateSupportedWeb.validateWebNameWebUrlBlank() invoked");

        boolean webInputBlankBoolean = false;
        StringBuilder webInputBlankErrorString = new StringBuilder();

        if (StringUtils.isBlank(webName)) {
            webInputBlankBoolean = true;
            webInputBlankErrorString.append("Web name");
        }

        if (StringUtils.isBlank(webUrl)) {

            if (webInputBlankBoolean) {
                webInputBlankBoolean = true;
                webInputBlankErrorString.append(", web name");
            } else {
                webInputBlankBoolean = true;
                webInputBlankErrorString.append("Web name");
            }
        }

        if (webInputBlankBoolean) {
            webInputBlankErrorString.append(" cannot be blank.");
            throw new InvalidParameterException(webInputBlankErrorString.toString());
        }
    }
}
