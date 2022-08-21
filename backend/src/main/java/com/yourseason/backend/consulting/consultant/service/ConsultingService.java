package com.yourseason.backend.consulting.consultant.service;

import com.yourseason.backend.common.domain.*;
import com.yourseason.backend.common.exception.*;
import com.yourseason.backend.consulting.common.domain.BestColorSet;
import com.yourseason.backend.consulting.common.domain.WorstColorSet;
import com.yourseason.backend.consulting.consultant.controller.dto.ConsultingFinishRequest;
import com.yourseason.backend.consulting.consultant.controller.dto.ConsultingJoinResponse;
import com.yourseason.backend.consulting.consultant.controller.dto.ConsultingRequest;
import com.yourseason.backend.consulting.consultant.domain.Consulting;
import com.yourseason.backend.consulting.consultant.domain.ConsultingRepository;
import com.yourseason.backend.consulting.consultant.domain.result.ConsultingResult;
import com.yourseason.backend.member.consultant.domain.Consultant;
import com.yourseason.backend.member.consultant.domain.ConsultantRepository;
import com.yourseason.backend.member.customer.domain.Customer;
import com.yourseason.backend.member.customer.domain.CustomerRepository;
import com.yourseason.backend.reservation.domain.Reservation;
import com.yourseason.backend.reservation.domain.ReservationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

@RequiredArgsConstructor
@Service
public class ConsultingService {

    private static final String CONSULTANT_NOT_FOUND = "해당 컨설턴트를 찾을 수 없습니다.";
    private static final String CUSTOMER_NOT_FOUND = "해당 고객을 찾을 수 없습니다.";
    private static final String COLOR_NOT_FOUND = "해당 색상을 찾을 수 없습니다.";
    private static final String TONE_NOT_FOUND = "해당 톤을 찾을 수 없습니다.";
    private static final String RESERVATION_NOT_FOUND = "해당 예약을 찾을 수 없습니다.";
    private static final String CONSULTING_NOT_OPENED = "컨설팅이 개설되지 않았습니다.";
    private static final String CAN_NOT_ENTER_CONSULTING = "해당 컨설팅에 입장하실 수 없습니다.";
    private static final String FAIL_TO_SAVE_CONSULTING_FILE = "컨설팅 진단표 저장에 실패했습니다.";
    private static final String WRONG_ACCESS = "잘못된 접근입니다.";
    private static final String WRONG_CONTENT_TYPE = "잘못된 확장자입니다.";
    private static final String SESSION_DELIMITER = "-";
    private static final String EMAIL_FORMAT = "[@.]";

    private final ConsultantRepository consultantRepository;
    private final CustomerRepository customerRepository;
    private final ConsultingRepository consultingRepository;
    private final ReservationRepository reservationRepository;
    private final ColorRepository colorRepository;
    private final ToneRepository toneRepository;

