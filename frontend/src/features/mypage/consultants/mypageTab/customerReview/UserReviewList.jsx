import { styled } from "@mui/material";
import React from "react";
import UserReviewItem from "./UserReviewItem";

const UserReviewList = props => {
  if (props.reviews.length === 0) {
    return <h3>아직 컨설팅 후기가 없습니다</h3>
  }
  return (
    <Div>
      {props.reviews.map(review => (
        <UserReviewItem
          key={review.reviewId}
          nickname={review.nickname}
          rating={review.star}
          date={review.createdDate}
          review={review.comment}
        />
      ))}
    </Div>
  )
}

export default UserReviewList

const Div = styled('div')({
	maxWidth: '100%',
	display: 'flex',
	flexDirection: 'column-reverse',
	gap: 10,
})
