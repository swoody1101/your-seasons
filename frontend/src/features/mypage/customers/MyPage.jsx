import React from 'react'
import MyProfile from './components/MyProfile'
import MyResHistory from './myReservation/MyResHistory'
import MyDiagnosis from './components/MyDiagnosis'
import MyReview from './myReview/MyReview'

import { Container, Box, Tab } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab';

const MyPage = () => {
  const [value, setValue] = React.useState('1');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (<>
    <Container fixed sx={{ display: 'block', mt: '5rem' }}>
      <Box sx={{}}>
        <MyProfile />
        <br />
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="예약보기" value="1" />
                <Tab label="지난진단기록" value="2" />
                <Tab label="내가 작성한 후기" value="3" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <MyResHistory />
            </TabPanel>
            <TabPanel value="2">
              <MyDiagnosis />
            </TabPanel>
            <TabPanel value="3">
              <MyReview />
            </TabPanel>
          </TabContext>
        </Box>
      </Box>
    </Container>


  </>
  )
}

export default MyPage


