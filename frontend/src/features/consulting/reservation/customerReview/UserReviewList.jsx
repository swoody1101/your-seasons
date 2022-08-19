import React from "react";
import UserReviewItem from "./UserReviewItem";

const UserReviewList = props => {
  if (props.reviews.length === 0) {
    return <p>해당 컨설턴트는 아직 리뷰가 없습니다<div></div></p>
  }
  return (
    <div>
      {props.reviews.map((review, idx) => (
        <UserReviewItem
          key={idx}
          nickname={review.nickname}
          rating={review.star}
          date={review.createdDate}
          review={review.comment}
          imageUrl={review.imageUrl}
        />
      ))}
    </div>
  )
}

export default UserReviewList