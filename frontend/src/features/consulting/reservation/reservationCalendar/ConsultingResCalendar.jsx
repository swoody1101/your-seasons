import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import ConsultingResBtn from './ConsultingResBtn';
import TimeTable from './TimeTable';
import Calendar from 'react-calendar'
import './ConsultingResCalendar.css';
import moment from 'moment';
import { Box, styled, Grid, Typography } from '@mui/material';


const ConsultingResCalendar = () => {
  const { reservations, closedDays } = useSelector(state => state.consultantList.consultantDetail)
  const today = new Date()

  let todaydate = (today.getFullYear()) + '-' + ('0' + (today.getMonth() + 1)).slice(-2)
    + '-' + ('0' + today.getDate()).slice(-2);

  const [dateState, setDateState] = useState(new Date())
  const [pickedDate, setPickedDate] = useState(todaydate)
  const dayOff = []

  closedDays.forEach((res) => {
    dayOff.push(res.date)
  })

  const timeTable = [
    '09:00:00',
    '10:00:00',
    '11:00:00',
    '13:00:00',
    '14:00:00',
    '15:00:00',
    '16:00:00',
    '17:00:00',
    '18:00:00'
  ]

  const changeDate = (event) => {
    const date = (event.getFullYear()) + '-' + ('0' + (event.getMonth() + 1)).slice(-2)
      + '-' + ('0' + event.getDate()).slice(-2);

    setPickedDate(date)
    setDateState(event)
  }

  const titleContent = ({ activeStartDate, date, view }) => {
    let resTimeTable = []
    const newdate = ((date.getFullYear()) + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2))
    // 날짜가 일치할때 시간 정보만 빈 리스트에 저장
    if (newdate === todaydate) {
      return <StyledDiv>당일예약불가</StyledDiv>
    }
    if (newdate > todaydate) {
      reservations.forEach(res => {
        if (res.reservationDate === newdate) {
          resTimeTable.push(res.reservationTime)
        }
      })
      // 리스트가 빈 리스트라면 타임테이블 정보 props로 내려주고
      if (view === "month" && dayOff.includes(newdate)) {
        return <StyledDiv>휴무일</StyledDiv>
      } else if (view === "month" && resTimeTable.length === 0) {
        return <TimeTable timetable={timeTable} />
        // 리스트가 빈리스트가 아니라면 기존의 타임테이블과 시간정보 비교해서 차집합을 구하고 props로 내려주기
      } else if (view === "month" && resTimeTable.length > 0) {
        const noResTimeTable = timeTable.filter(x => !resTimeTable.includes(x))
        return <TimeTable timetable={noResTimeTable} />
      };
    }
    resTimeTable = []
  }

  const tileDisabled = ({ date, view }) =>
  (view === "month" && dayOff.includes(((date.getFullYear()) + '-' + ('0' + (date.getMonth() + 1)).slice(-2)
    + '-' + ('0' + date.getDate()).slice(-2))))

  const filteredReservations = reservations.filter(res => {
    return res.reservationDate === pickedDate
  })

  let resContent = ''

  if (pickedDate === todaydate) {
    resContent = <Typography
      component="h1"
      variant="h5"
      id="login-text">
      당일은 예약이 불가능합니다.
    </Typography>
  } else if (pickedDate !== todaydate) {
    resContent = <ConsultingResBtn
      pickedDate={pickedDate}
      reservations={filteredReservations}
    />
  }


  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={8}>
          <Calendar
            minDate={new Date()} //오늘 기준으로 2달전 까지만 선택 가능
            maxDate={new Date(new Date().setMonth(new Date().getMonth() + 2))} //오늘 기준으로 2달후 까지만 선택 가능
            value={dateState}
            onChange={changeDate}
            calendarType="Hebrew" //한 주를 일요일부터 시작
            formatDay={(locale, date) => // '일' 제외하고 숫자만 보이도록 설정
              moment(date).format("DD")}
            tileDisabled={tileDisabled} // 특정 날짜를 선택 불가능
            tileContent={titleContent} // 타일에 html 컨텐츠 추가
            next2Label={null}
            prev2Label={null} // 연 단위 이동 버튼 숨김
          />

        </Grid>
        <Grid item xs={12} sm={4}>
          {resContent}
        </Grid>
      </Grid>
    </Box >
  )
}

const StyledDiv = styled('div')({
  color: "red",
  textAlign: "center",
  fontSize: "0.7em",
})
export default ConsultingResCalendar
