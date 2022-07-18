package com.ssafy.exception;

public class PWIncorrectException extends Exception{
	private static final long serialVersionUID = 1L;

	public PWIncorrectException() {
		super("비밀번호가 틀립니다.");
	}
}
