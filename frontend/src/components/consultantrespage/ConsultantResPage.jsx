import React from "react";

import ConsultantProfile from "./ConsultantProfile";
import Container from '@mui/material/Container';
import ConsultantResPageTab from "./ConsultantResPageTab";

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