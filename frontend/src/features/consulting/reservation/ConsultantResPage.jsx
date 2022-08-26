import React, { useEffect } from "react";
import ConsultantProfile from "./components/ConsultantProfile";
import Container from '@mui/material/Container';
import ConsultantResPageTab from "./reservationCalendar/ConsultantResPageTab";
import adbed2 from 'assets/images/ADBED2.jpg'
import { styled } from '@mui/material'

const ConsultantResPage = () => {

  useEffect(()=>{
    window.scrollTo(0, 0);
  },[])

	return (
		<>
			<Img src={adbed2}>
			</Img>
			<Container>
				<CContainer fixed sx={{ mt: '2rem' }}>
					<ConsultantProfile />
					<br />
					<ConsultantResPageTab />
				</CContainer>

			</Container>
		</>
	)
}

export default ConsultantResPage

const Img = styled('img')({
	position: "absolute",
  marginTop: "-70px",
	minWidth: "940px",
	minHeight: "22px",
	height: "290px",
	width: "100vw",
})

const CContainer = styled(Container)({
	position: "relative",
	top: '16px'
})