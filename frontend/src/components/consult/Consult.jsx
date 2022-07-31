import React, { useState } from 'react'

import { Container, Box, styled } from '@mui/material'

import ConsultingRoom from './components/ConsultingRoom';
import CameraTest from './components/CameraTest';

const Consult = () => {
  const [isSetClear, setIsSetClear] = useState(false);

  return (
    <ConsultContainer>
        {
          isSetClear ?
            <ConsultingRoom />
            :
            <CameraTest isSetClear={isSetClear} setIsSetClear={setIsSetClear} />
      }
    </ConsultContainer>
  )
}

export default Consult

const ConsultContainer = styled(Box)({
  height: "100vh"
})