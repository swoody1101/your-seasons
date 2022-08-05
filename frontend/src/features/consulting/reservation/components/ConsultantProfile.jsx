import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Container, Box, styled } from '@mui/material'
import { useParams } from "react-router-dom";
import StarRating from "common/starrating/StarRating";
import MyAvatar from "common/avatar/MyAvatar";
import { ConsultantDetailFetch } from "features/consulting/consultantListSlice";

const ConsultantProfile = () => {
  const { nickname, introduction, cost, starAverage } = useSelector(state => state.consultantList.consultantDetail)
  const dispatch = useDispatch()
  const consultantId = useParams().id

  useEffect(() => {
    dispatch(ConsultantDetailFetch(consultantId))
  }, [dispatch])

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
              {nickname} 컨설턴트
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
