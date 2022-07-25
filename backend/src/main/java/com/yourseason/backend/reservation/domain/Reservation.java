package com.yourseason.backend.reservation.domain;

import com.yourseason.backend.common.domain.BaseTimeEntity;
import com.yourseason.backend.member.consultant.domain.Consultant;
import com.yourseason.backend.member.customer.domain.Customer;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AttributeOverride(name = "id", column = @Column(name = "reservation_id"))
@Entity
public class Reservation extends BaseTimeEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id")
    private Customer customer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "consultant_id")
    private Consultant consultant;

    @NotNull
    @Column(name = "reservation_date")
    private LocalDate date;

    @NotNull
    @Column(name = "reservation_time")
    private LocalTime time;

    private String request;

    @Builder
    public Reservation(Long id, LocalDateTime createdDate, LocalDateTime lastModifiedDate, LocalDateTime deletedDate, boolean isActive,
                       Customer customer, Consultant consultant, LocalDate date, LocalTime time, String request) {
        super(id, createdDate, lastModifiedDate, deletedDate, isActive);
        this.customer = customer;
        this.consultant = consultant;
        this.date = date;
        this.time = time;
        this.request = request;
    }

    public void registerCustomer(Customer customer) {
        this.customer = customer;
    }

    public void registerConsultant(Consultant consultant) {
        this.consultant = consultant;
    }
}
