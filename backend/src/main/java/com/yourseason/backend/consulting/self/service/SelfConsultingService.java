package com.yourseason.backend.consulting.self.service;

import com.yourseason.backend.common.domain.*;
import com.yourseason.backend.common.exception.InternalServerErrorException;
import com.yourseason.backend.common.exception.NotFoundException;
import com.yourseason.backend.common.exception.WrongAccessException;
import com.yourseason.backend.consulting.common.domain.BestColorSet;
import com.yourseason.backend.consulting.common.domain.WorstColorSet;
import com.yourseason.backend.consulting.self.controller.dto.SelfConsultingCreateResponse;
import com.yourseason.backend.consulting.self.controller.dto.SelfConsultingFinishRequest;
import com.yourseason.backend.consulting.self.domain.SelfConsulting;
import com.yourseason.backend.consulting.self.domain.SelfConsultingRepository;
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
    private static final String FAIL_TO_SAVE_SELF_CONSULTING_INFO = "자가진단 정보 저장에 실패했습니다.";
    private static final String SELF_CONSULTING_NOT_FOUND = "해당 자가진단을 찾을 수 없습니다.";
    private static final String WRONG_ACCESS = "잘못된 접근입니다.";
    private static final String EMAIL_FORMAT = "[@.]";
    private static final String SESSION_DELIMITER = "-";
    private static final int BEST_TONE = 0;

    private final ColorRepository colorRepository;
    private final CustomerRepository customerRepository;
    private final ToneRepository toneRepository;
    private final SelfConsultingRepository selfConsultingRepository;

    public SelfConsultingCreateResponse createSelfConsulting(Long customerId) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new NotFoundException(CUSTOMER_NOT_FOUND));
        customer.createSelfConsulting(getNewSelfConsulting(customer, getSessionId(customer)));
        customerRepository.save(customer);
        return SelfConsultingCreateResponse.builder()
                .selfConsultingId(getSelfConsultingId(customer))
                .build();
    }

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

        Collections.sort(percentages, new Comparator<Percentage>() {
            @Override
            public int compare(Percentage p1, Percentage p2) {
                return p2.getPercentage() - p1.getPercentage();
            }
        });
        Tone bestTone = percentages.get(BEST_TONE).getTone();

        SelfConsultingResult selfConsultingResult = SelfConsultingResult.builder()
                .bestColorSet(bestColorSet)
                .worstColorSet(worstColorSet)
                .percentages(percentages)
                .tone(bestTone)
                .build();

        selfConsulting.done(selfConsultingResult);
        selfConsultingRepository.save(selfConsulting);
        return new Message("succeeded");
    }

    private String getSessionId(Customer customer) {
        return String.join(SESSION_DELIMITER, customer.getEmail().split(EMAIL_FORMAT));
    }

    private SelfConsulting getNewSelfConsulting(Customer customer, String sessionId) {
        return SelfConsulting.builder()
                .customer(customer)
                .sessionId(sessionId)
                .build();
    }

    private Long getSelfConsultingId(Customer customer) {
        return customer.getSelfConsultings()
                .stream()
                .filter(SelfConsulting::isActive)
                .map(SelfConsulting::getId)
                .findFirst()
                .orElseThrow(() -> new InternalServerErrorException(FAIL_TO_SAVE_SELF_CONSULTING_INFO));
    }

    private void toColorColorSet(ColorSet requestColorSet, List<String> colorSet) {
        colorSet.stream()
                .map(hex -> colorRepository.findByHex(hex)
                        .orElseThrow(() -> new NotFoundException(COLOR_NOT_FOUND)))
                .forEach(requestColorSet::addColor);
    }
}
