import React, { useState, useEffect } from 'react'
import ConsultingResBtnItem from './ConsultingResBtnItem'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { Box, Typography, Divider, TextField, Button } from '@mui/material';
import { createReservation, ConsultantDetailFetch } from 'features/consulting/consultantListSlice';

const ConsultingResBtn = (props) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { role } = useSelector(state => state.auth.logonUser)
  const [value, setValue] = useState('')
  const [pickedTime, setPickedTime] = useState('')
  const [request, setRequest] = useState('')
  const consultantId = useParams().id
  let timeTable = [
    {
      isReserved: null,
      time: '09:00:00'
    },
    {
      isReserved: null,
      time: '10:00:00'
    },
    {
      isReserved: null,
      time: '11:00:00'
    },
    {
      isReserved: null,
      time: '13:00:00'
    },
    {
      isReserved: null,
      time: '14:00:00'
    },
    {
      isReserved: null,
      time: '15:00:00'
    },
    {
      isReserved: null,
      time: '16:00:00'
    },
    {
      isReserved: null,
      time: '17:00:00'
    },
    {
      isReserved: null,
      time: '18:00:00'
    }
  ]

  const timeClickHandler = (e) => {
    setPickedTime(e.target.value)
  }

  const reservationHandler = () => {
    if (role === 'CUSTOMER') {
      const reservation = {
        reservationDate: props.pickedDate,
        reservationTime: pickedTime,
        request: request
      }
      if (reservation.request.length < 10) {
        alert('10자이상 입력해 주세요!')
      } else if (pickedTime === '') {
        alert('원하는 상담시간을 선택해주세요')
      }
      else {
        dispatch(createReservation({ consultantId, reservation }))
          .then(() => {
            dispatch(ConsultantDetailFetch(consultantId))
          })
        setRequest('')
        setValue('')
      }
      setPickedTime('')
    } else if (role === "CONSULTANT") {
      alert('컨설턴트는 컨설팅 예약을 할 수 없습니다!')
    } else {
      alert('로그인이 필요한 기능입니다. 로그인 페이지로 이동합니다.')
      navigate('/login')
    }

  }

  useEffect(() => {
    setPickedTime('')
  }, [props.pickedDate])

  let pickeTimeContent = '상담을 원하는 시간을 선택해주세요.'
  let timeContent = ''
  if (pickedTime === '') {
    timeContent = ''
  } else if (pickedTime !== '') {
    timeContent = `${props.pickedDate.slice(0, 4)}년 ${props.pickedDate.slice(5, 7)}월 ${props.pickedDate.slice(8, 10)}일 ${pickedTime.slice(0, 2)}시`
  }

  if (props.reservations.length > 0) {
    props.reservations.forEach(res => {
      timeTable.forEach(obj => {
        if (obj.time === res.reservationTime) {
          obj.isReserved = true
        }
      })
    })
  }

  const moringRendering = () => {
    const result = []
    {
      for (let i = 0; i < 3; i++) {
        result.push(<ConsultingResBtnItem
          key={i}
          time={timeTable[i].time}
          isReserved={timeTable[i].isReserved}
          timeClickHandler={timeClickHandler}
        />)
      }
      return result
    }
  }

  const oneToThreeRendering = () => {
    const result = []
    {
      for (let i = 3; i < 6; i++) {
        result.push(<ConsultingResBtnItem
          key={i}
          time={timeTable[i].time}
          isReserved={timeTable[i].isReserved}
          timeClickHandler={timeClickHandler}
        />)
      }
      return result
    }
  }

  const fourToSixRendering = () => {
    const result = []
    {
      for (let i = 6; i < 9; i++) {
        result.push(<ConsultingResBtnItem
          key={i}
          time={timeTable[i].time}
          isReserved={timeTable[i].isReserved}
          timeClickHandler={timeClickHandler}
        />)
      }
      return result
    }
  }

  return (
    <Box sx={{ borderRadius: 2, boxShadow: 3, width: 'auto' }}>
      <Typography sx={{ p: 1 }}
        component="h1"
        variant="h5"
        id="login-text">
        {props.pickedDate} 예약하기
      </Typography>
      <Typography sx={{ p: 1 }}
        variant="h6"
        id="login-text">
        {pickeTimeContent}
      </Typography>
      <Divider />
      <Box sx={{ pl: 1, py: 3 }}>
        <h3>오전</h3>
        {moringRendering()}
      </Box>
      <Divider />
      <Box sx={{ pl: 1, pt: 3, pb: 2 }}>
        <h3>오후</h3>
        {oneToThreeRendering()}
      </Box>
      <Box sx={{ pl: 1, pb: 3 }}>
        {fourToSixRendering()}
      </Box>
      <Divider />
      <Box sx={{ px: 1, py: 3 }}>
        <h3>컨설턴트님께 바라는 점</h3>
        <TextField
          onChange={
            (e) => {
              setRequest(e.target.value)
              setValue(e.target.value)
            }
          }
          value={value}
          label="요청사항"
          name="request"
          margin="normal"
          multiline
          rows={4}
          autoComplete="request"
          autoFocus
          required
          fullWidth />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "end", alignItems: "center", fontWeight: 'bold', fontSize: '14px' }}>
        {timeContent}
        <Button
          sx={{ color: "pink" }}
          onClick={reservationHandler}
        >예약 하기</Button>
      </Box>
    </Box>
  )
}
export default ConsultingResBtn
