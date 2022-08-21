package com.yourseason.backend.consulting.self.service;

import com.yourseason.backend.common.domain.*;
import com.yourseason.backend.common.exception.NotFoundException;
import com.yourseason.backend.consulting.common.domain.BestColorSet;
import com.yourseason.backend.consulting.common.domain.WorstColorSet;
import com.yourseason.backend.consulting.self.controller.dto.SelfConsultingFinishRequest;
import com.yourseason.backend.consulting.self.domain.SelfConsulting;
import com.yourseason.backend.consulting.self.domain.result.Percentage;
import com.yourseason.backend.consulting.self.domain.result.SelfConsultingResult;
import com.yourseason.backend.member.customer.domain.Customer;
import com.yourseason.backend.member.customer.domain.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;

@RequiredArgsConstructor
@Service
public class SelfConsultingService {

    private static final String COLOR_NOT_FOUND = "해당 색상을 찾을 수 없습니다.";
    private static final String CUSTOMER_NOT_FOUND = "해당 회원을 찾을 수 없습니다.";
    private static final String EMAIL_FORMAT = "[@.]";
    private static final String SESSION_DELIMITER = "-";
    private static final int BEST_TONE = 0;

    private final ColorRepository colorRepository;
    private final CustomerRepository customerRepository;
    private final ToneRepository toneRepository;

    @Transactional
    public Message finishSelfConsulting(Long customerId, SelfConsultingFinishRequest selfConsultingFinishRequest) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new NotFoundException(CUSTOMER_NOT_FOUND));

        ColorSet requestBestColorSet = ColorSet.builder().build();
        toColorColorSet(requestBestColorSet, selfConsultingFinishRequest.getBestColorSet());
        BestColorSet bestColorSet = BestColorSet.builder()
                .colorSet(requestBestColorSet)
                .build();

        ColorSet requestWorstColorSet = ColorSet.builder().build();
        toColorColorSet(requestWorstColorSet, selfConsultingFinishRequest.getWorstColorSet());
        WorstColorSet worstColorSet = WorstColorSet.builder()
                .colorSet(requestWorstColorSet)
                .build();

        Map<String, Integer> toneCountings = new HashMap<>();
        selfConsultingFinishRequest.getBestColorSet()
                .stream()
                .map(hex -> colorRepository.findByHex(hex)
                        .orElseThrow(() -> new NotFoundException(COLOR_NOT_FOUND)))
                .forEach(color -> toneCountings.merge(color.getTone().getName(), 1, Integer::sum));
        int bestColorCount = selfConsultingFinishRequest.getBestColorSet().size();
        List<Percentage> percentages = new ArrayList<>();
        toneCountings.forEach((tone, count) -> {
            percentages.add(Percentage.builder()
                    .tone(toneRepository.findByName(tone).get())
                    .percentage(count * 100 / bestColorCount)
                    .build());
        });

        percentages.sort(Comparator.comparing(Percentage::getPercentage).reversed());
        Tone bestTone = percentages.get(BEST_TONE).getTone();

        SelfConsultingResult selfConsultingResult = SelfConsultingResult.builder()
                .bestColorSet(bestColorSet)
                .worstColorSet(worstColorSet)
                .percentages(percentages)
                .tone(bestTone)
                .build();

        SelfConsulting selfConsulting = getNewSelfConsulting(customer, selfConsultingResult, getSessionId(customer));
        customer.createSelfConsulting(selfConsulting);
        customerRepository.save(customer);
        return new Message("succeeded");
    }

    private String getSessionId(Customer customer) {
        return String.join(SESSION_DELIMITER, customer.getEmail().split(EMAIL_FORMAT));
    }

    private SelfConsulting getNewSelfConsulting(Customer customer, SelfConsultingResult selfConsultingResult, String sessionId) {
        return SelfConsulting.builder()
                .customer(customer)
                .selfConsultingResult(selfConsultingResult)
                .sessionId(sessionId)
                .build();
    }

    private void toColorColorSet(ColorSet requestColorSet, List<String> colorSet) {
        colorSet.stream()
                .map(hex -> colorRepository.findByHex(hex)
                        .orElseThrow(() -> new NotFoundException(COLOR_NOT_FOUND)))
                .forEach(requestColorSet::addColor);
    }
}
