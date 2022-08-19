import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { useNavigate, Link } from 'react-router-dom';

import { CUSTOMER, CONSULTANT, BAD_REQUEST, NOT_FOUND, CONFLICT } from 'api/CustomConst'
import { myResFetch, consultingResFetch } from 'features/mypage/mypageSlice'

import JoinResList from './JoinResList'
import { Box, Button, Typography, styled, Input, ButtonGroup } from '@mui/material'


const ConsultButton = () => {
  const { role } = useSelector(state => state.auth.logonUser)

  const [isInput, setIsInput] = useState(false)

  const dispatch = useDispatch();

  const handlePop = () => {
    setIsInput(!isInput)
    if (role === CONSULTANT) {
      dispatch(consultingResFetch())
        .then(() => { })
    }
    if (role === CUSTOMER) {
      dispatch(myResFetch())
        .then(() => { })
    }
  }


  return (
    <Box>
      {
        role && isInput &&
        <SBox gap={1}>
          <JoinResList />
          <ButtonGroup>
            <Button onClick={handlePop} variant="contained">닫기</Button>
          </ButtonGroup>
        </SBox>
      }
      {
        role === CONSULTANT &&
        <SButton onClick={handlePop} variant="contained">
          <Link to="#">방만들기</Link>
        </SButton>
      }
      {
        role === CUSTOMER &&
        <SButton onClick={handlePop} variant="contained">
          <Link to="#">입장하기</Link>
        </SButton>
      }
    </Box>
  )
}

export default ConsultButton

const SBox = styled(Box)({
  backgroundColor: 'grey',
  padding: '0.4rem',
  border: '1rem',
  borderRadius: '1rem',
  width: '15rem',
  position: 'fixed',
  right: '3rem',
  bottom: '3rem',
  zIndex: '20001',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between'
})

const SButton = styled(Button)({
  fontFamily: 'Happiness-Sans-Bold',
  backgroundColor: 'white',
  fontSize: '1.5rem',
  position: 'fixed',
  right: '1rem',
  bottom: '1rem',
  borderRadius: '3rem',
  zIndex: '20000',
  a: {
    color: 'black'
  },
  ":hover": {
    backgroundColor: 'black',
    a: {
      color: 'white'
    },
  }
})