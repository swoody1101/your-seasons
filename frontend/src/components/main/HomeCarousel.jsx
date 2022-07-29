import React from 'react'

import Carousel from 'react-material-ui-carousel'
import { Paper, Box, styled, Typography, keyframes } from '@mui/material'

import IMG1 from '../../assets/images/homeSlide/slide01.jpg'
import IMG2 from '../../assets/images/homeSlide/slide02.jpg'
import IMG3 from '../../assets/images/homeSlide/slide03.jpg'
import IMG4 from '../../assets/images/homeSlide/slide04.jpg'

const HomeCarousel = () => {
  const items = [
    {
      img: IMG1,
      msg1: "당신의 계절은",
      msg2: "어떠한가요?"
    },
    {
      img: IMG2,
      msg1: "당신에게 맞는",
      msg2: "계절을 찾아보세요."
    },
    {
      img: IMG3,
      msg1: "당신의",
      msg2: "계절"
    },
    {
      img: IMG4,
      msg1: "당신의 계절을",
      msg2: "찾아드립니다."
    },

  ]
  return (
    <Carousel
      height="60vh"
      interval={4000}
    >
      {
        items.map((item, i) => <Item key={i} item={item} index={i} />)
      }
    </Carousel >
  )
}

export default HomeCarousel

function Item(props) {
  return (
    <SetPaper>
      <SlideImg seq={props.index} src={props.item.img} />
      <TEXT seq={props.index}>
        {props.item.msg1}<br />
        {props.item.msg2}
      </TEXT>
    </SetPaper>
  )
}
const SetPaper = styled(Paper)({
  position: "relative",
  height: "60vh",
  zIndex: "0",
  backgroundColor: "transparent",
  boxShadow: "none",
})

const dir = [
  { top: "40", left: "20", },
  { top: "40", left: "20", },
  { top: "30", left: "50", },
  { top: "30", left: "50", },
]

const SlideImg = styled('img')({
  minWidth: "940px",
  minHeight: "760px",
  position: "absolute",
  bottom: "-20vh",
  width: "100vw",
  height: "80vw",
  zIndex: "-1",
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
  // "-webkit-mask-image": "linear-gradient(to top,  transparent 20%, black 60%, transparent 20%)",
  maskImage: "linear-gradient(to top, transparent 10%, black )"
})


const TEXT = styled(Typography)((props) => (
  {
    fontFamily: 'MYHaemalgeunSangsang !important',
    position: "absolute",
    top: `${dir[props.seq].top}%`,
    left: `${dir[props.seq].left}%`,
    fontSize: "6rem",
    color: "#FFFFFF",
    textShadow: "#00000090 5px 5px",
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
  }
))

