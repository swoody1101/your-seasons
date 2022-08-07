import React from 'react'
import { useSelector } from 'react-redux';

import { Box, styled } from '@mui/material'

import ConsultingRoom from './components/ConsultingRoom'
import CameraTest from './components/CameraTest';

const Consult = () => {
  // const [isSetClear, setIsSetClear] = useState(false);
  const { isSetClear } = useSelector(state => state.consult)
  return (
    <ConsultContainer>
      <ConsultingRoom />
      {
        isSetClear
          ?
          <CameraTest />
          :
          <></>
      }
    </ConsultContainer>
  )
}

export default Consult

const ConsultContainer = styled(Box)({
  // marginTop: '5vh',
  height: "95vh"
})