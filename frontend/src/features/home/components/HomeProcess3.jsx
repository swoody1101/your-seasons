import { Grid, styled, Typography } from '@mui/material'
import React from 'react'
import ExampleImg from '../../../assets/images/homeSlide/HP3_1.png'

const HomeProcess3 = () => {
	return (
		<BigGrid container>
			<Grid1 item xs={6}>
				<MainTypography>
					컬러셋과 함께, 컨설턴트 진단표 제공
				</MainTypography>
				<SubTypography>
					다양한 컨설턴트의 진단을 받아보세요
				</SubTypography>
			</Grid1>

			<Grid2 item xs={6}>
				<ColorsetImg src={ExampleImg} />
			</Grid2>
		</BigGrid>
	)
}

export default HomeProcess3

const BigGrid = styled(Grid)({
	position: 'relative',
	backgroundColor: '#ADBED2',
	height: '100vh',
	width: '100vw',
})


const Grid1 = styled(Grid)({
	position: 'relative',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	flexDirection: 'column',
})

const Grid2 = styled(Grid)({
	position: 'relative',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	flexDirection: 'column',
  // backgroundColor: 'white',
})

const MainTypography = styled(Typography)({
	position: 'absolute',
	fontFamily: 'malgunbd !important',
	fontSize: 'var(--font-title-size)',
	letterSpacing: 'var(--font-letter-spacing)',
	color: '#000000', //"#b4004f",
	paddingBottom: 15,
})

const SubTypography = styled(Typography)({
	position: 'absolute',
	marginTop: 70,
	fontFamily: 'malgunbd !important',
	fontSize: 'var(--font-sub-size)',
	letterSpacing: 'var(--font-letter-spacing)',
	color: '#00000080',
})

const ColorsetImg = styled('img')({
	filter: 'blur(4px)',
	width: '23vw',
})
