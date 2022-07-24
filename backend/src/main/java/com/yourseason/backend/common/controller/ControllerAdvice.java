package com.yourseason.backend.common.controller;

import com.yourseason.backend.common.domain.Message;
import com.yourseason.backend.common.exception.DuplicationException;
import com.yourseason.backend.common.exception.ImageUploadException;
import com.yourseason.backend.common.exception.NotFoundException;
import com.yourseason.backend.common.exception.WrongFormException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class ControllerAdvice {

    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(NotFoundException.class)
    public Message NotFoundException(RuntimeException runtimeException) {
        log.info(runtimeException.getMessage());
        return new Message(runtimeException.getMessage());
    }

    @ResponseStatus(HttpStatus.CONFLICT)
    @ExceptionHandler(DuplicationException.class)
    public Message DuplicationException(RuntimeException runtimeException) {
        log.info(runtimeException.getMessage());
        return new Message(runtimeException.getMessage());
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(WrongFormException.class)
    public Message WrongFormException(RuntimeException runtimeException) {
        log.info(runtimeException.getMessage());
        return new Message(runtimeException.getMessage());
    }

    @ResponseStatus(HttpStatus.CONFLICT)
    @ExceptionHandler(ImageUploadException.class)
    public Message ImageUploadException(RuntimeException runtimeException) {
        log.info(runtimeException.getMessage());
        return new Message(runtimeException.getMessage());
    }
}
