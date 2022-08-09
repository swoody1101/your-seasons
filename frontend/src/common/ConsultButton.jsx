import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { useNavigate, Link } from 'react-router-dom';

import { CUSTOMER, CONSULTANT, BAD_REQUEST, NOT_FOUND, CONFLICT } from 'api/CustomConst'
import { getConsultantSessionName } from 'features/consulting/consultingRoom/consultSlice'

import { Box, Button, Typography, styled, Input, ButtonGroup } from '@mui/material'


const ConsultButton = () => {
  const { role } = useSelector(state => state.auth.logonUser)
  const { consultantSessionName } = useSelector(state => state.consult.consultantSessionName)

  const [isInput, setIsInput] = useState(false)
  const [consultantNickname, setConsultantNickname] = useState('')

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePop = () => {
    setIsInput(!isInput)
  }

  const handleJoin = () => {
    dispatch(getConsultantSessionName(consultantNickname))
      .then((res) => {
        console.log(res)
        navigate('/consult')
      })
      .catch((err) => {
        if (err.response.status === BAD_REQUEST) {
          alert('적절한 요청이 아닙니다.')
        } else if (err.response.status === NOT_FOUND) {
          alert('개설된 세션이 없습니다.')
        } else if (err.response.status === CONFLICT) {
          alert('이미 중복으로 접속된 세션입니다.')
        }
      })
    setIsInput(false)
    setConsultantNickname('')
  }
  return (
    <Box>
      {
        isInput &&
        <SBox gap={1}>
          <Typography display='inline'>
            컨설턴트 닉네임
          </Typography>
          <SInput
            value={consultantNickname}
            onChange={(e) => {
              setConsultantNickname(e.target.value)
            }}
          />
          <ButtonGroup>
            <Button onClick={handlePop} variant="contained">닫기</Button>
            <Button onClick={handleJoin} variant="contained">입장</Button>
          </ButtonGroup>
        </SBox>
      }
      {
        role === CONSULTANT &&
        <SButton variant="contained">
          <Link to="/consult">방만들기</Link>
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
  aspectRatio: '3/1',
  position: 'fixed',
  right: '3rem',
  bottom: '3rem',
  zIndex: '20001',
  display: 'flex',
  flexDirection: 'column'
})

const SInput = styled(Input)({

  backgroundColor: 'white',
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