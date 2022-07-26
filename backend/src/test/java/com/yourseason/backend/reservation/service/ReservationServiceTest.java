package com.yourseason.backend.reservation.service;

import com.yourseason.backend.common.domain.Message;
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

import static org.junit.jupiter.api.Assertions.*;

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
                        .email("a1234")
                        .password("asdfasdf")
                        .name("박태이")
                        .birth(birth)
                        .nickname("박태태")
                        .contact("0106486492811")
                        .imageUrl("asdf")
                        .build());

        badCustomer = customerRepository.save(Customer.builder()
                .email("b1234")
                .password("asdfasdf")
                .name("박태이")
                .birth(birth)
                .nickname("박태태")
                .contact("0106486492812")
                .imageUrl("asdf")
                .build());


        reservation = reservationRepository.save(Reservation.builder()
                .customer(loginCustomer)
                .date(LocalDate.now())
                .time(LocalTime.now())
                .request("예쁘게 해주세요")
                .build());
    }

    @DisplayName("view_reservation_customer_success")
    @Test
    public void view_reservation_customer_success() throws Exception {
//        System.out.println(loginCustomer == reservation.getCustomer());
        assertEquals(new Message("succeed"), reservationService.deleteReservation(loginCustomer.getId(), reservation.getId()));
    }

    @DisplayName("view_reservation_customer_fail")
    @Test
    public void view_reservation_customer_fail() throws Exception {
//        System.out.println(loginCustomer == reservation.getCustomer());
        assertNotEquals(badCustomer, reservation.getCustomer());
    }
}