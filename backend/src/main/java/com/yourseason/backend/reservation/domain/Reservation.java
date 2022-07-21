package com.yourseason.backend.reservation.domain;

import com.yourseason.backend.common.domain.BaseTimeEntity;
import com.yourseason.backend.member.consultant.domain.Consultant;
import com.yourseason.backend.member.customer.domain.Customer;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

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
    private LocalDateTime date;

    @NotNull
    private LocalDateTime time;

    private String request;

    @Builder
    public Reservation(Long id, LocalDateTime createdTime, LocalDateTime lastModifiedTime,
                       Customer customer, Consultant consultant, LocalDateTime date, LocalDateTime time, String request) {
        super(id, createdTime, lastModifiedTime);
        this.customer = customer;
        this.consultant = consultant;
        this.date = date;
        this.time = time;
        this.request = request;
    }
}
