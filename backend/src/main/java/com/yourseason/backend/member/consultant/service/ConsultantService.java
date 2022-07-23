package com.yourseason.backend.member.consultant.service;

import com.yourseason.backend.member.consultant.domain.Consultant;
import com.yourseason.backend.member.consultant.domain.License;
import com.yourseason.backend.member.consultant.domain.LicenseRepository;
import com.yourseason.backend.member.consultant.controller.dto.ConsultantSignupRequest;
import com.yourseason.backend.member.consultant.domain.ConsultantRepository;
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
                .orElseThrow(IllegalArgumentException::new);
        consultant.registerLicense(license);
        consultantRepository.save(consultant);
    }
}
