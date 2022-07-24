package com.yourseason.backend.member.consultant.domain;

import com.yourseason.backend.consulting.domain.Consulting;
import com.yourseason.backend.member.common.domain.Member;
import com.yourseason.backend.reservation.domain.Reservation;
import com.yourseason.backend.review.domain.Review;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AttributeOverride(name = "id", column = @Column(name = "consultant_id"))
@Entity
public class Consultant extends Member {

    private String introduction;

    @NotNull
    private String cost;

    private double starAverage;
    private int reviewCount;
    private String consultingFile;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "license_id")
    private License license;

    @NotNull
    private String licenseNumber;

    @OneToMany(mappedBy = "consultant", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ClosedDay> closedDays = new ArrayList<>();

    @OneToMany(mappedBy = "consultant", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Consulting> consultings = new ArrayList<>();

    @Builder
    public Consultant(Long id, LocalDateTime createdTime, LocalDateTime lastModifiedTime, LocalDateTime deletedDate, boolean isActive,
                      String email, String password, String name, LocalDate birth, String nickname, String contact, String imageUrl,
                      List<Consulting> consultings, List<Reservation> reservations, List<Review> reviews, String consultingFile,
                      String introduction, String cost, double starAverage, int reviewCount, License license, String licenseNumber, List<ClosedDay> closedDays) {
        super(id, createdTime, lastModifiedTime, deletedDate, isActive, email, password, name, birth, nickname, contact, imageUrl, reservations, reviews);
        this.introduction = introduction;
        this.cost = cost;
        this.starAverage = starAverage;
        this.reviewCount = reviewCount;
        this.consultingFile = consultingFile;
        this.license = license;
        this.licenseNumber = licenseNumber;
        this.closedDays = closedDays;
        this.consultings = consultings;
    }

    public void registerLicense(License license) {
        this.license = license;
    }
}
