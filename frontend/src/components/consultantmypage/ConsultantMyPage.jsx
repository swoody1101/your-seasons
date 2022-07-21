import React from "react";

import ConsultantProfile from "./ConsultantProfile";
import Container from '@mui/material/Container';
import ConsultantMyPageTab from "./ConsultantMypageTab";

const ConsultantMyPage = () => {

    return (
        <Container fixed>
            <ConsultantProfile />
            <br />
            <ConsultantMyPageTab />
        </Container>
    )
}

export default ConsultantMyPage