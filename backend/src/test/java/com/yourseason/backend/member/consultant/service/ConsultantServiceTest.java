package com.yourseason.backend.member.consultant.service;

import com.yourseason.backend.member.consultant.domain.Consultant;
import com.yourseason.backend.member.consultant.domain.ConsultantRepository;
import com.yourseason.backend.reservation.domain.Reservation;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.api.extension.Extension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.web.WebAppConfiguration;

@WebAppConfiguration
@ExtendWith(Extension.class)
@SpringBootTest
class ConsultantServiceTest {

    @Autowired
    private ConsultantRepository consultantRepository;

    @DisplayName("컨설턴트 목록 조회 테스트")
    @Test
    void get_consultant_list() {
        // given
        Consultant 김싸피 = Consultant.builder()
                .id(1L)
                .name("김싸피")
                .build();
        Reservation reservation = Reservation.builder()
                .request("요청")
                .build();
        김싸피.getReservations()
                .add(reservation);
        consultantRepository.save(김싸피);

        // when

        // then

    }
}