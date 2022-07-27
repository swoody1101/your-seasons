import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

import {
  AppBar, Box,
  Toolbar, Typography, styled
} from '@mui/material'
import { Pets } from '@mui/icons-material'

import { logoutUser, resetUser } from '../login/loginSlice';


const NavBar = () => {
  const logonUser = useSelector((state) => state.login.logonUser)
  const { nickname, role } = useSelector((state) => state.login.logonUser)

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutUser()) // deleteToken
    alert(role + "인 " + logonUser.nickname + "님이 로그아웃 되었습니다.") // state 체크 용 추후 삭제
    dispatch(resetUser()) // state 초기화, logout과 같이 할 지 토의 필요
    navigate('/')
  }

  return (
    <AppBar position="sticky" variant='white'>
      <StyledToolbar>
        <Typography
          variant="h5"
          sx={{ display: { xs: "none", sm: "block" } }}
        >
          <Link to="home">당신의 계절</Link>
        </Typography>
        <Pets
          sx={{ display: { xs: "block", sm: "none" } }} />

        {
          nickname === undefined || nickname === ''
            ?
            <Navs>
              <Typography
                variant="h6"
                sx={{ display: { xs: "none", sm: "block" } }}
              >
                <Link to="login">로그인</Link>
              </Typography>
              <Typography
                variant="h6"
                sx={{ display: { xs: "none", sm: "block" } }}
              >
                <Link to="signup">회원가입</Link>
              </Typography>
            </Navs>
            :
            <Navs>
              <Typography
                variant="h6"
                sx={{ display: { xs: "none", sm: "block" } }}
              >
                <Link to="mypage">마이페이지</Link>
              </Typography>
              <Typography
                variant="h6"
                sx={{ display: { xs: "none", sm: "block" } }}
              ><StyledA onClick={logout}>로그아웃</StyledA>
              </Typography>
            </Navs>
        }
        <UserBox>
          메뉴
        </UserBox>
      </StyledToolbar>
    </AppBar>
  )
}

export default NavBar

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
})

const Navs = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "1rem",
  a: {
    color: "white"
  }
}))

const UserBox = styled(Box)(({ theme }) => ({
  display: "none",
  flexDirection: "row",
  alignItems: "center",
  gap: "1rem",
}))

const StyledA = styled('a')({
  ":hover": [{ cursor: "pointer" }]
})