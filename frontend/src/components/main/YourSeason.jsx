import React from 'react'

import { Container, Box, styled } from '@mui/material'

import HomeCarousel from './HomeCarousel'
import MyRecentDiagnosis from './MyRecentDiagnosis'
import PopularConsultant from './PopularConsultant'

const YourSeason = () => {
  return (
    <HomeContainer >
      <HomeCarousel />
      <Container>
        <MyRecentDiagnosis />
        <PopularConsultant />
      </Container>
    </HomeContainer>
  )
}

export default YourSeason

const HomeContainer = styled(Box)({
  width: "100%"
})