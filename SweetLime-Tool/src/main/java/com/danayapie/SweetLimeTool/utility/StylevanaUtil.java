package com.danayapie.SweetLimeTool.utility;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class StylevanaUtil {

    private static Logger logger = LoggerFactory.getLogger(StylevanaUtil.class);

    public static List<String> extractProductInfoJsonString(String productUrl) throws IOException {
        logger.info("StylevanaUtil.extractProductInfoJsonString() invoked");

        String outStream = new Scanner(new URL(productUrl.trim()).openStream()).useDelimiter("\\A").next();
        String[] lines = outStream.split("\n");

        List<String> productInfoJson = new ArrayList();

        for (int i = 0; i < lines.length; i++) {
            String line = lines[i].trim();
            if (line.contains("var myAssociatedProducts = ")) {
                int indexStart = line.indexOf(" = ") + 3;
                int indexEnd = line.indexOf(";");
                productInfoJson.add(line.substring(indexStart, indexEnd));
            }

            if (line.contains("var spConfig = ")) {
                int indexStart = line.indexOf("{");
                int indexEnd = line.indexOf(";");
                productInfoJson.add(line.substring(indexStart, indexEnd));
            }
        }

        return productInfoJson;
    }

    public static List<String> extractProductImageJsonString(String productUrl) throws IOException {
        logger.info("StylevanaUtil.extractProductImageJsonString() invoked");

        String outStream = new Scanner(new URL(productUrl.trim()).openStream()).useDelimiter("\\A").next();
        String[] lines = outStream.split("\n");

        List<String> productInfoJson = new ArrayList();

        for (int i = 0; i < lines.length; i++) {

            String line = lines[i].trim();
            if (line.contains("<div class=\"magnify\"")) {
                logger.info(line);
                int indexStart = line.indexOf("src=");
                int indexEnd = line.indexOf(">");
                productInfoJson.add(line.substring(indexStart, indexEnd));
            }

//            if (line.contains("var spConfig = ")) {
//                int indexStart = line.indexOf("{");
//                int indexEnd = line.indexOf(";");
//                productInfoJson.add(line.substring(indexStart, indexEnd));
//            }
        }

        for (int i= 0; i < productInfoJson.size(); i++) {

            logger.info(productInfoJson.get(i));
        }


        return productInfoJson;
    }

    public static String extractPriceJsonString(String productUrl) throws IOException {
        logger.info("StylevanaUtil.extractPriceJsonString() invoked");

        String outStream = new Scanner(new URL(productUrl.trim()).openStream()).useDelimiter("\\A").next();
        String[] lines = outStream.split("\n");

        String productNamePriceJson = null;

        for (int i = 0; i < lines.length; i++) {
            String line = lines[i].trim();
            if (line.contains("var myAssociatedProducts = ")) {
                int indexStart = line.indexOf(" = ") + 3;
                int indexEnd = line.indexOf(";");
                productNamePriceJson = line.substring(indexStart, indexEnd);
            }
        }

        return productNamePriceJson;
    }
}
