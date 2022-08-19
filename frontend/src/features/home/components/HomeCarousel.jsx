import React from 'react'
import Carousel from 'react-material-ui-carousel';
import { styled, Typography, Paper } from '@mui/material';

import IMG1 from 'assets/images/homeSlide/spring01.jpg'
import IMG2 from 'assets/images/homeSlide/summer01.jpg'
import IMG3 from 'assets/images/homeSlide/autumn01.jpg'
import IMG4 from 'assets/images/homeSlide/winter02.jpg'

const HomeCarousel = () => {
  const items = [
    {
      img: IMG1,
      msg: '봄날의 햇살같은 당신을 위한 서비스'
    },
    {
      img: IMG2,
      msg: '더운 여름, 집에서 전문 컨설턴트와 함께하는 퍼스널 컬러진단'
    },
    {
      img: IMG3,
      msg: '웨딩, 취업, 헤어, 코디 등 전문가의 코치를 받아보세요'
    },
    {
      img: IMG4,
      msg: '당신의 계절은 무엇인가요?'
    },

  ]
  return (<div>
    <Carousel
      width="100vw"
      height="100vh"
      interval={4000}
    >
      {
        items.map((item, i) => <Item key={i} item={item} index={i} />)
      }
    </Carousel >
  </div>
  )
}

export default HomeCarousel

function Item(props) {
  return (
    <SetPaper>
      <SlideImg seq={props.index} src={props.item.img} />
      <TEXT seq={props.index}>
        {props.item.msg}<br />
      </TEXT>
    </SetPaper>
  )
}

const SetPaper = styled(Paper)({
  position: "relative",
  height: "60vh",
  backgroundColor: "transparent",
  boxShadow: "none",
})

const dir = [
  { top: "40", left: "20", },
  { top: "40", left: "20", },
  { top: "30", left: "40", },
  { top: "30", left: "60", },
]

const SlideImg = styled('img')({
  minWidth: "940px",
  minHeight: "280px",
  bottom: "-20vh",
  width: "100vw",
  "@keyframes pulsate": {
    from: {
      transform: `scale(1)`,
    },
    to: {
      transform: `scale(1.005)`,
    }
  },
  animation: "pulsate 1.8s infinite ease",
  animationDirection: "alternate",
  maskImage: "linear-gradient(to top, transparent 10%, black )"
})

const TEXT = styled(Typography)((props) => ({
  fontFamily: 'Happiness-Sans-Bold !important',
  position: "absolute",
  top: `${dir[props.seq].top}%`,
  left: `${dir[props.seq].left}%`,
  fontSize: "2.5rem",
  color: "#000000",
  zIndex: "1100",
  "@keyframes textIn": {
    from: {
      transform: "translateX(-0.5rem)",
    },
    to: {
      transform: "translateX(0)",
    }
  },
  animation: "textIn 1s ease",
  animationDirection: "alternate"
}))