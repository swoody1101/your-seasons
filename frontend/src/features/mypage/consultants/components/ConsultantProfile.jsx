import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Stack, Button, Grid, Container, Box, styled } from '@mui/material'

import { loadMember } from 'features/auth/authSlice'
import { getCustomerReview } from 'features/mypage/mypageSlice'
import StarRating from "../../../../common/starrating/StarRating";
import MyAvatar from "common/avatar/MyAvatar";


const ConsultantProfile = () => {
  const { starAverage } = useSelector(state => state.mypage.reviews)
  const { role, nickname, introduction, cost } = useSelector(state => state.auth.logonUser)
  const reviews = useSelector(state => state.mypage.reviews)
  console.log(starAverage, reviews)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleModify = () => {
    navigate('/modify')
    dispatch(loadMember(role)).unwrap()
      .then((res) => {
        console.log(res)
      })
  }
  // 마이페이지 접속시 
  useEffect(() => {
    dispatch(getCustomerReview())
  }, [])

  return (
    <Container fixed>
      <Grid container item spacing={2}>
        <Grid item xs={12} sm={3} sx={{
          display: 'flex',
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
              <StarRating starrating={starAverage} />
              <h3>
                {starAverage}
              </h3>
            </Box>

            <h3>
              {introduction}
            </h3>
            <h3>
              진단비용 {cost}
            </h3>
            <Stack spacing={2} direction="row">
              <Button variant="contained"
                onClick={handleModify}
              >
                컨설턴트 정보 수정
              </Button>
            </Stack>
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
