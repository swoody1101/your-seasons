import { Grid, styled, Typography } from '@mui/material'
import React from 'react'
import ExampleImg from '../../../assets/images/homeSlide/ExampleDiagnosis.jpg'

const HomeProcess3 = () => {
	return (<BigGrid container>
		<Grid1 item xs={3}>
			<Text>
				다양한 컬러셋과 함께, 컨설턴트 진단표 제공
			</Text>
		</Grid1>
		
		<Grid2 item xs={9}>
			<ColorsetImg src = {ExampleImg} />
		</Grid2>
	</BigGrid>
	)
}

export default HomeProcess3

const BigGrid = styled(Grid)((
	{
		height: '50vh',
		width: '100vw',
		backgroundColor: '#424242',
	}
))

const Grid1 = styled(Grid)((
	{

	}
))

const Grid2 = styled(Grid)((
	{
		filter: 'blur(7px)',
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
