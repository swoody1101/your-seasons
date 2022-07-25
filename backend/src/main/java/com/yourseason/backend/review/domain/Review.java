package com.yourseason.backend.review.domain;

import com.yourseason.backend.common.domain.BaseTimeEntity;
import com.yourseason.backend.member.consultant.domain.Consultant;
import com.yourseason.backend.member.customer.domain.Customer;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AttributeOverride(name = "id", column = @Column(name = "review_id"))
@Entity
public class Review extends BaseTimeEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id")
    private Customer customer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "consultant_id")
    private Consultant consultant;

    private double star;
    private String comment;

    @Builder
    public Review(Long id, LocalDateTime createdTime, LocalDateTime lastModifiedTime, LocalDateTime deletedDate, boolean isActive,
                  Customer customer, Consultant consultant, double star, String comment) {
        super(id, createdTime, lastModifiedTime, deletedDate, isActive);
        this.customer = customer;
        this.consultant = consultant;
        this.star = star;
        this.comment = comment;
    }

    public void registCustomerAndCunsultant(Customer customer, Consultant consultant) {
        this.customer = customer;
        this.consultant = consultant;
    }
}
