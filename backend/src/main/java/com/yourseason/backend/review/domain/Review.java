package com.yourseason.backend.review.domain;

import com.yourseason.backend.common.domain.BaseTimeEntity;
import com.yourseason.backend.consulting.consultant.domain.Consulting;
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

    public void register(Customer customer, Consultant consultant, Consulting consulting, int star) {
        setCustomer(customer);
        setConsultant(consultant, star);
        setConsulting(consulting);
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
        customer.getReviews()
                .add(this);
    }

    public void setConsultant(Consultant consultant, int star) {
        this.consultant = consultant;
        consultant.getReviews()
                .add(this);
        consultant.updateStarAverageByCreatedReview(star);
    }

    public void setConsulting(Consulting consulting) {
        this.consulting = consulting;
        consulting.registerReview();
    }

    public void updateReview(int star, String comment) {
        this.star = star;
        this.comment = comment;
    }

    public void deleteReview() {
        consultant.updateStarAverageByDeletedReview(star);
        super.delete();
        customer.getReviews()
                .remove(this);
        consultant.getReviews()
                .remove(this);
        consulting.deleteReview();
    }
}
