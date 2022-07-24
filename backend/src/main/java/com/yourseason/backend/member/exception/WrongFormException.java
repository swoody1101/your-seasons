package com.yourseason.backend.member.exception;

public class WrongFormException extends RuntimeException {

    public WrongFormException(String message) {
        super(message);
    }
}
