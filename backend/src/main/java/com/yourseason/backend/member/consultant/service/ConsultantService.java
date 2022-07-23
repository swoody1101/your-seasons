package com.yourseason.backend.member.consultant.service;

import com.yourseason.backend.member.consultant.controller.dto.ConsultantResponse;
import com.yourseason.backend.member.consultant.domain.Consultant;
import com.yourseason.backend.member.consultant.domain.ConsultantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class ConsultantService {

    private final ConsultantRepository consultantRepository;

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
