import React, { useState } from 'react'
import {
  Routes,
  Route,
} from 'react-router-dom'
import { useSelector } from 'react-redux'

import './app.css'
import NavBar from '../components/common/NavBar'
import Yourseason from '../components/main/YourSeason'
import MyPage from '../components/mypage/MyPage'
import ConsultantMyPage from '../components/consultantmypage/ConsultantMyPage'
import ModifyProfile from '../components/modify/ModifyProfile'
import ConsultantResPage from '../components/consultantrespage/ConsultantResPage'
import Login from '../components/login/Login'
import SignUp from '../components/signup/SignUp'
import ConsultantList from '../components/consultantList/ConsultantList'
import TemporaryRoom from '../components/colorset/TemporaryRoom'
import { Box, Stack } from '@mui/material'
import { CUSTOMER, CONSULTANT } from '../api/CustomConst'
const App = () => {
  // const { role } = useSelector((state) => state.login.logonUser)
  // const role = CONSULTANT;
  const role = CUSTOMER;
  return (
    <Box>
      <NavBar />
      <Stack direction="column" spacing={2} justifyContent="space-between">
        <Routes>
          <Route path='/' element={<p>WelcomePage</p>} />
          <Route path='/home' element={<Yourseason />} />
          <Route path='/history' element={<p>history</p>} />
          <Route path='/consultants' element={<ConsultantList />} />
          <Route path='/mypage' element={
            role === CUSTOMER
              ? <MyPage /> : <ConsultantMyPage />
          } />
          <Route path='/respage' element={<ConsultantResPage />} />
          <Route path='/modify' element={<ModifyProfile />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/colorset' element={<TemporaryRoom />} />
        </Routes>
      </Stack>
    </Box>
  )
}

export default App
