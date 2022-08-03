import React from 'react'
import { styled, Typography, Grid } from '@mui/material'

import SUMMER2 from 'assets/images/homeSlide/summer02.jpg'
import SUMMER4 from 'assets/images/homeSlide/summer04.jpg'

const HomeDiagnosis = () => {
	return (
		<BigGrid container>
			<Grid1 item xs={9}>
				{/* 이미지 backgorundIMG로 표시 */}
			</Grid1>
			<Grid2 item xs={3}>
				<TextBold>
					PERSONAL COLOR<br />
					IN YOUR HOUSE
				</TextBold>
				<TextLight>
					today popular consultant
					{/* 저희는 몇명의 전문가와 함께
					우리는 무슨 기술이 있다.
					진행사진이 있어서 설명했음 좋겠다.
					걱정하지마세요, 신청하기 */}
				</TextLight>
					<br />
			</Grid2>
		</BigGrid>
	)
}

export default HomeDiagnosis


const BigGrid = styled(Grid)((props) => (
	{
		height: '100vh',
		width: '100vw',
	}
))


const Grid1 = styled(Grid)((props)=> (
	{
		backgroundImage: `url(${SUMMER2})`,
		backgroundAttachment: 'fixed',
		backgroundPosition: 'center',
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		height: '100vh',
		width: '100vw',
	}
	))
	
	const Grid2 = styled(Grid)((props)=> (
		{
			backgroundColor: '#5f9595',
			// backgroundColor: '#7bbfcf',
			height: '100vh',
			width: '100vw',
		}
	))
	
	const TextBold = styled(Typography)((props) => (
  {
    fontFamily: 'malgunbd !important',
    position: "relative",
		fontSize: '2.5rem',
		letterSpacing: -2,
		// wordSpacing: -3,
    top: '60vh',
    left: '1vw',
    color: "#FFFFFF",
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
  }
))

	const TextLight = styled(Typography)((props) => (
  {
    fontFamily: 'malgunbd !important',
    position: "relative",
		fontSize: '1.5rem',
		letterSpacing: -2,
    top: '60vh',
    left: '1vw',
    color: "#FFFFFF80",
    "@keyframes popularIn": {
      from: {
        transform: "translateX(50rem)",
				opacity: 0,
      },
      to: {
        transform: "translateX(0)",
				opacity: 1,
      }
    },
    animation: "popularIn 1s ease",
    animationDirection: "alternate"
  }
))

