import React from 'react'
import HomeCarousel from './components/HomeCarousel'
import HomePopularConsultant from './components/HomePopularConsultant'
import HomeProcess1 from './components/HomeProcess1'
import HomeProcess2 from './components/HomeProcess2'
import HomeProcess3 from './components/HomeProcess3'
import HomePersonalColor from './components/HomePersonalColor'

const YourSeason = () => {
	return (
		<div style={{height:10000}}>
		{/* 당신의 계절을 찾아보세요 */}
		<HomeCarousel />
		{/* 오늘의 인기 컨설턴트  _명의 전문가와 함께 */}
		<HomePopularConsultant />
		{/* 화상으로 받는 퍼스널컬러 진단 (강아지) */}
		<HomeProcess1 />
		{/* 톤보정을 통한 걱정없는 화상 서비스 */}
		<HomeProcess2 />
		{/* 다양한 컬러셋과 함께 컨설턴트의 진단표 제공 */}
		<HomeProcess3 />
		{/* 퍼스널컬러, 4가지만 있는게 아니다 */}
		<HomePersonalColor />
		</div>
	)
}

export default YourSeason