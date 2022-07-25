import React from 'react'
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { useNavigate } from 'react-router-dom';

import { Box, Typography, Button, ButtonGroup } from '@mui/material'


import { BAD_REQUEST, NOT_FOUND, CONFLICT } from '../../api/CustomConst'
import { signOut } from './modifySlice'

const SignOut = () => {
  const { role } = useSelector((state) => state.login.logonUser)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cancel = () => {
    navigate('/mypage')
  }
  const handleSignOut = () => {
    dispatch(signOut(role))
      .unwrap()
      .then((res) => {
        alert("수정이 완료되었습니다.")
      })
      .catch((err) => {
        if (err.status === BAD_REQUEST) {
          alert('적절한 요청이 아닙니다.')
        } else if (err.status === NOT_FOUND) {
          alert('없는 아이디 이거나 잘못된 정보입니다.')
        } else if (err.status === CONFLICT) {
          alert('거절된 내용입니다.')
        }
      })
  }
  return (
    <Box
      fullWidth
      p={2}
    >
      <Typography
        sx={{ color: 'orange', fontSize: '2rem' }}
      >정말로 탈퇴하시겠습니까?</Typography>
      <ButtonGroup
        sx={{
          marginTop: '4rem',
          display: "flex",
          flexDirection: "row",
          justifyContent: "end",
        }}
      >
        <Button
          onClick={cancel} variant="contained"
        >취소</Button>
        <Button
          onClick={handleSignOut} variant="contained" color="error"
        >확인</Button>
      </ButtonGroup>
    </Box >
  )
}

export default SignOut