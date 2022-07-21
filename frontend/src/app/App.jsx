import React from 'react'
import {
  Routes,
  Route,
} from 'react-router-dom'

import './app.css'
import Login from '../components/login/Login'
import UserMyPage from '../components/usermypage/UserMyPage'


const App = () => {
  return (
    <div className='container app__container'>
      <Routes>
        <Route path='/home' element={<p>home</p>} />
        <Route path='/history' element={<p>history</p>} />
        <Route path='/login' element={<Login />} />
        {/* <Route path='/:' element={<UserMyPage />} /> */}
        <Route path='/signup' element={<p>signup</p>} />
      </Routes>
    </div>
  )
}

export default App