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
import java.util.Objects;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AttributeOverride(name = "id", column = @Column(name = "consultant_id"))
@Entity
public class Consultant extends Member {

    private String introduction;
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

    @OneToMany(mappedBy = "consultant", cascade = CascadeType.PERSIST)
    private List<Reservation> reservations = new ArrayList<>();

    @OneToMany(mappedBy = "consultant", cascade = CascadeType.PERSIST)
    private List<Review> reviews = new ArrayList<>();

    @OneToMany(mappedBy = "consultant", cascade = CascadeType.PERSIST)
    private List<Consulting> consultings = new ArrayList<>();

    @Builder
    public Consultant(Long id, LocalDateTime createdTime, LocalDateTime lastModifiedTime, LocalDateTime deletedDate,
                      String email, String password, String name, LocalDate birth, String nickname, String contact, String imageUrl,
                      List<Consulting> consultings, List<Reservation> reservations, List<Review> reviews, String consultingFile,
                      String introduction, String cost, double starAverage, int reviewCount, License license, String licenseNumber, List<ClosedDay> closedDays) {
        super(id, createdTime, lastModifiedTime, deletedDate, email, password, name, birth, nickname, contact, imageUrl);
        this.introduction = introduction;
        this.cost = cost;
        this.starAverage = starAverage;
        this.reviewCount = reviewCount;
        this.consultingFile = consultingFile;
        this.license = license;
        this.licenseNumber = licenseNumber;
        this.closedDays = closedDays;
        this.reservations = reservations;
        this.reviews = reviews;
        this.consultings = consultings;
    }

    public void registerLicense(License license) {
        this.license = license;
    }

    public void updateProfile(String nickname, String contact, String imageUrl, String introduction, String cost) {
        super.updateProfile(nickname, contact, imageUrl);
        this.introduction = introduction;
        this.cost = cost;
    }

    public void withdraw() {
        super.withdraw();
    }

    public void deleteClosedDay(ClosedDay closedDay) {
        closedDays.remove(closedDay);
    }

    @Override
    public boolean equals(Object o) {
        return o instanceof Member && this.getEmail().equals(((Member) o).getEmail());
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.getEmail());
    }

    public void addClosedDay(ClosedDay closedDay) {
        closedDays.add(closedDay);
    }

    public void updateStarAverageByCreatedReview(int star) {
        starAverage = (getTotalStar() + star) / ++reviewCount;
    }

    public void updateStarAverageByDeletedReview(int star) {
        --reviewCount;
        if (reviewCount != 0) {
            starAverage = (getTotalStar() - star) / reviewCount;
        } else {
            starAverage = 0;
        }
    }

    private double getTotalStar() {
        return starAverage * reviewCount;
    }
}
