import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux/es/exports';

import { Button, CardActions, CardContent, Card, Typography, Avatar, CardActionArea, styled } from '@mui/material';
import LyricsOutlinedIcon from '@mui/icons-material/LyricsOutlined';

import MyResHistoryItem from './MyResHistoryItem'
// Todo.
// 요청사항 수정버튼, 예약 취소버튼 기능 구현 
// isActive false일때 버튼 hidden 적용하기
// 날짜부분 추후 다시 스타일 적용

const MyResHistory = () => {
  const dispatch = useDispatch();
  const reservations = useSelector(state => state.myRes.data);


  return (
    <Div>
      {reservations.map((reservation, index) => (
        <MyResHistoryItem {...reservation} key={index} />
      ))}
    </Div>
  )
}

export default MyResHistory

const Div = styled('div')`
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
