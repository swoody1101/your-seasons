import { Button, Container, Grid, styled, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import regex from '../components/regex'
import { searchPasswordFetch } from '../authSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { logoutUser } from '../authSlice'

const SearchPassword = () => {
  const [email, setEmail] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const handleEmail = (e) => {
    setEmail(e.target.value)
  }
  const handleSubmit = () => {
    const regexCheck = regex.email
    if (regexCheck.test(email)) {
      dispatch(searchPasswordFetch(email))
        .then((res) => {
          if (res.payload) {
            alert('비밀번호가 전송되었습니다. 재로그인이 필요합니다.')
            logoutUser();
            navigate('/login');
          }
          else {
            alert('이메일을 찾을 수 없습니다.')
          }
        })
        .catch((err) => {
          alert('이메일을 전송할 수 없습니다.')
        })
    } else {
      alert('이메일 형식으로 입력해주세요.')
    }

  }

  return (
    <MainContainer>
      <SGrid container>
        <Grid item xs={12} >
          <Typography
            component="h1"
            variant="h5"
            sx={{ marginBottom: 3 }}>
            비밀번호 찾기
          </Typography>
          <Typography
            component="h3">
            비밀번호를 찾고자 하는 이메일을 입력해 주세요.
          </Typography>
        </Grid>
        <Grid item xs={12} >
          <TextField
            label="이메일 주소"
            name="email"
            value={email}
            onChange={handleEmail}
            autoComplete="email"
            autoFocus
            required
            fullWidth />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={handleSubmit}
            sx={{ mt: 3, mb: 2 }}
          >이메일 전송</Button>
        </Grid>
      </SGrid>
    </MainContainer>
  )
}

export default SearchPassword

const MainContainer = styled(Container)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100vw',
  height: '80vh',
})

const SGrid = styled(Grid)({
  display: 'flex',
  direction: "row",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: '1rem',
  padding: '2rem',
  width: "40vw",
  height: "60vh",
  backgroundColor: "#F1F1F190",
})
