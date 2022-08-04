import React from "react";
import UserReviewItem from "./UserReviewItem";

const UserReviewList = props => {
  if (props.reviews.length === 0) {
    return <p>해당 컨설턴트는 아직 리뷰가 없습니다<div className=""></div></p>
  }
  return (
    <div>
      {props.reviews.map(review => (
        <UserReviewItem
          key={review.reviewId}
          nickname={review.nickname}
          rating={review.star}
          date={review.createdDate}
          review={review.comment}
        />
      ))}
    </div>
  )
}

export default UserReviewList