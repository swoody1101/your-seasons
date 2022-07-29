import React from "react";

import ConsultantProfile from "./ConsultantProfile";
import Container from '@mui/material/Container';
import ConsultantMyPageTab from "./ConsultantMypageTab";

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