import React from 'react'
import { Grid, styled, Typography } from '@mui/material'
import IponeTone from '../../../assets/images/homeSlide/IponeTone.jpg'
const HomeProcess2 = () => {
	return (
	<BigGrid container>
	<Grid1 item xs={3}>
		<Text>
		톤보정을 통한 걱정없는 화상 서비스
		</Text>
	</Grid1>
	
	<Grid2 item xs={9}>
		<ColorsetImg src = {IponeTone} />
	</Grid2>
</BigGrid>
	)
}

export default HomeProcess2


const BigGrid = styled(Grid)((
	{
		height: '50vh',
		width: '100vw',
		backgroundColor: '#525252',
	}
))

const Grid1 = styled(Grid)((
	{

	}
))

const Grid2 = styled(Grid)((
	{
		// filter: 'blur(7px)',
	}
))

const ColorsetImg = styled('img')((
	{
		width: '10%'
	}
))


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
