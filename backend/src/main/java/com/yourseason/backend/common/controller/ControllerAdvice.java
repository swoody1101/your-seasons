package com.yourseason.backend.common.controller;

import com.yourseason.backend.common.domain.Message;
import com.yourseason.backend.common.exception.NotFoundException;
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
        log.debug(runtimeException.getMessage());
        return new Message(runtimeException.getMessage());
    }
}
