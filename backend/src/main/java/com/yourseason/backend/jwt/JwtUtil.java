package com.yourseason.backend.jwt;

import com.yourseason.backend.member.domain.Member;
import com.yourseason.backend.member.domain.Role;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.Date;

@Slf4j
@Component
public class JwtUtil {

    // 차후 설정파일로 뺴서 환경변수로 사용
    private final String SECRET = "secret";

    public String generateToken(Member member, Role role) {
        Claims claims = Jwts.claims();
        claims.put("id", member.getId());
        claims.put("email", member.getEmail());
        claims.put("nickname", member.getNickname());
        claims.put("role", role);
        return createToken(claims);
    }

    public String createToken(Claims claims) {
        return Jwts.builder()
                .setSubject("X-Auth-Token")
                .setClaims(claims)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10))
                .signWith(SignatureAlgorithm.HS256, SECRET)
                .compact();
    }

    public Boolean isValidToken(String token, Member member, Role role) {
        Long id = getIdFromToken(token);
        String email = getEmailFromToken(token);
        String nickname = getNicknameFromToken(token);
        String roleFromToken = getRoleFromToken(token);
        return id.equals(member.getId()) && email.equals(member.getEmail())
                && nickname.equals(member.getNickname()) && roleFromToken.equals(role)
                && !isTokenExpired(token);
    }

    private Long getIdFromToken(String token) {
        return (Long) getAllClaims(token).get("id");
    }

    public String getEmailFromToken(String token) {
        return String.valueOf(getAllClaims(token).get("email"));
    }

    private String getNicknameFromToken(String token) {
        return String.valueOf(getAllClaims(token).get("nickname"));
    }

    public String getRoleFromToken(String token) {
        return String.valueOf(getAllClaims(token).get("role"));
    }

    private Claims getAllClaims(String token) {
        return Jwts.parser()
                .setSigningKey(SECRET)
                .parseClaimsJws(token)
                .getBody();
    }

    private boolean isTokenExpired(String token) {
        return getExpirationDate(token).before(new Date());
    }

    public Date getExpirationDate(String token) {
        Claims claims = getAllClaims(token);
        return claims.getExpiration();
    }
}
