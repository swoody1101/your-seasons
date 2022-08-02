import React from "react";
import { ListItem, ListItemText, Divider, Avatar, Box, ListItemAvatar } from '@mui/material'

import ProfileImage from 'assets/images/yourseasonlogo.png';
import StarRating from "../../../../../common/starrating/StarRating";

const UserReviewItem = props => {

  const month = props.date.toLocaleString('ko-KR', { month: 'long' })
  const day = props.date.toLocaleString('ko-KR', { day: '2-digit' })
  const year = props.date.getFullYear().toLocaleString().slice(-2)

  return (
    <div>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Avatar
          alt="프로필 사진"
          src={ProfileImage}
        />
        <div>
          <span>{props.nickname} | </span>
          <span>{year + "년 " + month + " " + day}</span>
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