import React from 'react'
import {
  Routes,
  Route,
} from 'react-router-dom'

import './app.css'

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
          <Route path='/login' element={<p>login</p>} />
          <Route path='/mypage' element={<p>mypage</p>} />
          <Route path='/signup' element={<SignUp />} />
        </Routes>
      </Stack>
    </Box>
  )
}

export default App