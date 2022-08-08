import React, { useState } from 'react'
import { useSelector } from 'react-redux/es/exports';
import { useNavigate, Link } from 'react-router-dom';

import { CUSTOMER, CONSULTANT } from 'api/CustomConst'

import { Box, Button, Typography, styled, Input, IconButton } from '@mui/material'


const ConsultButton = () => {
  const { role } = useSelector(state => state.auth.logonUser)

  const [isInput, setIsInput] = useState(false)
  const [consultantNickname, setConsultantNickname] = useState('')

  const navigate = useNavigate();
  const handleJoin = () => {
    setIsInput(!isInput)
    // navigate('/consult?c=')
  }

  return (
    <Box>
      {
        isInput &&
        <SBox>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography display='inline'>
              컨설턴트 닉네임
            </Typography>
            <Button onClick={handleJoin} >X</Button>
          </Box>
          <SInput
            value={consultantNickname}
            onChange={(e) => {
              setConsultantNickname(e.target.value)
            }}
          />
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
        <SButton onClick={handleJoin} variant="contained">
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