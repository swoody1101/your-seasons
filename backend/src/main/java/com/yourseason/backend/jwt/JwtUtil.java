package com.yourseason.backend.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.Date;

@Slf4j
@Component
public class JwtUtil {

    // 차후 설정파일로 뺴서 환경변수로 사용
    private final String SECRET = "secret";

    public String generateToken(UserDetails userDetails) {
        Claims claims = Jwts.claims();
        claims.put("email", userDetails.getUsername());
        return createToken(claims, userDetails.getUsername());
    }

    public String createToken(Claims claims, String subject) {
        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10))
                .signWith(SignatureAlgorithm.HS256, SECRET)
                .compact();
    }

    public Boolean isValidToken(String token, UserDetails userDetails) {
        String username = getEmailFromToken(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    private Claims getAllClaims(String token) {
        return Jwts.parser()
                .setSigningKey(SECRET)
                .parseClaimsJws(token)
                .getBody();
    }

    public String getEmailFromToken(String token) {
        String username = String.valueOf(getAllClaims(token).get("username"));
        return username;
    }

    public Date getExpirationDate(String token) {
        Claims claims = getAllClaims(token);
        return claims.getExpiration();
    }

    private boolean isTokenExpired(String token) {
        return getExpirationDate(token).before(new Date());
    }
}
