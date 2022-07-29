import React from 'react'
import { Avatar, Box, Button, Container, styled, Typography, Card } from '@mui/material'

const consultants = [
  {
    consultantId: 1,
    nickname: "ansi",
    introduction: "안녕하세요, ansi입니다.",
    reviewCount: 50,
    starAverage: 4.9,
    cost: "30,500",
    imageUrl: '/images/default/avatar01.png',
  },
  {
    consultantId: 2,
    nickname: "컨설팅",
    introduction: "안녕하세요, 컨설팅입니다.",
    reviewCount: 24,
    starAverage: 4.8,
    cost: "30,100",
    imageUrl: '/images/default/avatar02.png',
  },
  {
    consultantId: 2,
    nickname: "젤잘함",
    introduction: "안녕하세요, 젤잘함입니다.",
    reviewCount: 25,
    starAverage: 4.8,
    cost: "28,000",
    imageUrl: '/images/default/avatar03.png',
  },
  {
    consultantId: 1,
    nickname: "히사시부리",
    introduction: "안녕하세요, 히사시부리입니다.",
    reviewCount: 15,
    starAverage: 4.7,
    cost: "15,000",
    imageUrl: '/images/default/avatar04.png',
  },
  {
    consultantId: 1,
    nickname: "여기보세요 찰칵",
    introduction: "안녕하세요, 여기보세요 찰칵",
    reviewCount: 5,
    starAverage: 4.7,
    cost: "30,000",
    imageUrl: '/images/default/avatar05.png',
  },
]
const handleAvatar = (e) => {
  console.log("선택한 이미지 주소값", e.target.src)
}

const PopCon = () => {
  const result = [];
  for (let i = 0; i < consultants.length; i++) {
    result.push(
      <SetCard elevation={8} key={i}>
        <FixedTypography>{i + 1}위</FixedTypography>
        <SetAvatar si={12} value={i}>
          <Button onClick={handleAvatar}>
            <img src={consultants[i].imageUrl} alt='MyAvatar' />
          </Button>
        </SetAvatar>
        <Typography varient="h3">{consultants[i].nickname}</Typography>
        <Card sx={{ height: '3rem', margin: "4px", padding: "3px" }} >
          <Typography >
            {consultants[i].introduction}
          </Typography>
        </Card>
        <Typography>평점 : {consultants[i].starAverage}  리뷰수 : {consultants[i].reviewCount}</Typography>
        <Typography>{consultants[i].cost} WON</Typography>
      </SetCard>
    )
  }
  return result;
}

const PopularConsultant = () => {
  return (
    <Container mb={100}>
      <StyledTypography
        mt={4}
        variant="h4" gutterBottom component="div"
      >인기 컨설턴트</StyledTypography>
      <CardList gap={4}>
        {PopCon()}
      </CardList>
    </Container >
  )
}

export default PopularConsultant

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

const StyledTypography = styled(Typography)({
  fontFamily: '',
  color: '#F0F0F0',
  textShadow: 'black 2px 2px'
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
  zIndex: '1110'
}))