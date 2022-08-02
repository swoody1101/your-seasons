import React, { useState } from 'react'
import ConsultingResBtnItem from './ConsultingResBtnItem'
import { Box, Typography, Divider, TextField } from '@mui/material';
import { width } from '@mui/system';

const ConsultingResBtn = (props) => {

  const [pickedTime, setPickedTime] = useState('')

  let timeTable = [
    {
      isReserved: "",
      time: '09:00:00'
    },
    {
      isReserved: "",
      time: '10:00:00'
    },
    {
      isReserved: "",
      time: '11:00:00'
    },
    {
      isReserved: "",
      time: '13:00:00'
    },
    {
      isReserved: "",
      time: '14:00:00'
    },
    {
      isReserved: "",
      time: '15:00:00'
    },
    {
      isReserved: "",
      time: '16:00:00'
    },
    {
      isReserved: "",
      time: '17:00:00'
    },
    {
      isReserved: "",
      time: '18:00:00'
    }
  ]

  const timeClickHandler = (e) => {
    setPickedTime(e.target.value)
  }
  let pickeTimeContent = ''
  if (pickedTime === '') {
    pickeTimeContent = '상담을 원하는 시간을 선택해주세요.'
  } else if (pickedTime !== '') {
    pickeTimeContent = pickedTime.slice(0, 2) + '시를 선택하셨습니다.'
  }
  console.log(props.reservations)
  if (props.reservations.length > 0) {
    props.reservations.forEach(res => {
      timeTable.forEach(obj => {
        if (obj.time === res.reservationTime) {
          obj.isReserved = 'true'
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
    </Box>
  )
}
export default ConsultingResBtn
