import React from 'react'
import { useSelector } from 'react-redux';

import { Box, styled } from '@mui/material'

import SelfTestRoom from './components/SelfTestRoom'
import CameraTest from './components/CameraTest';

// 구현 시간 부족으로 재사용하지 않고 컴포넌트 복제
const Self = () => {
  const { isSetClear } = useSelector(state => state.self)
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