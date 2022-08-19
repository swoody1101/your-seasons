import { styled } from "@mui/material";
import { isEmpty } from "lodash";
import React from "react";
import UserReviewItem from "./UserReviewItem";

const UserReviewList = props => {
  const reviews = props.reviews

  return (
    <Div>
      {isEmpty(reviews) ? <h2>작성된 리뷰가 없습니다.</h2> : reviews.map((review, idx) => (
        <UserReviewItem
          key={idx}
          nickname={review.nickname}
          rating={review.star}
          date={review.createdDate}
          review={review.comment}
          imageUrl={review.imageUrl}
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
