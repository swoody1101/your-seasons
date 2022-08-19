import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';

import { Box, styled } from '@mui/material'

import ConsultingRoom from './components/ConsultingRoom'
import CameraTest from './components/CameraTest';

const Consult = () => {
  const { isSetClear } = useSelector(state => state.consult)
  const { isAuthenticated } = useSelector(state=>state.auth)

  useEffect(()=>{
    if(!isAuthenticated){
      alert("로그인이 필요합니다.")
      window.history.go(-1)
    }
  },[])
  

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
  height: "100%"
})