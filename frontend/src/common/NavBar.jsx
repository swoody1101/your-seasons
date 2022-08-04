import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import {
	AppBar, Box, createTheme, ThemeProvider,
  Toolbar, Typography, styled
} from '@mui/material'
import { Pets } from '@mui/icons-material'
// import LOGOIMAGE from ''

import { logoutUser, resetUser } from 'features/auth/authSlice';
import MyAvatar from 'common/avatar/MyAvatar';


const LogoText = styled(Typography)((props) => (
	{
		fontFamily: 'Happiness-Sans-Title !important',
		color: "#FFFFFF",
	}
))


const StyledTypography = styled(Typography)({
  fontFamily: 'malgun !important',
	fontWeight: 'bold',
	fontSize: 30,
	letterSpacing: -5,
  color: '#000000',
  // textShadow: 'black 2px 2px'
})


const NavBar = () => {
  const logonUser = useSelector((state) => state.auth.logonUser)
  const { nickname, role } = useSelector((state) => state.auth.logonUser)

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutUser()) // deleteToken
    alert(role + "인 " + logonUser.nickname + "님이 로그아웃 되었습니다.") // state 체크 용 추후 삭제
    dispatch(resetUser()) // state 초기화, logout과 같이 할 지 토의 필요
    navigate('/')
  }

	const [scroll, setScroll] = useState('#ffffff')
	
	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll); //clean up
		};
	}, []);

	const handleScroll = () => {
	// 스크롤이 Top에서 500px 이상 내려오면 흰색 useState에 넣어줌
		if(window.scrollY >= 500 ){
			setScroll('#ffffff');
			// console.log(scroll)
		}else{
		// 스크롤이 500px 미만일경우 투명 넣어줌
			setScroll('#ffffff00');
		}
	}


  const transparentTheme = createTheme({
    palette: {
      primary: {
        main: `${scroll}`,//'#ffffff',
        boxShadow: 'none'
      }
    }
  })



	
  return (
    <ThemeProvider theme={transparentTheme} >
      <AppBar position="sticky" variant="transparent">
        <StyledToolbar>
          <Logos>
            <Link to="/" >
              <LogoText
                variant="h5"
                sx={{ display: { xs: "none", sm: "block", color: 'black !important' }, }}
								id="logo"
              > 당신의 계절
              </LogoText>
            </Link>
            <Pets
              sx={{ display: { xs: "block", sm: "none" } }} />
          </Logos>
          {
            nickname === undefined || nickname === ''
              ?
              <Navs>
                <Typography
                  variant="h6"
                  sx={{ display: { xs: "none", sm: "block" } }}
                >
                  <Link to="/">홈</Link>
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ display: { xs: "none", sm: "block" } }}
                >
                  <Link to="consultants">컨설턴트 목록</Link>
                </Typography>
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
								<Link to="/">Home</Link>
                </Typography>
                <Typography variant="h6" sx={{ display: { xs: "none", sm: "block" } }} >
                  <Link to="consultants">컨설턴트 목록</Link>
                </Typography>
                <Link to="mypage">
                  <Box sx={{ display: 'flex', flexDirection: 'row', alignItem: 'center', gap: '3px' }}>
                    <Typography variant="h6" sx={{ display: 'inline' }}>
                      "{nickname}"
                    </Typography>
                    <MyAvatar setSize={4} />
                  </Box>
                </Link>
                <Typography variant="h6" sx={{ display: { xs: "none", sm: "block" } }} >
                  <StyledA onClick={logout}>로그아웃</StyledA>
                </Typography>
              </Navs>
          }
          <UserBox>
            메뉴
          </UserBox>
        </StyledToolbar>
      </AppBar>
    </ThemeProvider>
  )
}

export default NavBar

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  backgroundColor: "transparent !important",
  justifyContent: "space-between",
})

const Logos = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "1rem",
  a: {
    // color: "black",
    // textShadow: '1px 1px 2px black'
  }
}))


const Navs = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "1rem",
	fontFamily: "Happiness-Sans-Title",
  a: {
    color: "black",
    // textShadow: '1px 1px 2px black'
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

const Logo = styled('img')({
  width: '5rem',
  height: '5rem'
})