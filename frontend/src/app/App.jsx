import React from 'react'
import {
  Routes,
  Route,
} from 'react-router-dom'

import Header from '../common/header/Header'
import Footer from '../common/footer/Footer'
import Sidebar from '../common/sidebar/Sidebar'

import Home from '../feature/home/Home'
import History from '../feature/history/History'
import Login from '../feature/auth/login/Login'
import SignUp from '../feature/auth/signup/SignUp'

import './app.css'


const App = () => {
  return (
    <div className='container app__container'>
      <Header />
      <div className="body__container">

        <Sidebar />

        <div className="content">
          <Routes>
            <Route path='/home' element={<Home />} />
            <Route path='/history' element={<History />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default App