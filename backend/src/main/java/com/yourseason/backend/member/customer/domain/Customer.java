package com.yourseason.backend.member.customer.domain;

import com.yourseason.backend.consulting.consultant.domain.Consulting;
import com.yourseason.backend.consulting.self.domain.SelfConsulting;
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
import java.util.Objects;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AttributeOverride(name = "id", column = @Column(name = "customer_id"))
@Entity
public class Customer extends Member {

    @OneToMany(mappedBy = "customer", cascade = CascadeType.PERSIST)
    private List<Consulting> consultings = new ArrayList<>();

    @OneToMany(mappedBy = "customer", cascade = CascadeType.PERSIST)
    private List<SelfConsulting> selfConsultings = new ArrayList<>();

    @OneToMany(mappedBy = "customer", cascade = CascadeType.PERSIST)
    private List<Reservation> reservations = new ArrayList<>();

    @OneToMany(mappedBy = "customer", cascade = CascadeType.PERSIST)
    private List<Review> reviews = new ArrayList<>();

    @Builder
    public Customer(Long id, LocalDateTime createdTime, LocalDateTime lastModifiedTime, LocalDateTime deletedDate,
                    String email, String password, String name, LocalDate birth, String nickname, String contact, String imageUrl,
                    List<Consulting> consultings, List<Reservation> reservations, List<Review> reviews) {
        super(id, createdTime, lastModifiedTime, deletedDate,
                email, password, name, birth, nickname, contact, imageUrl);
        this.consultings = consultings;
        this.reservations = reservations;
        this.reviews = reviews;
    }

    public void updateProfile(String nickname, String contact, String imageUrl) {
        super.updateProfile(nickname, contact, imageUrl);
    }

    public void withdraw() {
        super.withdraw();
    }

    @Override
    public boolean equals(Object o) {
        return o instanceof Member && this.getEmail().equals(((Member) o).getEmail());
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.getEmail());
    }

    public void joinConsulting(Consulting consulting) {
        consultings.add(consulting);
        consulting.enterCustomer(this);
    }
}
