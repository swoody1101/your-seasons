import React from 'react';

import { Button, Box, CardContent, Card, Typography, CardActionArea, styled, Grid, CardActions } from '@mui/material';
import LyricsOutlinedIcon from '@mui/icons-material/LyricsOutlined';
import OtherAvatar from 'common/avatar/OtherAvatar';
import './../mypage.css'

const MyResHistoryItem = (props) => {
  return (
    <SetCard variant="outlined">

		<CardActionArea>
		<CardContent>
		<Grid container>
		
			{/* 그리드 1 */}
			<ImgGrid item xs={12} sm={3}>
				<OtherAvatar setSize={14} imgUrl={props.consultantImageUrl} />
			</ImgGrid>

			{/* 그리드 2 */}
			<Grid item xs={12} sm={9}>
				{/* 컨설턴트정보, 날짜 */}
				<Forflex>
					<MainText>
						{props.consultantNickname}님과의 상담예약 |
						일시: {props.reservationDate}일 {props.reservationTime.slice(0,2)}시 {props.reservationTime.slice(3,5)}분
					</MainText>
						<Typography gutterBottom variant="body2" component="span" sx={{ paddingLeft: 1 }} >{!props.active ? '취소된 예약' : '' }</Typography>
				</Forflex>
				{/* 요청사항 박스 */}
				<RequestBox>
					<Typography sx={{ marginBottom: 1 }}>컨설턴트님께 요청드려요 <LyricsOutlinedIcon className={props.active ? 'neon' : ''} /> </Typography>
					<RequestText name="isComment" defaultValue={props.request ? props.request : ''}
						placeholder={'요청사항이 없습니다.'}>
					</RequestText>
				</RequestBox>
			</Grid>

		</Grid>
		</CardContent>
		</CardActionArea>
		{/* 카드 액션부분 */}
		<CardActions sx={{display: 'flex', justifyContent: 'end'}}>
			<Button size="small" color="error" value={props.reservationId} onClick={props.clickHandler} style={{display: !props.active ? 'none' : '' }}>  예약취소 </Button>
		</CardActions>

		</SetCard>
  )
}

export default MyResHistoryItem

const SetCard = styled(Card)({
  marginBottom: 5,
  // backgroundColor: "#F1F1F190",
  borderRadius: '1rem',
})

const RequestBox = styled(Box)({
  border: '1px dashed #ADBED2',
  borderRadius: 5,
  padding: 10,
})

const ImgGrid = styled(Grid)({
  display:'flex',
	justifyContent: 'center',
	alignItems: 'start',
})


const Forflex = styled('div')({
	display:'flex',
	justifyContent: 'space-between',
	alignItems: 'end',
	padding: 10,
})

const MainText = styled(Typography)({
	fontSize: 20,
	fontWeight: 'bold',
})


const RequestText = styled('textarea')({
	fontSize: 15,
	border: 'none',
	backgroundColor: '#FFFFFF00',
	height: '100%',
	width: '100%',
	resize: 'none',
})




