import React, { useState, useEffect } from 'react';
import { Button, CardActions, CardContent, Card, Typography, Avatar, CardActionArea } from '@mui/material';
import LyricsOutlinedIcon from '@mui/icons-material/LyricsOutlined';
import styled from '@emotion/styled'
import { useDispatch, useSelector } from 'react-redux/es/exports';

// Todo.
// 요청사항 수정버튼, 예약 취소버튼 기능 구현 
// isActive false일때 버튼 hidden 적용하기
// 날짜부분 추후 다시 스타일 적용

const MyResHistory = () => {
  const dispatch = useDispatch();
	const reservations = useSelector(state=>state.myRes.data);
	
	return (
		<Div>
		{/* reverse문제없는지 추후 확인예정 */}
		{reservations.map((item, index)=>(
    <Card sx={{ marginBottom:5, padding:1, borderRadius: 5 }} variant="outlined" className="history-card" key={index}>
			<CardActionArea>
				<CardContent>
					{/* 컨설턴트정보, 날짜 */}
					<Avatar src={item.consultantImg} sx={{ width: 100, height: 100, marginBottom:1 }} alt="컨설턴트프로필"/>
					<Forflex>
						<Typography gutterBottom variant="h6" component="div">
							{item.consultant} 컨설턴트님
						</Typography>
						<Typography gutterBottom variant="h6" component="div" >
							{item.reservationDate}일 {item.reservationTime} 
							<Typography gutterBottom variant="body2" component="span" sx={{paddingLeft:1}} color="error">{!item.isActive ? '예약불가' : ''}</Typography>
						</Typography>
					</Forflex>
					{/* <Line /> */}

					<RequestBox>
						<Typography sx={{marginBottom:1}}>컨설턴트님께 요청드려요 <LyricsOutlinedIcon/> </Typography>
						<Typography variant="body2" color="text.secondary">
						{!item.request ? '아직 요청사항이 없어요. 요청사항을 작성해주시면 상담에 도움이 됩니다 :)' : item.request}
						</Typography>
					</RequestBox>
				</CardContent>
			</CardActionArea>
			<CardActions>
				<div id="request-submitbtn">
					<Button size="small" color="primary">
						{!item.request ? '요청사항 작성' : '요청사항 수정'}
					</Button>
					<Button size="small" color="error">
						예약취소
					</Button>
				</div>
			</CardActions>
	</Card>
	))}
	</Div>
	)
}

export default MyResHistory

const Div = styled.div`
	max-width:700px;
	margin:auto;
	display:flex;
	flex-direction: column-reverse;
`

// const Line = styled.div`
// 	border-top: 1px dashed #ADBED2;
// 	margin-top: -20px;
// 	margin-bottom: 20px;
// `

const RequestBox = styled.div`
	border: 1px dashed #ADBED2;
	border-radius: 5px;
	padding: 10px;
`

const Forflex = styled.div`
	display:flex;
	justify-content: space-between;
	align-items: end;
	padding: 10px;
`