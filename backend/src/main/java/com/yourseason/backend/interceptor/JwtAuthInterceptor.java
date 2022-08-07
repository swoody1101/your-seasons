package com.yourseason.backend.interceptor;

import com.yourseason.backend.common.exception.WrongAccessException;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.regex.Pattern;

public class JwtAuthInterceptor extends HandlerInterceptorAdapter {

    private static final String ERROR = "/error";
    private static final String EXPIRED_TOKEN = "로그인 정보가 만료되었습니다.";
    private static final String CONSULTANT_SIGNUP = "/api/v1/consultants";
    private static final String CUSTOMER_SIGNUP = "/api/v1/customers";
    private static final String LOGIN = "/api/v1/members/login";
    private static final Pattern CONSULTANT_LIST = Pattern.compile("/api/v1/consultants?order=[.]+");
    private static final Pattern CONSULTANT_DETAIL = Pattern.compile("/api/v1/consultants/[0-9]/1");

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object Handler) {
        String requestURI = request.getRequestURI();
        String requestMethod = request.getMethod();
        if (CONSULTANT_SIGNUP.equals(requestURI) && HttpMethod.POST.matches(requestMethod)
                || CUSTOMER_SIGNUP.equals(requestURI) && HttpMethod.POST.matches(requestMethod)
                || LOGIN.equals(requestURI) && HttpMethod.POST.matches(requestMethod)
                || CONSULTANT_LIST.matcher(requestURI).matches() && HttpMethod.GET.matches(requestMethod)
                || CONSULTANT_DETAIL.matcher(requestURI).matches() && HttpMethod.GET.matches(requestMethod)) {
            return true;
        }
        if (requestURI.equals(ERROR)) {
            throw new WrongAccessException(EXPIRED_TOKEN);
        }
        return true;
    }
}
