import React from 'react'
import { Grid, styled, Typography } from '@mui/material'
import People from '../../../assets/images/homeSlide/HP2_1.jpg'

const HomeProcess2 = () => {
	return (
	<BigGrid container>
	<Grid1 item xs={6}>
		<Img src = {People} />
	</Grid1>
	<Grid2 item xs={6}>
		<MainTypography>
			톤보정을 통한 걱정없는 화상 서비스
		</MainTypography>
	</Grid2>
</BigGrid>
	)
}

export default HomeProcess2


const BigGrid = styled(Grid)({
	position: 'relative',
	backgroundColor: '#eeeeee',
	height: '100vh',
	width: '100vw',
})

const Grid1 = styled(Grid)({
	display: 'flex',
	flexFlow: 'row wrap',
	justifyContent: 'start',
	alignItems: 'center',
	justifyContent: 'center',
	backgroundColor: '#eceff1',
})

const Grid2 = styled(Grid)({
	position: 'relative',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	flexDirection: 'column',
})

const MainTypography = styled(Typography)({
	position: 'absolute',
	fontFamily: 'malgunbd !important',
	fontSize: 'var(--font-title-size)',
	letterSpacing: 'var(--font-letter-spacing)',
	color:  '#000000', //"#b4004f",
	paddingBottom: 15,
})

const Img = styled('img')({
	width: '50%'
})

