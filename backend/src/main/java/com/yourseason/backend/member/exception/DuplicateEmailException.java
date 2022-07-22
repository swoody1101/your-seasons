package com.yourseason.backend.member.exception;

public class DuplicateEmailException extends RuntimeException {

    public DuplicateEmailException() {
        super("이메일이 중복됩니다.");
    }
}
