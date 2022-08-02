import React from 'react';
import { useSelector } from 'react-redux/es/exports';
import { styled } from '@mui/material';
import MyResHistoryItem from './MyResHistoryItem'
// Todo.
// 날짜부분 추후 다시 스타일 적용

const MyResHistory = () => {
  const reservations = useSelector(state => state.mypage.myResData);


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