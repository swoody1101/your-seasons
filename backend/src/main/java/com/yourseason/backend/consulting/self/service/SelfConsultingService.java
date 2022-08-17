package com.yourseason.backend.consulting.self.service;

import com.yourseason.backend.common.domain.*;
import com.yourseason.backend.common.exception.NotFoundException;
import com.yourseason.backend.common.exception.WrongAccessException;
import com.yourseason.backend.consulting.common.domain.BestColorSet;
import com.yourseason.backend.consulting.common.domain.WorstColorSet;
import com.yourseason.backend.consulting.self.controller.dto.SelfConsultingFinishRequest;
import com.yourseason.backend.consulting.self.domain.SelfConsulting;
import com.yourseason.backend.consulting.self.domain.SelfConsultingRepository;
import com.yourseason.backend.consulting.self.domain.result.Percentage;
import com.yourseason.backend.consulting.self.domain.result.SelfConsultingResult;
import com.yourseason.backend.consulting.self.domain.result.SelfConsultingResultRepository;
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
    private static final String SELF_CONSULTING_NOT_FOUND = "해당 자가진단을 찾을 수 없습니다.";
    private static final String WRONG_ACCESS = "잘못된 접근입니다.";
    private static final int BEST_TONE = 0;

    private final ColorRepository colorRepository;
    private final CustomerRepository customerRepository;
    private final ToneRepository toneRepository;
    private final SelfConsultingRepository selfConsultingRepository;

    @Transactional
    public Message finishSelfConsulting(Long customerId, SelfConsultingFinishRequest selfConsultingFinishRequest) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new NotFoundException(CUSTOMER_NOT_FOUND));
        SelfConsulting selfConsulting = selfConsultingRepository.findById(selfConsultingFinishRequest.getSelfConsultingId())
                .orElseThrow(() -> new NotFoundException(SELF_CONSULTING_NOT_FOUND));
        if (!customer.equals(selfConsulting.getCustomer())) {
            throw new WrongAccessException(WRONG_ACCESS);
        }

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

        Map<String, Integer> toneCountings = new TreeMap<>(Collections.reverseOrder());
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

        Tone bestTone = percentages.get(BEST_TONE).getTone();

        SelfConsultingResult selfConsultingResult = SelfConsultingResult.builder()
                .bestColorSet(bestColorSet)
                .worstColorSet(worstColorSet)
                .percentages(percentages)
                .tone(bestTone)
                .build();

        selfConsulting.updateResult(selfConsultingResult);
        selfConsulting.done();
        selfConsultingRepository.save(selfConsulting);
        return new Message("succeeded");
    }

    private void toColorColorSet(ColorSet requestColorSet, List<String> colorSet) {
        colorSet.stream()
                .map(hex -> colorRepository.findByHex(hex)
                        .orElseThrow(() -> new NotFoundException(COLOR_NOT_FOUND)))
                .forEach(requestColorSet::addColor);
    }
}
