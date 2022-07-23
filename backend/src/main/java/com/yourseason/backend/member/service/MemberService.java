package com.yourseason.backend.member.service;

import com.yourseason.backend.member.controller.dto.LoginRequest;
import com.yourseason.backend.member.controller.dto.LoginResponse;

public interface MemberService {

    LoginResponse login(LoginRequest loginRequest);
}
