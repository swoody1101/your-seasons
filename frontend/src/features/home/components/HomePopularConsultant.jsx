import React from 'react'
import { Avatar, Box, Button, Container, styled, Typography, Card } from '@mui/material'
import { useSelector } from 'react-redux'
import _ from 'lodash'
import ConsultantListItem from '../../consulting/consultantList/ConsultantListItem'


// const PopCon = (consultants) => {
// 	const result = [];
// 	let i = 0;
// 	while (i < consultants.length) {
// 		result.push(
// 			<SetCard elevation={8} key={i}>
// 				<FixedTypography>{i + 1}위</FixedTypography>
// 				<SetAvatar si={12} value={i}>
// 						<img src={consultants[i].imageUrl} alt='MyAvatar' />
// 				</SetAvatar>
// 				<Typography varient="h3">{consultants[i].nickname}</Typography>
// 				<Card sx={{ height: '3rem', margin: "4px", padding: "3px" }} >
// 					<Typography >
// 						{consultants[i].introduction}
// 					</Typography>
// 				</Card>
// 				<Typography>평점 : {consultants[i].starAverage}  리뷰수 : {consultants[i].reviewCount}</Typography>
// 				<Typography>{consultants[i].cost} WON</Typography>
// 			</SetCard>
// 		)
// 		i++
// 	}
//   return result;
// }

const HomePopularConsultant = () => {
  const consultants = useSelector(state => state.consultantList.consultants).slice(0, 10)
  // 비어있으면 true
  const hasConsultants = _.isEmpty(consultants)

  return (
    <Div>
      <StyledTypography
        mb={4}
        variant="h4" gutterBottom component="div"
      >인기 컨설턴트</StyledTypography>
      {hasConsultants ?
        '비어있음'
        :
        consultants.map((item, idx) => (
          <ConsultantListItem item={item} key={idx} />
        ))
        // { consultants.map((item, idx ) => (
        // 	// return <ConsultantListItem item={...item}/>
        // ))}
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
})

const StyledTypography = styled(Typography)({
  fontFamily: 'malgunbd !important',
  fontSize: 'var(--font-title-size)',
  letterSpacing: 'var(--font-title-letter-spacing)',
  color: '#000000',
  // textShadow: 'black 2px 2px'
})

const CardList = styled(Container)({
  height: "18rem",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-evenly"
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