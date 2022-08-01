import React from "react";

import ConsultantProfile from "./components/ConsultantProfile";
import Container from '@mui/material/Container';
import ConsultantMyPageTab from "./reservationCalendar/ConsultantMypageTab";

const ConsultantMyPage = () => {

  return (
    <Container fixed sx={{ mt: '5rem' }}>
      <ConsultantProfile />
      <br />
      <ConsultantMyPageTab />
    </Container>
  )
}

export default ConsultantMyPage