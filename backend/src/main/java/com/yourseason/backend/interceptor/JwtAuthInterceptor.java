package com.yourseason.backend.interceptor;

import com.yourseason.backend.common.exception.WrongAccessException;
import com.yourseason.backend.util.JwtUtil;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.regex.Pattern;

public class JwtAuthInterceptor implements HandlerInterceptor {

    private static final String CONSULTANT_REQUEST = "/api/v1/consultants";
    private static final String CUSTOMER_REQUEST = "/api/v1/customers";
    private static final String CONSULTANT_SEARCH = "/api/v1/consultants/search";
    private static final Pattern CONSULTANT_DETAIL = Pattern.compile("/api/v1/consultants/[0-9]/[1-2]");
    private static final String NO_TOKEN = "로그인이 필요합니다.";
    private static final String AUTHORIZATION_HEADER = "Authorization";

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object Handler) {
        String requestURI = request.getRequestURI();
        String requestMethod = request.getMethod();
        if (CONSULTANT_REQUEST.equals(requestURI) && HttpMethod.POST.matches(requestMethod)
                || CUSTOMER_REQUEST.equals(requestURI) && HttpMethod.POST.matches(requestMethod)
                || CONSULTANT_REQUEST.equals(requestURI) && HttpMethod.GET.matches(requestMethod)
                || CONSULTANT_SEARCH.equals(requestURI) && HttpMethod.GET.matches(requestMethod)
                || CONSULTANT_DETAIL.matcher(requestURI).matches() && HttpMethod.GET.matches(requestMethod)) {
            return true;
        }

        String token = request.getHeader(AUTHORIZATION_HEADER);
        if (token == null) {
            throw new WrongAccessException(NO_TOKEN);
        }
        JwtUtil.validateToken(token);
        return true;
    }
}
