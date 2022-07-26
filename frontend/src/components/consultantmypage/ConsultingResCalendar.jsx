import React, { useState } from 'react'
import ConsultingResHistory from './ConsultingResHistory';
import Calendar from 'react-calendar'
import './ConsultingResCalendar.css';
import moment from 'moment';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

const today = new Date()

let date = (today.getFullYear()) + '-' + ('0' + (today.getMonth() + 1)).slice(-2)
  + '-' + ('0' + today.getDate()).slice(-2);


export default function ConsultingResCalendar(props) {
  const [dateState, setDateState] = useState(new Date())
  const [pickedDate, setPickedDate] = useState(date)

  const changeDate = (event) => {
    const date = (event.getFullYear()) + '-' + ('0' + (event.getMonth() + 1)).slice(-2)
      + '-' + ('0' + event.getDate()).slice(-2);

    setPickedDate(date)
    setDateState(event)
  }

  const filteredReservations = props.reservations.filter(res => {
    return res.reservationDate === pickedDate
  })

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={8}>
          <Calendar
            value={dateState}
            onChange={changeDate}
            calendarType="Hebrew" //한 주를 일요일부터 시작
            formatDay={(locale, date) => // '일' 제외하고 숫자만 보이도록 설정
              moment(date).format("DD")}
          />
          <p>선택하신 날짜는 <b>{pickedDate} 입니다.</b></p>
        </Grid>
        <Grid item xs={12} sm={4}>
          <ConsultingResHistory reservation={filteredReservations} />
        </Grid>
      </Grid>
    </Box>
  )
}

