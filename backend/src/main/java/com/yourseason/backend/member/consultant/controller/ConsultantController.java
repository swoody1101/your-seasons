package com.yourseason.backend.member.consultant.controller;

import com.yourseason.backend.member.consultant.controller.dto.ConsultantSignupRequest;
import com.yourseason.backend.member.consultant.service.ConsultantService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/consultants")
public class ConsultantController {

    private final ConsultantService consultantService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void signup(@RequestBody ConsultantSignupRequest consultantSignupRequest) {
        consultantService.createConsultant(consultantSignupRequest);
    }
}
