import React, { useState } from 'react'
import { Avatar, Box, Button, Container, styled, Typography, Card } from '@mui/material'
import { useSelector } from 'react-redux'
import _ from 'lodash'
import ConsultantListItem from 'features/consulting/consultantList/ConsultantListItem'
import HomePopularConsultantItem from './HomePopularConsultantItem'
import ItemsCarousel from 'react-items-carousel';


const HomePopularConsultant = () => {
	const consultants = useSelector(state=>state.consultantList.consultantsData).slice(0, 10)
	// 비어있으면 true
  const hasConsultants = _.isEmpty(consultants)
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const chevronWidth = 40;

  return (
    <Div>
      <StyledTypography
        mb={4}
        variant="h4" gutterBottom component="div"
      >인기 컨설턴트</StyledTypography>
				{ hasConsultants ? 
				'비어있음' 
				: 
				<div style={{"padding":"0 60px","maxWidth":'70vw',"margin":"0 auto"}}>
				<ItemsCarousel
					infiniteLoop={false}
					gutter={12}
					activePosition={'center'}
					chevronWidth={60}
					disableSwipe={false}
					alwaysShowChevrons={true}
					numberOfCards={3}
					slidesToScroll={2}
					outsideChevron={true}
					showSlither={true}
					firstAndLastGutter={true}
					activeItemIndex={activeItemIndex}
					requestToChangeActive={value => setActiveItemIndex(value)}
					rightChevron={'>'}
					leftChevron={'<'}
				>
					{consultants.map((consultant, idx) =><>
						<FixedTypography>{idx + 1}위</FixedTypography>
						<ConsultantListItem {...consultant} key={idx} propFrom={1} />
					</>
					)}
				</ItemsCarousel>
			</div>




				} 
    </Div >
  )
}

export default HomePopularConsultant

const Div = styled('div')({
	height: '100vh',
	width: '100vw',
	display: 'flex',
	flexDirection: 'column',
	justifyItems: 'center',
	justifyContent: 'center',
	// backgroundColor: '#f8bbd0',
})

const StyledTypography = styled(Typography)({
  fontFamily: 'malgunbd !important',
	fontSize: 'var(--font-title-size)',
	letterSpacing: 'var(--font-title-letter-spacing)',
  color: '#000000',
  // textShadow: 'black 2px 2px'
})


const SetCard = styled(Card)({
  width: "12rem",
  height: "100%",
  backgroundColor: "#F1F1F190",
  padding: '1rem',
  borderRadius: '1rem',
  display: "flex",
  flexDirection: "column",
  justifyContent: "start",
  alignItems: "center",
  gap: "0.1rem",
  position: 'relative',
})

const FixedTypography = styled(Typography)({
  fontFamily: '',
  position: 'absolute',
  top: '1rem',
  left: '1rem'
})


const SetAvatar = styled(Avatar)((props) => ({
  backgroundColor: "skyblue",
  width: `${props.si * 10}px`,
  height: `${props.si * 10}px`,
  img: {
    backgroundColor: 'white',
    borderRadius: "100%",
    width: `${props.si * 9}px`,
    height: `${props.si * 9}px`,
  },
}))