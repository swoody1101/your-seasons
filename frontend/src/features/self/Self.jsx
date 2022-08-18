import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';

import { Box, styled } from '@mui/material'

import SelfTestRoom from './components/SelfTestRoom'
import CameraTest from './components/CameraTest';

// 구현 시간 부족으로 재사용하지 않고 컴포넌트 복제
const Self = () => {
  const { isSetClear } = useSelector(state => state.self)
  const { isAuthenticated } = useSelector(state=>state.auth)
  const { role } = useSelector(state => state.auth.logonUser)  

  useEffect(()=>{
    if(isAuthenticated){
      if(role==='CONSULTANT'){
        alert('컨설턴트는 자가진단을 이용할 수 없습니다.')
        window.history.go(-1)
    }
    }else{
      alert("로그인이 필요합니다.")
      window.history.go(-1)
    }
  },[])

  return (
    <SelfTestContainer>
      <SelfTestRoom />
      {
        isSetClear
          ?
          <CameraTest />
          :
          <></>
      }
    </SelfTestContainer>
  )
}

export default Self

const SelfTestContainer = styled(Box)({
  height: "100%"
})