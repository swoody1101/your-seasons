import React from 'react'
import {
  Routes,
  Route,
} from 'react-router-dom'

import './app.css'

import SignUp from '../components/signup/SignUp'
import { Container } from '@mui/material'


const App = () => {
  return (
    <Container>
      <h3>어째서 글씨체가 적용되지 않는 건가</h3>
      <Routes>
        <Route path='/home' element={<p>home</p>} />
        <Route path='/history' element={<p>history</p>} />
        <Route path='/login' element={<p>login</p>} />
        <Route path='/mypage' element={<p>mypage</p>} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
    </Container>
  )
}

export default App