package com.yourseason.backend.member.domain.consultant.service;

import com.yourseason.backend.member.domain.consultant.controller.dto.ConsultantSignupRequest;
import com.yourseason.backend.member.domain.consultant.domain.Consultant;
import com.yourseason.backend.member.domain.consultant.domain.ConsultantRepository;
import com.yourseason.backend.member.domain.consultant.domain.License;
import com.yourseason.backend.member.domain.consultant.domain.LicenseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional
@Service
public class ConsultantService {

    private ConsultantRepository consultantRepository;
    private LicenseRepository licenseRepository;

    public void createConsultant(ConsultantSignupRequest consultantSignupRequest) {
        Consultant consultant = consultantSignupRequest.toEntity();
        License license = licenseRepository.findById(consultantSignupRequest.getLicenseId())
                .orElseThrow(() -> new IllegalArgumentException());
        consultant.registerLicense(license);
        consultantRepository.save(consultant);
    }
}
