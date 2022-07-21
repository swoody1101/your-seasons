import React from 'react'
import {
  Routes,
  Route,
} from 'react-router-dom'

import './app.css'
import Login from '../components/login/Login'
import UserMyPage from '../components/usermypage/UserMyPage'
import ConsultantMyPage from '../components/consultantmypage/ConsultantMyPage'

import NavBar from '../components/common/NavBar'
import SignUp from '../components/signup/SignUp'
import { Box, Stack } from '@mui/material'

const App = () => {
  return (
    <Box sx={{}}>
      <NavBar />
      <Stack direction="column" spacing={2} justifyContent="space-between">

        <Routes>
          <Route path='/home' element={<p>home</p>} />
          <Route path='/history' element={<p>history</p>} />
          <Route path='/login' element={<Login />} />
          <Route path='/cun' element={<ConsultantMyPage />} />
          <Route path='/:' element={<UserMyPage />} />
          <Route path='/signup' element={<SignUp />} />
        </Routes>
      </Stack>
    </Box>
  )
}

export default App