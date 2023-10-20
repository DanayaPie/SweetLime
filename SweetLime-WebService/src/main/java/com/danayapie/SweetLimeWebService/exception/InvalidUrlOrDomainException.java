package com.danayapie.SweetLimeWebService.exception;

public class InvalidUrlOrDomainException extends Throwable {

    public InvalidUrlOrDomainException(String s) {
    }

    public InvalidUrlOrDomainException(String message, Throwable cause) {
        super(message, cause);
    }

    public InvalidUrlOrDomainException(Throwable cause) {
        super(cause);
    }

    public InvalidUrlOrDomainException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }

    public InvalidUrlOrDomainException() {
    }
}
