package com.danayapie.SweetLimeWebService.exception;

public class WebAlreadyExistExcpetion extends Throwable {

    public WebAlreadyExistExcpetion() {
    }

    public WebAlreadyExistExcpetion(String message) {
        super(message);
    }

    public WebAlreadyExistExcpetion(String message, Throwable cause) {
        super(message, cause);
    }

    public WebAlreadyExistExcpetion(Throwable cause) {
        super(cause);
    }

    public WebAlreadyExistExcpetion(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
