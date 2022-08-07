package com.yourseason.backend.util;

import com.yourseason.backend.common.exception.WrongAccessException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.Map;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
@Component
public class JwtUtil {

    private static final String SECRET = "ssafy second semester first project - your season";
    private static final String WRONG_ACCESS = "잘못된 접근입니다.";
    private static final String TYPE = "Bearer";
    private static final String DELIMITER = " ";
    private static final int TOKEN = 1;

    public static String generateToken(Map<String, String> member) {
        Claims claims = Jwts.claims();
        claims.put("id", member.get("id"));
        claims.put("nickname", member.get("nickname"));
        claims.put("imageUrl", member.get("imageUrl"));
        claims.put("role", member.get("role"));
        return createToken(claims);
    }

    public static Long getMemberId(String token) {
        return Long.parseLong((String) getAllClaims(getActualToken(token)).get("id"));
    }

    private static String createToken(Claims claims) {
        return Jwts.builder()
                .setSubject("Authorization")
                .setClaims(claims)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10))
                .signWith(SignatureAlgorithm.HS256, SECRET.getBytes(StandardCharsets.UTF_8))
                .compact();
    }

    private static Claims getAllClaims(String token) {
        return Jwts.parser()
                .setSigningKey(SECRET.getBytes(StandardCharsets.UTF_8))
                .parseClaimsJws(token)
                .getBody();
    }

    private static void checkValidation(String token) {
        if (!token.startsWith(TYPE + DELIMITER)) {
            throw new WrongAccessException(WRONG_ACCESS);
        }
    }

    private static String getActualToken(String token) {
        checkValidation(token);
        return token.split(DELIMITER)[TOKEN];
    }
}
