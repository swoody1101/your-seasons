import React, { useState } from 'react'
import { Box,  styled, Typography, Grid,  } from '@mui/material'
import { useSelector } from 'react-redux'
import _ from 'lodash'
import ConsultantListItem from 'features/consulting/consultantList/ConsultantListItem'
import ItemsCarousel from 'react-items-carousel'
// import useMediaQuery from '@mui/material/useMediaQuery';

const HomePopularConsultant = () => {
	const consultants = useSelector(state=>state.consultantList.consultantsData).slice(0, 10)
	// 비어있으면 true
  const hasConsultants = _.isEmpty(consultants)
  const [activeItemIndex, setActiveItemIndex] = useState(0);
	const [cardNum, setCardNum] = useState(3);
  const chevronWidth = 40;


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
					gutter={20}
					activePosition={'center'}
					chevronWidth={60}
					disableSwipe={false}
					alwaysShowChevrons={true}
					// 중단점 md이하일때 하나만 떠야함, 적용 안되서 보류
					numberOfCards={cardNum}
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

const MainTypography = styled(Typography)({
	position: 'absolute',
  top: '17vh',
  left: '20vw',
  fontFamily: 'malgunbd !important',
	fontSize: 'var(--font-title-size)',
	letterSpacing: 'var(--font-letter-spacing)',
  color: '#000000',
})

const SubTypography = styled(Typography)({
	position: 'absolute',
  top: '23vh',
  left: '20vw',
  fontFamily: 'malgunbd !important',
	fontSize: 'var(--font-sub-size)',
	letterSpacing: 'var(--font-letter-spacing)',
  color: '#00000099',
})

const ColorBox = styled(Grid)({
	padding:'0 60px',
	margin:"0 auto",
	width: '65vw',
	height: '65vh',
	backgroundColor: 'pink',
	display: 'flex',
	flexDirection: 'column',
	justifyItems: 'center',
	justifyContent: 'center',
})