    @Transactional
    public ConsultingJoinResponse joinConsulting(Long customerId, ConsultingRequest consultingRequest) {
        Reservation reservation = reservationRepository.findById(consultingRequest.getReservationId())
                .orElseThrow(() -> new NotFoundException(RESERVATION_NOT_FOUND));
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new NotFoundException(CUSTOMER_NOT_FOUND));
        if (!customer.equals(reservation.getCustomer())) {
            throw new WrongAccessException(CAN_NOT_ENTER_CONSULTING);
        }
        Consultant consultant = reservation.getConsultant();
        Consulting consulting = consultant.getConsultings()
                .stream()
                .filter(Consulting::isActive)
                .findFirst()
                .orElseThrow(() -> new BadRequestException(CONSULTING_NOT_OPENED));
        customer.joinConsulting(consulting);
        customerRepository.save(customer);
        return ConsultingJoinResponse.builder()
                .sessionId(getSessionId(consultant))
                .build();
    }

    @Transactional
    public Message finishConsulting(Long consultantId, ConsultingFinishRequest consultingFinishRequest, MultipartFile multipartFile) {
        Consultant consultant = consultantRepository.findById(consultantId)
                .orElseThrow(() -> new NotFoundException(CONSULTANT_NOT_FOUND));
        Reservation reservation = reservationRepository.findById(consultingFinishRequest.getReservationId())
                .filter(Reservation::isActive)
                .orElseThrow(() -> new NotFoundException(RESERVATION_NOT_FOUND));
        if (!consultant.equals(reservation.getConsultant())) {
            throw new WrongAccessException(WRONG_ACCESS);
        }

        String sessionId = getSessionId(consultant);
        Consulting consulting = getConsulting(consultant, sessionId);
        consultant.createConsulting(consulting);
        consultantRepository.save(consultant);

        String consultingFile = saveImage(multipartFile);

        ColorSet requestBestColorSet = ColorSet.builder().build();
        toColorColorSet(requestBestColorSet, consultingFinishRequest.getBestColorSet());
        BestColorSet bestColorSet = BestColorSet.builder()
                .colorSet(requestBestColorSet)
                .build();

        ColorSet requestWorstColorSet = ColorSet.builder().build();
        toColorColorSet(requestWorstColorSet, consultingFinishRequest.getWorstColorSet());
        WorstColorSet worstColorSet = WorstColorSet.builder()
                .colorSet(requestWorstColorSet)
                .build();

        Tone tone = toneRepository.findByName(consultingFinishRequest.getTone())
                .orElseThrow(() -> new NotFoundException(TONE_NOT_FOUND));

        ConsultingResult consultingResult = ConsultingResult.builder()
                .tone(tone)
                .consultingComment(consultingFinishRequest.getConsultingComment())
                .bestColorSet(bestColorSet)
                .worstColorSet(worstColorSet)
                .consultingFile(consultingFile)
                .build();

        consulting.done(consultingResult);
        consultingRepository.save(consulting);
        return new Message("succeeded");
    }

    private String saveImage(MultipartFile multipartFile) {
        checkContentType(multipartFile);

        StringBuilder imageUploadPath = new StringBuilder(new File("/home/ubuntu").getAbsolutePath());
        imageUploadPath.append("img");
        File imageFile = new File(imageUploadPath.toString());
        if (!imageFile.exists()) {
            imageFile.mkdir();
        }
        String fileName = LocalDateTime.now() + multipartFile.getOriginalFilename();
        imageUploadPath.append(File.separator)
                .append(fileName);
        try {
            multipartFile.transferTo(new File(imageUploadPath.toString()));
        } catch (IOException e) {
            throw new InternalServerErrorException(FAIL_TO_SAVE_CONSULTING_FILE);
        }
        return imageUploadPath.toString();
    }

    private void checkContentType(MultipartFile multipartFile) {
        if (isWrongContentType(multipartFile.getContentType())) {
            throw new WrongFormException(WRONG_CONTENT_TYPE);
        }
    }

    private boolean isWrongContentType(String contentType) {
        return !(contentType.contains("image/jpg") || contentType.contains("image/jpeg") || contentType.contains("image/png"));
    }

    private void toColorColorSet(ColorSet requestWorstColorSet, List<String> colorSet) {
        colorSet.stream()
                .map(hex -> colorRepository.findByHex(hex)
                        .orElseThrow(() -> new NotFoundException(COLOR_NOT_FOUND)))
                .forEach(requestWorstColorSet::addColor);
    }

    private String getSessionId(Consultant consultant) {
        return String.join(SESSION_DELIMITER, consultant.getEmail().split(EMAIL_FORMAT));
    }

    private Consulting getConsulting(Consultant consultant, String sessionId) {
        return consultant.getConsultings()
                .stream()
                .filter(Consulting::isActive)
                .findFirst()
                .orElseGet(() -> Consulting.builder()
                        .consultant(consultant)
                        .sessionId(sessionId)
                        .build());
    }
}
