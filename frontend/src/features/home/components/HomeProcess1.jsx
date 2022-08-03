import React from 'react'
import DogMeeting from '../../../assets/images/homeSlide/meetingdog.jpg'
import { Grid, styled, Typography } from '@mui/material'

const HomeProcess1 = () => {
	return (
		<BigGrid container>
		<Grid1 item xs={3}>
			<Text>
			화상으로 받는 퍼스널컬러 진단
			</Text>
		</Grid1>
		<Grid2 item xs={9}>
			<DogDiv>
				<DogImg src={DogMeeting} />
			</DogDiv>
		</Grid2>
	</BigGrid>
	)
}

export default HomeProcess1

const BigGrid = styled(Grid)((
	{
		position: 'relative',
		maxWidth: '100%',
		maxHeight: 300,
		height: 300,
		width: '100%',
		// height: '50vh',
		// width: '100vw',
		backgroundColor: '#424242',
	}
))

const Grid1 = styled(Grid)((
	{
		position: 'absolute',
	}
))

const Grid2 = styled(Grid)((
	{
		position: 'absolute',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		right: 100,
		height: '50vh',
		filter: 'blur(1px)',
	}
))

const DogDiv = styled('div')({
	marginTop: '24vh',
	marginLeft: '3vw',
	height: '50vh',
})

const DogImg = styled('img')({
	width: 300,
})

const Text = styled(Typography)((
  {
    fontFamily: 'malgun !important',
    position: "relative",
		fontSize: '2.5rem',
		letterSpacing: -3,
    top: '15vh',
    left: '15vh',
    color:  '#FFFFFF', //"#b4004f",
		// textShadow: '1px 2px 2px pink',
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
