package com.yourseason.backend.review.domain;

import com.yourseason.backend.common.domain.BaseTimeEntity;
import com.yourseason.backend.consulting.domain.Consulting;
import com.yourseason.backend.member.consultant.domain.Consultant;
import com.yourseason.backend.member.customer.domain.Customer;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
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

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "consulting_id")
    private Consulting consulting;

    private int star;
    private String comment;

    @Builder
    public Review(Long id, LocalDateTime createdDate, LocalDateTime lastModifiedDate, LocalDateTime deletedDate,
                  Customer customer, Consultant consultant, Consulting consulting, int star, String comment) {
        super(id, createdDate, lastModifiedDate, deletedDate, true);
        this.customer = customer;
        this.consultant = consultant;
        this.consulting = consulting;
        this.star = star;
        this.comment = comment;
    }

    public void register(Customer customer, Consultant consultant) {
        setCustomer(customer);
        setConsultant(consultant);
//        consulting.registerReview();
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
        customer.getReviews()
                .add(this);
    }

    public void setConsultant(Consultant consultant) {
        this.consultant = consultant;
        consultant.getReviews()
                .add(this);
    }

    public void updateReview(int star, String comment) {
        this.star = star;
        this.comment = comment;
    }

    public void deleteReview() {
        super.delete();
        customer.getReviews()
                .remove(this);
        consultant.getReviews()
                .remove(this);
        consulting.deleteReview();
    }
}
