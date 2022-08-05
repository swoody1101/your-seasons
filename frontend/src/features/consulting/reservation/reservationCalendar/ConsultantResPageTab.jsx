import React, { useState } from "react";

import { Box, Tab } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab';

import ConsultingResCalendar from "./ConsultingResCalendar";
import ConsultingReview from "./customerReview/ConsultingReview";

const ConsultantResPageTab = () => {
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const reservations = [
    {
      reservationId: 1,
      reservationDate: '2022-07-27',
      reservationTime: '15:00:00',
      request: "스드메 관련 요청"
    },
    {
      reservationId: 2,
      reservationDate: '2022-07-27',
      reservationTime: '16:00:00',
      request: "코디 중점 요청"
    },
    {
      reservationId: 3,
      reservationDate: '2022-07-28',
      reservationTime: '10:00:00',
      request: "화장품 중점 요청"
    },
    {
      reservationId: 4,
      reservationDate: '2022-07-28',
      reservationTime: '11:00:00',
      request: "화장법 중점 요청"
    },
    {
      reservationId: 5,
      reservationDate: '2022-07-28',
      reservationTime: '13:00:00',
      request: "커플 퍼스널 컬러 진단 요청"
    },
    {
      reservationId: 6,
      reservationDate: '2022-07-29',
      reservationTime: '15:00:00',
      request: "톤 보정 요청"
    }
  ]

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="상담 예약하기" value="1" />
            <Tab label="사용자 후기" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <ConsultingResCalendar reservations={reservations} />
        </TabPanel>
        <TabPanel value="2">
          <ConsultingReview />
        </TabPanel>
      </TabContext>
    </Box>
  )
}

export default ConsultantResPageTab