import React from 'react'
import HomeCarousel from './components/HomeCarousel'
import HomePopularConsultant from './components/HomePopularConsultant'
import HomeProcess1 from './components/HomeProcess1'
import HomeProcess2 from './components/HomeProcess2'
import HomeProcess3 from './components/HomeProcess3'
import { styled } from '@mui/material'

const YourSeason = () => {

  return (
    <Div>
      {/* 당신의 계절을 찾아보세요 */}
      <HomeCarousel />
      {/* 오늘의 인기 컨설턴트  _명의 전문가와 함께 */}
      <HomePopularConsultant />
      {/* 화상으로 받는 퍼스널컬러 진단 */}
      <HomeProcess1 />
      {/* 톤보정을 통한 걱정없는 화상 서비스 */}
      <HomeProcess2 />
      {/* 다양한 컬러셋과 함께 컨설턴트의 진단표 제공 */}
      <HomeProcess3 />
      {/* 퍼스널컬러, 더 알아보기 */}
      {/* 퍼스널컬러에 대한 자세한 정보 */}
    </Div>
  )
}

export default YourSeason

const Div = styled('div')({
  marginTop: -70,
})
