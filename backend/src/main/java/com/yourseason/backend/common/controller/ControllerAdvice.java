package com.yourseason.backend.common.controller;

import com.yourseason.backend.common.domain.Message;
import com.yourseason.backend.common.exception.*;
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
    @ExceptionHandler({BadRequestException.class, NotEqualException.class, WrongFormException.class})
    public Message BadRequestException(RuntimeException runtimeException) {
        log.info(runtimeException.getMessage());
        return new Message(runtimeException.getMessage());
    }

    @ResponseStatus(HttpStatus.FORBIDDEN)
    @ExceptionHandler(WrongAccessException.class)
    public Message WrongAccessException(RuntimeException runtimeException) {
        log.info(runtimeException.getMessage());
        return new Message(runtimeException.getMessage());
    }
}
