package com.yourseason.backend.common.exception;

public class DuplicateException extends RuntimeException{

    public DuplicateException(String message) {
        super(message);
    }
}
