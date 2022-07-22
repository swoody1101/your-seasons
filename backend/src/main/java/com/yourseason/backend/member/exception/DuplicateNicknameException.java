package com.yourseason.backend.member.exception;

public class DuplicateNicknameException extends RuntimeException {

    public DuplicateNicknameException() {
        super("닉네임이 중복됩니다.");
    }
}
