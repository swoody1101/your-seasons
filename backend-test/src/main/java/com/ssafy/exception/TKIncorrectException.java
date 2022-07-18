package com.ssafy.exception;

public class TKIncorrectException extends Exception{
	private static final long serialVersionUID = 1L;

	public TKIncorrectException() {
		super("유효하지 않은 토큰입니다.");
	}
}
