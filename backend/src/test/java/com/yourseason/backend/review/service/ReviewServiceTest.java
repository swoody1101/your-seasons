package com.yourseason.backend.review.service;

import com.yourseason.backend.common.exception.NotFoundException;
import com.yourseason.backend.member.consultant.domain.Consultant;
import com.yourseason.backend.member.consultant.domain.ConsultantRepository;
import com.yourseason.backend.member.consultant.domain.License;
import com.yourseason.backend.member.consultant.domain.LicenseRepository;
import com.yourseason.backend.member.customer.domain.Customer;
import com.yourseason.backend.member.customer.domain.CustomerRepository;
import com.yourseason.backend.review.controller.dto.ReviewRequest;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class ReviewServiceTest {

    @Autowired
    private ReviewService reviewService;

    @Autowired
    private ConsultantRepository consultantRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private LicenseRepository licenseRepository;

    @DisplayName("리뷰 등록 성공")
    @Test
    public void test_register_review_success() {
        // given
        License license = licenseRepository.save(
                License.builder()
                        .name("자격증")
                        .build());

        Consultant consultant = consultantRepository.save(
                Consultant.builder()
                        .email("b1234@gmail.com")
                        .password("bbbbbbbb")
                        .name("우영우")
                        .birth(LocalDate.now())
                        .nickname("동그라미")
                        .contact("010-4321-4321")
                        .imageUrl("asdf")
                        .starAverage(4.0)
                        .reviewCount(10)
                        .license(license)
                        .licenseNumber("sdkfjslkfjsf")
                        .build());

        Customer customer = customerRepository.save(
                Customer.builder()
                        .email("a1234@gmail.com")
                        .password("aaaaaaaa")
                        .name("우영우")
                        .birth(LocalDate.now())
                        .nickname("우영우")
                        .contact("010-1234-1234")
                        .imageUrl("asdf")
                        .build());

        ReviewRequest reviewRequest = new ReviewRequest(15, "짱");

        // when
        reviewService.createReview(customer.getId(), consultant.getId(), reviewRequest);
        Consultant consultantAfterRegisterReview = consultantRepository.findById(consultant.getId())
                .orElseThrow(() -> new NotFoundException("없다"));

        // then
        assertThat(consultantAfterRegisterReview.getStarAverage())
                .isEqualTo(5.0);
    }
}
