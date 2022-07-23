package com.yourseason.backend.common.exception;

public class DuplicatedException extends RuntimeException{

    public DuplicatedException(String message) {
        super(message);
    }
}
