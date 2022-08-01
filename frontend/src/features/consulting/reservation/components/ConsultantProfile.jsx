import React, { useState } from "react";
import { Grid, Container, Box, styled } from '@mui/material'

import StarRating from "common/starrating/StarRating";
import MyAvatar from "common/avatar/MyAvatar";


const ConsultantProfile = () => {
  const [nickname, setNickname] = useState('익명의');
  const [selfIntroduction, setSelfIntroduction] = useState('등록한 자기소개가 없습니다.');
  const [cost, setCost] = useState('30,000');
  const [starRate, setStarRate] = useState(4.7)

  return (
    <Container fixed>
      <Grid container item spacing={2}>
        <Grid item xs={12} sm={3} sx={{
          display: 'flex',
          bgcolor: 'white',
          justifyContent: 'center',
        }}>
          <MyAvatar setSize={16} />
        </Grid>
        <Grid item xs={12} sm={9}>
          <ProfileText>
            <h3>
              {nickname} 컨설턴트님
            </h3>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <StarRating starrating={starRate} />
              <h3>
                {starRate}
              </h3>
            </Box>

            <h3>
              {selfIntroduction}
            </h3>
            <h3>
              진단비용 {cost}
            </h3>
          </ProfileText>
        </Grid>
      </Grid>
    </Container>
  )
}

export default ConsultantProfile

const ProfileText = styled('div')({
  display: "flex",
  flexDirection: "column",
  paddinTop: "20px",
  paddingLeft: "20px",
  lineHeight: "230%",
})
