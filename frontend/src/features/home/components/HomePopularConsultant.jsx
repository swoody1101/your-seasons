import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { Box,  styled, Typography, Grid } from '@mui/material'
import _ from 'lodash'
import ConsultantListItem from 'features/consulting/consultantList/ConsultantListItem'
import ItemsCarousel from 'react-items-carousel'
import { ConsultantListFetch } from 'features/consulting/consultantListSlice';


const HomePopularConsultant = () => {
  const consultants = useSelector(state => state.consultantList.consultants).slice(0, 10)
  // 비어있으면 true
	const dispatch = useDispatch()
  const hasConsultants = _.isEmpty(consultants)
  const [activeItemIndex, setActiveItemIndex] = useState(0);

	useEffect(() => {
		dispatch(ConsultantListFetch())
	}, [])


  return (
    <Div>
		<ColorBox>
			<MainTypography
			mb={4}
			gutterBottom component="div"
      >TOP 10</MainTypography>
			<SubTypography>전문 컨설턴트에게 퍼스널컬러를 진단받아 보세요</SubTypography>
			{ hasConsultants ? 
			'인기 컨설턴트가 없습니다.' 
			: 
				<ItemsCarousel
					infiniteLoop={false}
					gutter={50}
					activePosition={'center'}
					chevronWidth={60}
					disableSwipe={false}
					alwaysShowChevrons={true}
					// 중단점 md이하일때 하나만 뜨도록, 적용 보류
					numberOfCards={4}
					slidesToScroll={2}
					outsideChevron={true}
					showSlither={true}
					firstAndLastGutter={true}
					activeItemIndex={activeItemIndex}
					requestToChangeActive={value => setActiveItemIndex(value)}
					rightChevron={'>'}
					leftChevron={'<'}
				>
					{consultants.map((consultant, idx) =>
						<ConsultantListItem {...consultant} key={idx} home={true}/>
					)}
				</ItemsCarousel>
			} 
			<GoCon>
				<Link to={'/consultants'}>컨설턴트 더 보기</Link>
			</GoCon>
		</ColorBox>
		</Div >
  )
}

export default HomePopularConsultant

const Div = styled(Box)({
	position: 'relative',
	height: '100vh',
	width: '100vw',
	display: 'flex',
	flexDirection: 'column',
	justifyItems: 'center',
	justifyContent: 'center',
})

const ColorBox = styled(Grid)({
	padding:'0 60px',
	margin:"0 auto",
	width: '90vw',
	height: '80vh',
	backgroundColor: '#d1c4e9',
	display: 'flex',
	flexDirection: 'column',
	justifyItems: 'center',
	justifyContent: 'center',
})

const MainTypography = styled(Typography)({
	position: 'absolute',
  top: '15vh',
  left: '10vw',
  fontFamily: 'malgunbd !important',
	fontSize: 'var(--font-title-size)',
	letterSpacing: 'var(--font-letter-spacing)',
  color: '#000000',
})

const SubTypography = styled(Typography)({
	position: 'absolute',
  top: '23vh',
  left: '10vw',
  fontFamily: 'malgunbd !important',
	fontSize: 'var(--font-sub-size)',
	letterSpacing: 'var(--font-letter-spacing)',
  color: '#00000099',
})

const GoCon =  styled(Typography)({
	position: 'absolute',
  top: '80vh',
  right: '10vw',
  fontFamily: 'malgunbd !important',
	fontSize: 'var(--font-sub-size)',
	letterSpacing: 'var(--font-letter-spacing)',
  color: '#00000099',
})