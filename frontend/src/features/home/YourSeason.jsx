import React from 'react'

import { Container, Box, styled } from '@mui/material'

import HomeCarousel from './components/HomeCarousel'
import MyRecentDiagnosis from './components/MyRecentDiagnosis'
import PopularConsultant from './components/PopularConsultant'

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