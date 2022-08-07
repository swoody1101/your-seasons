package com.yourseason.backend.interceptor;

import com.yourseason.backend.common.exception.WrongAccessException;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class JwtAuthInterceptor implements HandlerInterceptor {

    private static final String ERROR = "/error";
    private static final String EXPIRED_TOKEN = "로그인 정보가 만료되었습니다.";

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object Handler) {
        if (ERROR.equals(request.getRequestURI())) {
            throw new WrongAccessException(EXPIRED_TOKEN);
        }
        return true;
    }
}
