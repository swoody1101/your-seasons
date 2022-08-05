import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { styled } from '@mui/material';
import MyResHistoryItem from './MyResHistoryItem'
import { myResFetch, deleteResFetch } from 'features/mypage/mypageSlice';
// Todo.
// 날짜부분 추후 다시 스타일 적용

const MyResHistory = () => {
  const dispatch = useDispatch()
  const reservations = useSelector(state => state.mypage.myResData)
  const [id, setId] = useState('')
  const clickHandler = (e) => {
    dispatch(deleteResFetch(e.target.value))
      .then(() => {
        setId(e.target.value)
      })
  }

  useEffect(() => {
    dispatch(myResFetch())
  }, [id])


  return (
    <Div>
      {reservations.map((reservation, index) => (
        <MyResHistoryItem clickHandler={clickHandler} {...reservation} key={index} />
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