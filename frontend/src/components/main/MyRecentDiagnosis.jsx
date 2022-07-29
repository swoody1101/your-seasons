import React, { useState } from 'react'

import { Button, Card, Container, styled, Typography } from '@mui/material'

const RecentDiagnosis = () => {
  return (
    <RecentDiagnosisCard
      elevation={8}>
      {"최근 검사 결과가 들어올 자리"}
    </RecentDiagnosisCard>
  )
}

const NoRecentDiagnosis = () => {
  return (
    <RecentDiagnosisCard
      elevation={8}>
      <Button>나의 계절 찾으러 가기</Button>
    </RecentDiagnosisCard>
  )
}

const MyRecentDiagnosis = () => {
  const [hasRecentDiagnosis, setHasRecentDiagnosis] = useState(false);


  return (
    <DiagConatiner>
      <StryledTypography
        mt={2}
        variant="h4" gutterBottom component="div"
      >당신의 계절은?</StryledTypography>
      {
        hasRecentDiagnosis
          ?
          <RecentDiagnosis />
          :
          <NoRecentDiagnosis />
      }
    </DiagConatiner>
  )
}

export default MyRecentDiagnosis
const DiagConatiner = styled(Container)({
  width: "100%",
})
const RecentDiagnosisCard = styled(Card)({
  width: "100%",
  height: "24rem",
  backgroundColor: "#F1F1F190",
  padding: '3rem',
  borderRadius: '3rem'
})

const StryledTypography = styled(Typography)({
  fontFamily: '',
  color: '#F0F0F0',
  textShadow: 'black 2px 2px'
})
