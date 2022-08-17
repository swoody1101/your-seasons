import React from 'react'
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom'
import { useSelector } from 'react-redux'

import './app.css'
import NavBar from 'common/NavBar'
import ConsultButton from 'common/consulting/ConsultButton'
import Yourseason from 'features/home/YourSeason'
import Consult from 'features/consulting/consultingRoom/Consult'
import Self from 'features/self/Self'
import MyPage from 'features/mypage/customers/MyPage'
import ConsultantMyPage from 'features/mypage/consultants/ConsultantMyPage'
import ModifyProfile from 'features/auth/modify/ModifyProfile'
import ConsultantResPage from 'features/consulting/reservation/ConsultantResPage'
import Login from 'features/auth/login/Login'
import SignUp from 'features/auth/signup/SignUp'
import SearchPassword from 'features/auth/login/SearchPassword'
import ConsultantList from 'features/consulting/consultantList/ConsultantList'
import Footer from 'common/Footer'
import CustomizedSnackbars from 'common/snackbar/CustomizedSnackbars'

import { Box, Stack } from '@mui/material'
import { CUSTOMER } from '../api/CustomConst'

const App = () => {
  const { role } = useSelector((state) => state.auth.logonUser)
  const { pathname } = useLocation()
  return (
    <Box >
      {
        pathname !== '/consult'
        && pathname !== '/self'
        && <ConsultButton />
      }
      <Stack direction="column" justifyContent='space-between' sx={{ minHeight: "100vh" }}>
        <Routes>
          {/* nav하위에 속한 컴포넌트  */}
          <Route element={<NavBar />}>
            <Route path='/' element={<Yourseason />} />
            <Route path='/consultants' element={<ConsultantList />} />
            <Route path='/mypage' element={
              role === CUSTOMER
                ? <MyPage /> : <ConsultantMyPage />
            } />
            <Route path='/consultants/detail/:id' element={<ConsultantResPage />} />
            <Route path='/modify' element={<ModifyProfile />} />
            <Route path='/login' element={<Login />} />
            <Route path='/searchpassword' element={<SearchPassword />} />
            <Route path='/signup' element={<SignUp />} />
          </Route>
          {/* not-nav */}
          <Route path='/consult' element={<Consult />} />
          <Route path='/self' element={<Self />} />
        </Routes>
        <CustomizedSnackbars />
        <Footer />
      </Stack>
    </Box>
  )
}

export default App