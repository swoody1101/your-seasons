import React from 'react'
import { Link } from 'react-router-dom'

import { AppBar, Box, Toolbar, Typography } from '@mui/material'
import styled from '@emotion/styled'

import { Pets } from '@mui/icons-material'
import { getToken, deleteToken } from '../../api/JWToken'


const NavBar = () => {
  const logonUser = getToken();
  return (
    <AppBar position="sticky" variant='pupple'>
      <StyledToolbar>
        <Typography
          variant="h5"
          sx={{ display: { xs: "none", sm: "block" } }}
        >
          <Link to="home">당신의 계절</Link>
        </Typography>
        <Pets
          sx={{ display: { xs: "block", sm: "none" } }} />
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
  color: "white"
})

const Navs = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "1rem",
  // [theme.breakpoints.up("sm")]: {
  //   display: "flex"
  // }
}))

const UserBox = styled(Box)(({ theme }) => ({
  display: "none",
  flexDirection: "row",
  alignItems: "center",
  gap: "1rem",
  // [theme.breakpoints.up("sm")]: {
  //   display: "none"
  // }
}))