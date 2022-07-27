package com.yourseason.backend.member.customer.service;

import com.yourseason.backend.common.domain.Message;
import com.yourseason.backend.common.exception.ImageUploadException;
import com.yourseason.backend.common.exception.NotEqualException;
import com.yourseason.backend.common.exception.NotFoundException;
import com.yourseason.backend.member.common.controller.dto.PasswordUpdateRequest;
import com.yourseason.backend.member.customer.controller.dto.*;
import com.yourseason.backend.member.customer.domain.Customer;
import com.yourseason.backend.member.customer.domain.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class CustomerService {

    private static final String CUSTOMER_NOT_FOUND = "해당 회원을 찾을 수 없습니다.";
    private static final String IMAGE_UPLOAD_FAIL = "이미지 업로드에 실패하였습니다.";
    private static final String PASSWORD_NOT_EQUAL = "비밀번호가 올바르지 않습니다.";

    private final CustomerRepository customerRepository;
    private final ReservationRepository reservationRepository;

    public void createCustomer(CustomerSignupRequest request) {
        customerRepository.save(request.toEntity());
    }

    public CustomerResponse getCustomer(Long customerId) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new NotFoundException(CUSTOMER_NOT_FOUND));

        return CustomerResponse.builder()
                .name(customer.getName())
                .nickname(customer.getNickname())
                .birth(customer.getBirth())
                .contact(customer.getContact())
                .email(customer.getEmail())
                .build();
    }

    public List<ReservationListResponse> getMyReservations(Long customerId) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new NotFoundException(CUSTOMER_NOT_FOUND));

        return customer.getReservations()
                .stream()
                .map(reservation -> ReservationListResponse.builder()
                        .reservationId(reservation.getId())
                        .reservationDate(reservation.getDate())
                        .reservationTime(reservation.getTime())
                        .consultantNickname(reservation.getConsultant().getNickname())
                        .consultantImageUrl(reservation.getConsultant().getImageUrl())
                        .request(reservation.getRequest())
                        .isActive(reservation.isActive())
                        .build())
                .collect(Collectors.toList());
    }

    public List<ReviewListResponse> getMyReviews(Long customerId) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new NotFoundException(CUSTOMER_NOT_FOUND));

        return customer.getReviews()
                .stream()
                .map(review -> ReviewListResponse.builder()
                        .reviewId(review.getId())
                        .consultantNickname(review.getConsultant().getNickname())
                        .consultantImageUrl(review.getConsultant().getImageUrl())
                        .star(review.getStar())
                        .comment(review.getComment())
                        .reviewDate(review.getCreatedDate().toLocalDate())
                        .build())
                .collect(Collectors.toList());
    }

    public List<ConsultingListResponse> getMyConsultings(Long customerId) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new NotFoundException(CUSTOMER_NOT_FOUND));

        return customer.getConsultings()
                .stream()
                .map(consulting -> ConsultingListResponse.builder()
                        .consultantId(consulting.getConsultant().getId())
                        .consultingId(consulting.getId())
                        .consultantNickname(consulting.getConsultant().getNickname())
                        .consultantImageUrl(consulting.getConsultant().getImageUrl())
                        .consultingDate(consulting.getCreatedDate().toLocalDate())
                        .tone(consulting.getTestResult().getTone().getName())
                        .bestColorSet(consulting.getTestResult().getBestColorSet())
                        .worstColorSet(consulting.getTestResult().getWorstColorSet())
                        .resultImageUrl(consulting.getTestResult().getConsultingFile())
                        .comment(consulting.getComment())
                        .hasReview(consulting.isHasReview())
                        .build())
                .collect(Collectors.toList());
    }

    public Message updateCustomer(Long customerId, CustomerUpdateRequest customerUpdateRequest, MultipartFile multipartFile) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new NotFoundException(CUSTOMER_NOT_FOUND));

        String imageUrl = customer.getImageUrl();
        if(imageUrl == null) {
            String filePath = System.getProperty("user.dir") + "/src/main/resources/static/img/";
            String fileName = customer.getEmail();
            imageUrl = filePath + fileName;
        }
        try {
            byte[] bytes = multipartFile.getBytes();
            File file = new File(imageUrl);
            FileOutputStream fileOutputStream = new FileOutputStream(file);
            fileOutputStream.write(bytes);
            fileOutputStream.flush();
            fileOutputStream.close();
        } catch (IOException e) {
            throw new ImageUploadException(IMAGE_UPLOAD_FAIL);
        }

        customer.updateProfile(customerUpdateRequest.getNickname(), customerUpdateRequest.getContact(), imageUrl);
        customerRepository.save(customer);
        return new Message("succeeded");
    }

    public Message updateCustomerPassword(Long customerId, PasswordUpdateRequest passwordUpdateRequest) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new NotFoundException(CUSTOMER_NOT_FOUND));
        if (!passwordUpdateRequest.getBeforePassword().equals(customer.getPassword())) {
            throw new NotEqualException(PASSWORD_NOT_EQUAL);
        }
        customer.changePassword(passwordUpdateRequest.getAfterPassword());
        customerRepository.save(customer);
        return new Message(("succeeded"));
    }

    public Message deleteCustomer(Long customerId) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new NotFoundException(CUSTOMER_NOT_FOUND));
        customer.withdraw();
        return new Message("succeeded");
    }
}
