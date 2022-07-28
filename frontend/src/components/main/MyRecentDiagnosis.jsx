import React, { useState } from 'react'

import { Box, Card, Container, styled, Typography } from '@mui/material'

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
      {"검사한 결과가 없을 때 이동 시킬 수 있는 버튼이 있는 자리"}
    </RecentDiagnosisCard>
  )
}

const MyRecentDiagnosis = () => {
  const [hasRecentDiagnosis, setHasRecentDiagnosis] = useState(false);


  return (
    <Container>
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
    </Container>
  )
}

export default MyRecentDiagnosis

const RecentDiagnosisCard = styled(Card)({
  width: "100%",
  height: "60vh",
  backgroundColor: "#F1F1F1"

})

const StryledTypography = styled(Typography)({
  fontFamily: '',
  color: '#F0F0F0',
  textShadow: 'black 2px 2px'
})
