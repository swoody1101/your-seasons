package com.yourseason.backend.reservation.service;

import com.yourseason.backend.common.domain.Message;
import com.yourseason.backend.common.exception.WrongAccessException;
import com.yourseason.backend.member.customer.domain.Customer;
import com.yourseason.backend.member.customer.domain.CustomerRepository;
import com.yourseason.backend.reservation.domain.Reservation;
import com.yourseason.backend.reservation.domain.ReservationRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;

import java.time.LocalDate;
import java.time.LocalTime;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class ReservationServiceTest {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private ReservationService reservationService;

    private Customer loginCustomer;
    private Customer badCustomer;
    private Reservation reservation;

    @BeforeEach
    void setUp() {
        LocalDate birth = LocalDate.now();

        loginCustomer = customerRepository.save(
                Customer.builder()
                        .email("a1234@gmail.com")
                        .password("aaaaaaaa")
                        .name("우영우")
                        .birth(birth)
                        .nickname("우영우")
                        .contact("010-1234-1234")
                        .imageUrl("asdf")
                        .build());

        badCustomer = customerRepository.save(
                Customer.builder()
                        .email("b1234@gmail.com")
                        .password("bbbbbbbb")
                        .name("우영우")
                        .birth(birth)
                        .nickname("동그라미")
                        .contact("010-4321-4321")
                        .imageUrl("asdf")
                        .build());

        reservation = reservationRepository.save(
                Reservation.builder()
                        .customer(loginCustomer)
                        .date(LocalDate.now())
                        .time(LocalTime.now())
                        .request("예쁘게 해주세요")
                        .build());
    }

    @DisplayName("예약 취소 성공")
    @Test
    public void cancel_reservation_success() throws Exception {
        assertThat(reservationService.deleteReservation(loginCustomer.getId(), reservation.getId()))
                .isEqualTo(new Message("succeeded"));
    }

    @DisplayName("예약 취소 실패")
    @Test
    public void cancel_reservation_fail() throws Exception {
        assertThatThrownBy(() -> reservationService.deleteReservation(badCustomer.getId(), reservation.getId()))
                .isInstanceOf(WrongAccessException.class)
                .hasMessage("잘못된 접근입니다.");
    }
}
