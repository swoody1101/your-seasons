import React from 'react'
import { Link } from 'react-router-dom';
import { Box, Grid, styled, Typography } from '@mui/material'
import PeopleMeeting from '../../../assets/images/homeSlide/HP1_meetingpeople.jpg'
import SmilePeople from '../../../assets/images/homeSlide/HP1_smilepeople.jpg'
import { useSelector } from 'react-redux';

const HomeProcess1 = () => {

	return (
		<BigGrid container>
			<Grid1 item xs={6}>
				<MainTypography>
					화상으로 받는 퍼스널컬러 진단
				</MainTypography>
				<SubTypography>
          가상배경을 활용한
					신개념 퍼스널컬러 진단 서비스
				</SubTypography>
			</Grid1>
			<Grid2 item xs={6} >

        <ImgSub>
          <ImgMainTypography>혼자하는 자가진단 서비스</ImgMainTypography>
            <Link to={'/self'} onClick={()=>{window.scrollTo(0,0);}}><ImgSubTypography>자가진단 하러가기</ImgSubTypography></Link>
        </ImgSub>
				<Img src={SmilePeople} />

        <Img src={PeopleMeeting} />
        <ImgSub>
          <ImgMainTypography>컨설턴트 님과의 1:1 진단 서비스</ImgMainTypography>
          <Link to={'/consultants'} onClick={()=>{window.scrollTo(0,0);}}><ImgSubTypography>컨설턴트 더보기</ImgSubTypography></Link>
        </ImgSub>


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

const ImgSub = styled(Box)({
  position: 'relative',
	width: '50%',
  height: '50%',
})

const ImgMainTypography = styled(Typography)({
  position: 'absolute',
	fontFamily: 'malgunbd !important',
	fontSize: '1.5rem',
	letterSpacing: 'var(--font-letter-spacing)',
	color:  '#000000', //"#b4004f",
	paddingTop: '30%',
  paddingLeft: '15%',
  "@keyframes popularIn": {
    from: {
      transform: "translateX(-10rem)",
      opacity: 0,
    },
    to: {
      transform: "translateX(0)",
      opacity: 1,
    }
  },
  animation: "popularIn 1s ease",
  animationDirection: "alternate"
})

const ImgSubTypography = styled(Typography)({
  position: 'absolute',
	fontFamily: 'malgunbd !important',
	fontSize: 'var(--font-sub-size)',
	letterSpacing: 'var(--font-letter-spacing)',
  textDecoration: 'underline',
	color: '#00000090',
  paddingTop: '40%',
  paddingLeft: '15%',
  "@keyframes popularIn": {
    from: {
      transform: "translateX(-10rem)",
      opacity: 0,
    },
    to: {
      transform: "translateX(0)",
      opacity: 1,
    }
  },
  animation: "popularIn 1s ease",
  animationDirection: "alternate"
})
