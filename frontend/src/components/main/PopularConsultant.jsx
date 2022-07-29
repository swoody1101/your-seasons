import React from 'react'
import Carousel from 'react-material-ui-carousel'
import { Avatar, Box, Paper, Container, styled, Typography, Card } from '@mui/material'

const consultants = [
  {
    consultantId: 1,
    nickname: "ansi",
    introduction: "안녕하세요, ansi입니다.",
    reviewCount: 5,
    starAverage: 4.5,
    cost: "30,000",
    imageUrl: '/images/default/avatar01.png',
  },
  {
    consultantId: 2,
    nickname: "컨설팅",
    introduction: "안녕하세요, 컨설팅입니다.",
    reviewCount: 5,
    starAverage: 4.5,
    cost: "30,000",
    imageUrl: '/images/default/avatar02.png',
  },
  {
    consultantId: 2,
    nickname: "컨설팅",
    introduction: "안녕하세요, 컨설팅입니다.",
    reviewCount: 5,
    starAverage: 4.5,
    cost: "30,000",
    imageUrl: '/images/default/avatar03.png',
  },
  {
    consultantId: 1,
    nickname: "ansi",
    introduction: "안녕하세요, ansi입니다.",
    reviewCount: 5,
    starAverage: 4.5,
    cost: "30,000",
    imageUrl: '/images/default/avatar04.png',
  },
  {
    consultantId: 1,
    nickname: "ansi",
    introduction: "안녕하세요, ansi입니다.",
    reviewCount: 5,
    starAverage: 4.5,
    cost: "30,000",
    imageUrl: '/images/default/avatar05.png',
  },
]


const PopularConsultant = () => {
  return (
    <Container>
      <StryledTypography
        mt={2}
        variant="h4" gutterBottom component="div"
      >인기 컨설턴트</StryledTypography>
      <Carousel
        height="300px"
        autoPlay={false}
        elevation='8'
        sx={{
          marginTop: "3px",
          marginBottom: "3px",
          backgroundColor: "#F1F1F1",
        }}
      >
        {
          consultants.map((item, i) => {
            <Consultant key={i} item={item} />
          })
        }
      </Carousel>
    </Container >
  )
}

export default PopularConsultant

const Consultant = (props) => {
  console.log(props)
  return (
    <SetCard elevation={8}>
      <Avatar src={props.item.imageUrl} />
      {props.item.nickname}
    </SetCard>
  )
}

const SetCard = styled(Card)({
  position: "relative",
  zIndex: "0",
})

const StryledTypography = styled(Typography)({
  fontFamily: '',
  color: '#F0F0F0',
  textShadow: 'black 2px 2px'
})
