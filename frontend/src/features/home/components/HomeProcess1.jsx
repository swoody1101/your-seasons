import React from 'react'
import { Grid, styled, Typography } from '@mui/material'
import MeetingDog from '../../../assets/images/homeSlide/HP1_meetingdog.jpg'
import PeopleMeeting from '../../../assets/images/homeSlide/HP1_meetingpeople.jpg'
import SmilePeople from '../../../assets/images/homeSlide/HP1_smilepeople.jpg'
import Drape from '../../../assets/images/homeSlide/HP1_drape.jpg'

const HomeProcess1 = () => {
	return (
		<BigGrid container>
			<Grid1 item xs={6}>
				<MainTypography>
					화상으로 받는 퍼스널컬러 진단
				</MainTypography>
				<SubTypography>
					드레이프 천을 응용한
					신개념 퍼스널컬러 진단 서비스
				</SubTypography>
			</Grid1>
			<Grid2 item xs={6} >
        <Img src={MeetingDog} />
				<Img src={SmilePeople} />
				<Img src={Drape} />
				<Img src={PeopleMeeting} />

			</Grid2>
		</BigGrid>
	)
}

export default HomeProcess1

const BigGrid = styled(Grid)({
	position: 'relative',
	backgroundColor: '#FFB471',
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
	display: 'flex',
	flexFlow: 'row wrap',
	justifyContent: 'start',
	alignItems: 'center',
	backgroundColor: '#FFFFFF',
})

const MainTypography = styled(Typography)({
	fontFamily: 'malgunbd !important',
	fontSize: 'var(--font-title-size)',
	letterSpacing: 'var(--font-letter-spacing)',
	color: '#FFFFFF', //"#b4004f",
	paddingBottom: 15,
})

const SubTypography = styled(Typography)({
	fontFamily: 'malgunbd !important',
	fontSize: 'var(--font-sub-size)',
	letterSpacing: 'var(--font-letter-spacing)',
	color: '#FFFFFF99',
})


const Img = styled('img')({
	width: '50%',
})

