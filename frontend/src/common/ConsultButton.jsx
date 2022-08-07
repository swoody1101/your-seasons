import React, { useState } from 'react'
import { useSelector } from 'react-redux/es/exports';
import { useNavigate, Link } from 'react-router-dom';

import { CUSTOMER, CONSULTANT } from 'api/CustomConst'

import { Box, Button, styled, Input } from '@mui/material'


const ConsultButton = () => {
  const { role } = useSelector(state => state.auth.logonUser)

  const [isInput, setIsInput] = useState(false)

  const navigate = useNavigate();
  const handleJoin = () => {
    navigate('/consult?ss=')
  }

  return (
    <Box>
      {
        isInput &&
        <Input></Input>
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

const SButton = styled(Button)({
  fontFamily: 'Happiness-Sans-Bold',
  backgroundColor: 'white',
  fontSize: '1.5rem',
  position: 'fixed',
  right: '1rem',
  bottom: '1rem',
  borderRadius: '3rem',
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