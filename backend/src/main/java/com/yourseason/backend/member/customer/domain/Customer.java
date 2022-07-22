package com.yourseason.backend.member.customer.domain;

import com.yourseason.backend.consulting.domain.Consulting;
import com.yourseason.backend.member.domain.Member;
import com.yourseason.backend.reservation.domain.Reservation;
import com.yourseason.backend.review.domain.Review;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.NoArgsConstructor;

import javax.persistence.AttributeOverride;
import javax.persistence.Column;
import javax.persistence.Entity;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AttributeOverride(name = "id", column = @Column(name = "customer_id"))
@Entity
public class Customer extends Member {

    @Builder
    public Customer(Long id, LocalDateTime createdTime, LocalDateTime lastModifiedTime, LocalDateTime deletedDate, boolean isActive,
                    String email, String password, String name, LocalDate birth, String nickname, String contact, String imageUrl,
                    List<Consulting> consultings, List<Reservation> reservations, List<Review> reviews) {
        super(id, createdTime, lastModifiedTime, deletedDate, isActive,
                email, password, name, birth, nickname, contact, imageUrl,
                consultings, reservations, reviews);
    }
}
