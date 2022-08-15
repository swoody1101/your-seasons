import React, { useEffect, useState } from 'react'
import MyProfile from './components/MyProfile'
import MyResHistory from './myReservation/MyResHistory'
import MyDiagnosis from './components/MyDiagnosis'
import MyReview from './myReview/MyReview'

import { Container, Box, Tab } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useNavigate } from 'react-router'
import { getToken } from 'api/JWToken'

const MyPage = () => {
  const [value, setValue] = useState('1');
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken()
    if (token) {
      return
    } else {
      alert('로그인 후 접근해 주세요');
      navigate('/login')
    }
  }, [])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (<>
    <Container fixed sx={{ mt: '2rem' }}>
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
    </Container>
  </>
  )
}

export default MyPage


