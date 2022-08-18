import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux/es/exports';
import { useNavigate, Link } from 'react-router-dom';

import {
  Container, Button,
  Checkbox, FormControlLabel,
  TextField, Grid,
  Typography, Avatar, styled
} from '@mui/material';
import { useMediaQuery } from '@mui/material'
import { useCookies } from 'react-cookie'
import { isEmpty } from "lodash";

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


  // 토큰 expire여부 체크 후 삭제, 또는 이미 있으면 이전페이지로 이동
  useEffect(() => {
    if (!isEmpty(window.localStorage.getItem(("Authorization")))) {
      let date = new Date()
      if (date > new Date(window.localStorage.getItem("expiredTime"))) {
        dispatch(logoutUser())
        alert('자동 로그아웃 되었습니다. 로그인이 필요합니다.')
      } else {
        alert('이미 로그인이 되어 있습니다. 메인페이지로 이동합니다.')
        navigate('/')
      }
    } else {
    }
  }, [])


  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
      return;
    }
    if (isSaved) {
      setCookie('savedEmail', email, { maxAge: 3600 * 24 * 30 });
    } else {
      removeCookie('savedEmail');
    }
    dispatch(loginUser({ email, password }))
      .unwrap() // 오류처리
      .then((res) => {
        if (res.status === OK) {
          navigate('/')
          alert('안녕하세요')
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
    <Container sx={{ height: "100vh" }}>
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
            <form onSubmit={handleSubmit} >
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
                sx={{ mt: 3, mb: 2 }}
              >
                로그인
              </Button>
            </form>

            <Grid container
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
              }}>
              <Link to="/searchpassword" variant="body2">
                비밀번호 찾기
              </Link>
              <span><Link to="/signup" variant="body2">{"퍼스널 컬러 찾으러 가기"}</Link></span>
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
  backgroundColor: "#F1F1F190",
  padding: '2rem',
  borderRadius: '1rem',
})
