import React from 'react'
import Carousel from 'react-material-ui-carousel';
import { styled, Typography, Paper } from '@mui/material';

import IMG1 from 'assets/images/homeSlide/spring04.jpg'
import IMG2 from 'assets/images/homeSlide/summer02.jpg'
import IMG3 from 'assets/images/homeSlide/autumn04.jpg'
import IMG4 from 'assets/images/homeSlide/winter01.jpg'

const HomeCarousel = () => {
	const items = [
		{
			img: IMG1,
			msg: '당신의 계절을 찾아보세요'
		},
		{
			img: IMG2,
			msg: '전문 컨설턴트와 함께하는 퍼스널 컬러진단'
		},
		{
			img: IMG3,
			msg: '스드메부터 취업까지 전문가와 함께'
		},
		{
			img: IMG4,
			msg: '자가진단 서비스 오픈예정'
		},
		
	]
  return (
    <Carousel
			width="100vw"
      height="90vh"
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
        {props.item.msg}<br />
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
		
    fontFamily: 'Happiness-Sans-Bold !important',
    position: "absolute",
    top: `${dir[props.seq].top}%`,
    left: `${dir[props.seq].left}%`,
    fontSize: "2rem",
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
  }
))

