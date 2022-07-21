package com.yourseason.backend.member.consultant.domain;

import com.yourseason.backend.consulting.domain.Consulting;
import com.yourseason.backend.member.Member;
import com.yourseason.backend.reservation.domain.Reservation;
import com.yourseason.backend.review.domain.Review;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AttributeOverride(name = "id", column = @Column(name = "consultant_id"))
@Entity
public class Consultant extends Member {

    private String introduction;

    @NotNull
    private String cost;

    private double starAverage;
    private int reviewCount;

    @NotNull
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "license_id")
    private License license;

    @NotNull
    private String licenseNumber;

    @OneToMany(mappedBy = "consultant", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ClosedDay> closedDays;

    @Builder
    public Consultant(Long id, LocalDateTime createdTime, LocalDateTime lastModifiedTime,
                      String email, String password, String name, LocalDate birth, String nickname, String contact, String imageUrl,
                      List<Consulting> consultings, List<Reservation> reservations, List<Review> reviews,
                      String introduction, String cost, double starAverage, int reviewCount, License license, String licenseNumber, List<ClosedDay> closedDays) {
        super(id, createdTime, lastModifiedTime, email, password, name, birth, nickname, contact, imageUrl, consultings, reservations, reviews);
        this.introduction = introduction;
        this.cost = cost;
        this.starAverage = starAverage;
        this.reviewCount = reviewCount;
        this.license = license;
        this.licenseNumber = licenseNumber;
        this.closedDays = closedDays;
    }
}
