package com.yourseason.backend.member.customer.domain;

import com.yourseason.backend.consulting.domain.Consulting;
import com.yourseason.backend.member.common.domain.Member;
import com.yourseason.backend.reservation.domain.Reservation;
import com.yourseason.backend.review.domain.Review;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AttributeOverride(name = "id", column = @Column(name = "customer_id"))
@Entity
public class Customer extends Member {

    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Consulting> consultings = new ArrayList<>();

    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Reservation> reservations = new ArrayList<>();

    @OneToMany(mappedBy = "customer", cascade = CascadeType.PERSIST, orphanRemoval = true)
    private List<Review> reviews = new ArrayList<>();

    @Builder
    public Customer(Long id, LocalDateTime createdTime, LocalDateTime lastModifiedTime, LocalDateTime deletedDate, boolean isActive,
                    String email, String password, String name, LocalDate birth, String nickname, String contact, String imageUrl,
                    List<Consulting> consultings, List<Reservation> reservations, List<Review> reviews) {
        super(id, createdTime, lastModifiedTime, deletedDate, isActive,
                email, password, name, birth, nickname, contact, imageUrl);
        this.consultings = consultings;
        this.reservations = reservations;
        this.reviews = reviews;
    }

    public void updateProfile(String nickname, String contact, String imageUrl) {
        super.updateProfile(nickname, contact, imageUrl);
    }
}
