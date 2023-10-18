package com.danayapie.SweetLimeWebService.exception;

public class WebDoesNotExistException extends Throwable {

    public WebDoesNotExistException() {
    }

    public WebDoesNotExistException(String message) {
        super(message);
    }

    public WebDoesNotExistException(String message, Throwable cause) {
        super(message, cause);
    }

    public WebDoesNotExistException(Throwable cause) {
        super(cause);
    }

    public WebDoesNotExistException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
