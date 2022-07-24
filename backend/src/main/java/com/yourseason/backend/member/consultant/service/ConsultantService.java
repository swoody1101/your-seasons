package com.yourseason.backend.member.consultant.service;

import com.yourseason.backend.common.exception.NotFoundException;
import com.yourseason.backend.member.consultant.controller.dto.ConsultantSignupRequest;
import com.yourseason.backend.member.consultant.controller.dto.ConsultantResponse;
import com.yourseason.backend.member.consultant.domain.Consultant;
import com.yourseason.backend.member.consultant.domain.ConsultantRepository;
import com.yourseason.backend.member.consultant.domain.License;
import com.yourseason.backend.member.consultant.domain.LicenseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class ConsultantService {

    private static final String LICENSE_NOT_FOUND = "자격증이 존재하지 않습니다.";

    private final ConsultantRepository consultantRepository;
    private final LicenseRepository licenseRepository;

    public void createConsultant(ConsultantSignupRequest consultantSignupRequest) {
        Consultant consultant = consultantSignupRequest.toEntity();
        License license = licenseRepository.findByName(consultantSignupRequest.getLicenseName())
                .orElseThrow(() -> new NotFoundException(LICENSE_NOT_FOUND));
        consultant.registerLicense(license);
        consultantRepository.save(consultant);
    }
    
    public List<ConsultantResponse> getConsultants() {
        List<Consultant> consultants = consultantRepository.findAll();
        return consultants.stream()
                .map(consultant ->
                        ConsultantResponse.builder()
                                .consultantId(consultant.getId())
                                .nickname(consultant.getNickname())
                                .email(consultant.getEmail())
                                .star(consultant.getStarAverage())
                                .build())
                .collect(Collectors.toList());
    }
}
