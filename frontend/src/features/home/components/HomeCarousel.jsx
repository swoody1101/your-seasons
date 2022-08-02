import React from 'react'
import { throttle } from 'lodash';
import { styled, Typography, Grid } from '@mui/material'

import IMG4 from 'assets/images/homeSlide/spring04.jpg'
// import IMG4 from 'assets/images/homeSlide/spring02.jpg'

const HomeCarousel = () => {
	let value = window.scrollY
	console.log(value)
	return (
		<BigGrid container>
			<Grid1 item xs={3}>
				<Text>
					FIND<br />
					YOUR<br />
					SEASON					
				</Text>
			</Grid1>
			<Grid2 item xs={9}>
				{/* 이미지 backgorundIMG로 표시 */}
			</Grid2>
		</BigGrid>
	)
}

export default HomeCarousel

const BigGrid = styled(Grid)((props) => (
	{
		height: '100vh',
		width: '100vw',
	}
))

const Grid1 = styled(Grid)((props)=> (
	{
		backgroundColor: '#ffcdd2',
		height: '100vh',
		width: '100vw',
	}
))

const Grid2 = styled(Grid)((props)=> (
	{
		backgroundImage: `url(${IMG4})`,
		backgroundPosition: 'center',
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		height: '100vh',
		width: '100vw',
	}
))

const Text = styled(Typography)((props) => (
  {
    fontFamily: 'malgunbd !important',
    position: "absolute",
		fontSize: '2.5vw',
		letterSpacing: -3,
    top: '60vh',
    left: '15vh',
    color: "#b4004f",
		textShadow: '1px 2px 2px pink',
    // zIndex: "1100",
    "@keyframes textIn": {
      from: {
        transform: "translateX(-10rem)",
				opacity: 0,
      },
      to: {
        transform: "translateX(0)",
				opacity: 1,
      }
    },
    animation: "textIn 1s ease",
    animationDirection: "alternate"
  }
))

