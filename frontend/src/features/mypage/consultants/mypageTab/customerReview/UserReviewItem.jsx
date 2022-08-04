import React from "react";
import { Divider, Avatar, Box } from '@mui/material'

import ProfileImage from 'assets/images/yourseasonlogo.png';
import StarRating from "../../../../../common/starrating/StarRating";

const UserReviewItem = props => {

  const year = props.date.slice(0, 4) + "년 "
  const month = props.date.slice(5, 7) + "월 "
  const day = props.date.slice(-2) + "일"

  return (
    <div>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Avatar
          alt="프로필 사진"
          src={ProfileImage}
        />
        <div>
          <span>{props.nickname} | </span>
          <span>{year + month + day}</span>
          <StarRating starrating={props.rating} />
        </div>
      </Box>
      <br />
      <p>{props.review}</p>
      <Divider />
      <br />
    </div>
  )
}

export default UserReviewItem