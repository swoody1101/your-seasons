import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { styled } from '@mui/material';
import MyResHistoryItem from './MyResHistoryItem'
import { myResFetch, deleteResFetch } from 'features/mypage/mypageSlice';
import { isEmpty } from 'lodash'

const MyResHistory = () => {
  const dispatch = useDispatch()
  const reservations = useSelector(state => state.mypage.myResData)
  const [id, setId] = useState('')

  const clickHandler = (e) => {
		if (window.confirm("정말 취소하시겠습니까?")) {
			dispatch(deleteResFetch(e.target.value))
      .then(() => {
        setId(e.target.value)
      })
    } else {
			return
    }
  }

  useEffect(() => {
    dispatch(myResFetch())
  }, [id])


  return (
    <Div>
      {isEmpty(reservations) ? <h2>등록된 예약이 없습니다.</h2> : reservations.map((reservation, index) => (
        <MyResHistoryItem clickHandler={clickHandler} {...reservation} key={index} />
      ))}
    </Div>
  )
}

export default MyResHistory

const Div = styled('div')({
	maxWidth: '100%',
	display: 'flex',
	flexDirection: 'column-reverse',
	gap: 10,
})