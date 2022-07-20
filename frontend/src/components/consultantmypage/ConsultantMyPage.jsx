import React from "react";

import ConsultantProfile from "./ConsultantProfile";
import ConsultingResHistory from "./ConsultingResHistory";
import ConsultingReview from "./ConsultingReview";

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Container from '@mui/material/Container';

const ConsultantMyPage = () => {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    return (
        <Container fixed>
            <ConsultantProfile />
            <br />
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="상담 예약 기록" value="1" />
                        <Tab label="사용자 후기" value="2" />
                    </TabList>
                    </Box>
                    <TabPanel value="1">
                        <ConsultingResHistory />
                    </TabPanel>
                    <TabPanel value="2">
                        <ConsultingReview />
                    </TabPanel>
                </TabContext>
            </Box>
        </Container>
    )
}

export default ConsultantMyPage