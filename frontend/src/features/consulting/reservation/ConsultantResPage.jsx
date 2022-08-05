import React from "react";
import ConsultantProfile from "./components/ConsultantProfile";
import Container from '@mui/material/Container';
import ConsultantResPageTab from "./reservationCalendar/ConsultantResPageTab";

const ConsultantResPage = () => {

    return (
        <Container fixed>
            <ConsultantProfile />
            <br />
            <ConsultantResPageTab />
        </Container>
    )
}

export default ConsultantResPage