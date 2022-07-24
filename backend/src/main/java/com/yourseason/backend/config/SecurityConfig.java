package com.yourseason.backend.config;

import com.yourseason.backend.jwt.JwtAuthenticateFilter;
import com.yourseason.backend.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;

@RequiredArgsConstructor
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final MemberService memberService;
    private final JwtAuthenticateFilter jwtAuthenticateFilter;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable();
        http.authorizeRequests()
                .antMatchers("api/v1/login").permitAll()
                .anyRequest().authenticated();
        http.sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        http.formLogin().loginProcessingUrl("api/v1/login").defaultSuccessUrl("/", true);
        http.logout().logoutUrl("api/v1/logout").logoutSuccessUrl("/");
        http.userDetailsService(memberService);
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {

    }

}
