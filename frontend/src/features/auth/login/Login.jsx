import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux/es/exports';
import { useNavigate } from 'react-router-dom';

import {
  Container, Button,
  Checkbox, FormControlLabel,
  TextField, Grid, Link,
  Typography, Avatar, styled
} from '@mui/material';
import { useMediaQuery } from '@mui/material'
import { useCookies } from 'react-cookie'
import { getToken } from "api/JWToken";

import { BAD_REQUEST, NOT_FOUND, CONFLICT, OK } from 'api/CustomConst'
import { loginUser, loadMember, logoutUser } from "features/auth/authSlice"

import mainimg from 'assets/images/mainimg.png';
import kakaotalk_img from 'assets/images/kakaotalk_img.png';
import google_img from 'assets/images/google_img.png';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(['savedEmail']);

  // media 쿼리 사용 
  const isMobile = useMediaQuery("(max-width:820px)");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 쿠키에 저장된 아이디 값이 있으면 반영
  useEffect(() => {
    if (cookies.savedEmail !== undefined) {
      setEmail(cookies.savedEmail);
      setIsSaved(true);
    }
  }, [cookies]) // 

  // 토큰이 이미 있으면 이전페이지로 이동
  useEffect(()=>{
    const token =  getToken()
    if(token){
      alert('이전페이지로 이동합니다.')
      window.history.go(-1)
    }else{
      return
    }
  }, [])

  const handleSubmit = (e) => {
    console.log({ email, password, isSaved })
    if (email === '' || password === '') {
      return;
    }
    if (isSaved) {
      console.log('이메일 쿠키에 저장 : ' + email)
      setCookie('savedEmail', email, { maxAge: 3600 * 24 * 30 });
    } else {
      console.log('이메일 저장하지 않음')
      removeCookie('savedEmail');
    }
    dispatch(loginUser({ email, password }))
      .unwrap() // 오류처리
      .then((res) => {
        if (res.status === OK) {
          alert('안녕하세요')
          navigate('/')
          console.log(res)
          dispatch(loadMember(res.data.role))
        } else {
          alert('적절한 요청이 아닙니다.')
        }
      })
      .catch((err) => {
        if (err.response.status === BAD_REQUEST) {
          // alert('적절한 요청이 아닙니다.')
          alert('없는 아이디 이거나 잘못된 비밀번호입니다.')
        } else if (err.response.status === NOT_FOUND) {
          alert('없는 아이디 이거나 잘못된 비밀번호입니다.')
        } else if (err.response.status === CONFLICT) {
          alert('이미 중복으로 접속된 아이디입니다.')
        }
      })
  }

  const handleEmail = (e) => {
    const { target: { value } } = e;
    // value check
    setEmail(value.replace(/\s/g, ''))

  }

  const handlePassword = (e) => {
    const { value } = e.target;
    // value check
    setPassword(value.replace(/\s/g, ''));

  }


  return (
    <Container sx={{}}>
      <SGrid container
        direction="row"
        justifyContent="center"
        alignItems="center"
        height="80vh"
      >
        {
          !isMobile
          &&
          <CenterGrid container item sm={6}>
            <Logo
              className="mainimg"
              src={mainimg}
              alt="mainimg" />
          </CenterGrid>
        }
        <Grid container
          item xs={12}
          sm={6}
          sx={{ width: "80%" }}
        >
          <Grid item>
            <Typography
              component="h1"
              variant="h5"
              id="login-text">
              로그인
            </Typography>
            <TextField
              label="이메일 주소"
              name="email"
              value={email}
              margin="normal"
              onChange={handleEmail}
              autoComplete="email"
              autoFocus
              required
              fullWidth />
            <TextField
              label="비밀번호"
              type="password"
              margin="normal"
              value={password}
              onChange={handlePassword}
              name="password"
              autoComplete="current-password"
              required
              fullWidth />
            <FormControlLabel
              control={
                <Checkbox
                  // input의 value 연동 외에 모양은 svg파일을 부르는 형식
                  checked={isSaved}
                  value={isSaved}
                  onChange={(e) => setIsSaved(e.target.checked)}
                  color="primary"
                />
              }
              label="이메일 주소 저장"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={handleSubmit}
              sx={{ mt: 3, mb: 2 }}
            >
              로그인
            </Button>
            <Grid container
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
              }}>
              <Link href="/#" variant="body2">
                비밀번호 찾기
              </Link>
              <span><Link href="/signup" variant="body2">{"퍼스널 컬러 찾으러 가기"}</Link></span>
            </Grid>
          </Grid>

          <CenterGrid container>
            <Grid item><Avatar sx={{ m: 1, bgcolor: '#eeeeee' }}>
              <a href="/#"><img className="login-icon" src={google_img} alt="loginicon" /></a>
            </Avatar></Grid>
            <Grid item>
              <Avatar sx={{ m: 1, bgcolor: '#ffea00' }}>
                <a href="/#"><img className="login-icon" src={kakaotalk_img} alt="loginicon" /></a>
              </Avatar></Grid>
          </CenterGrid>
        </Grid>
      </SGrid>

    </Container >
  );
}
export default Login

const Logo = styled('img')({
  width: "380px",
  height: "380px",
});

const CenterGrid = styled(Grid)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center"
});

const SGrid = styled(Grid)({
  // marginTop: "5rem",
  backgroundColor: "#F1F1F190",
  padding: '2rem',
  borderRadius: '1rem',
})
