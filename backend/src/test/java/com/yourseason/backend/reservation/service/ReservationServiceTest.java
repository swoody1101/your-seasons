package com.yourseason.backend.reservation.service;

import com.yourseason.backend.member.customer.domain.Customer;
import com.yourseason.backend.member.customer.domain.CustomerRepository;
import com.yourseason.backend.reservation.domain.Reservation;
import com.yourseason.backend.reservation.domain.ReservationRepository;
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

    @Test
    public void 고객이_같은지() throws Exception {
        LocalDate birth = LocalDate.now();

        Customer loginCustomer = customerRepository.save(Customer.builder()
                        .email("asdf")
                        .password("asdfasdf")
                        .name("박태이")
                        .birth(birth)
                        .nickname("박태태")
                        .contact("0106486492811")
                        .imageUrl("asdf")
                        .build());

        Customer badCustomer = customerRepository.save(Customer.builder()
                .email("asdf")
                .password("asdfasdf")
                .name("박태이")
                .birth(birth)
                .nickname("박태태")
                .contact("0106486492811")
                .imageUrl("asdf")
                .build());


        Reservation reservation = reservationRepository.save(Reservation.builder()
                        .customer(loginCustomer)
                        .date(LocalDate.now())
                        .time(LocalTime.now())
                        .request("예쁘게 해주세요")
                        .build());

        System.out.println(loginCustomer == reservation.getCustomer());
    }
}