import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import ConsultingResHistory from './ConsultingResHistory';
import Calendar from 'react-calendar'
import './ConsultingResCalendar.css';
import moment from 'moment';
import { Button, Stack, Box, styled, Grid } from '@mui/material';
import { ContentPasteOff, ContentPaste } from '@mui/icons-material';
import { closeDay, deleteClosedDay } from 'features/mypage/mypageSlice';
import { loadMember } from 'features/auth/authSlice';

export default function ConsultingResCalendar(props) {
  const dispatch = useDispatch();
  const today = new Date()
  const { closedDays, role } = useSelector(state => state.auth.logonUser)
  const dayOff = []
  closedDays.forEach((off) => {
    dayOff.push(off.date)
  })
  let date = (today.getFullYear()) + '-' + ('0' + (today.getMonth() + 1)).slice(-2)
    + '-' + ('0' + today.getDate()).slice(-2);

  const [dateState, setDateState] = useState(new Date())
  const [pickedDate, setPickedDate] = useState(date)

  const changeDate = (event) => {
    const date = (event.getFullYear()) + '-' + ('0' + (event.getMonth() + 1)).slice(-2)
      + '-' + ('0' + event.getDate()).slice(-2);

    setPickedDate(date)
    setDateState(event)
  }

  const changeDayOffHandler = () => {
    const closeday = {
      "closedDay": pickedDate
    }
    dispatch(closeDay(closeday))
      .then(() => {
        dispatch(loadMember(role))
      })
  }

  const cancelDayOffHandler = () => {
    let closedDayId = null
    closedDays.forEach((res) => {
      if (res.date === pickedDate) {
        closedDayId = res.closedDayId
      }
    })
    dispatch(deleteClosedDay(closedDayId))
      .then(() => {
        dispatch(loadMember(role))
      })
  }

  const titleContent = ({ activeStartDate, date, view }) => (
    (view === "month" && dayOff.includes(((date.getFullYear()) + '-' + ('0' + (date.getMonth() + 1)).slice(-2)
      + '-' + ('0' + date.getDate()).slice(-2)))) && <StyledDiv>휴무일</StyledDiv>
  )

  // const tileDisabled = ({ date, view }) =>
  // (view === "month" && dayOff.includes(((date.getFullYear()) + '-' + ('0' + (date.getMonth() + 1)).slice(-2)
  //   + '-' + ('0' + date.getDate()).slice(-2))))
  const filteredReservations = props.reservations.filter(res => {
    return res.reservationDate === pickedDate
  })

  let reservedDate = []
  let btn = ''
  props.reservations.forEach(res => {
    reservedDate.push(res.reservationDate)
  })

  if (dayOff.includes(pickedDate)) {
    btn = <Button
      onClick={cancelDayOffHandler}
      variant="outlined"
      startIcon={<ContentPaste />}>
      근무일 지정
    </Button>
  } else (
    btn = <Button
      onClick={changeDayOffHandler}
      variant="outlined"
      color="error"
      startIcon={<ContentPasteOff />}>
      휴무일 지정
    </Button>)
  if (reservedDate.includes(pickedDate)) {
    btn = <div>컨설팅 예약이 있습니다.</div>
  } else if (pickedDate < date) {
    btn = <div></div>
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={8}>
          <Calendar
            minDate={new Date(new Date().setMonth(new Date().getMonth() - 2))} //오늘 기준으로 2달전 까지만 선택 가능
            maxDate={new Date(new Date().setMonth(new Date().getMonth() + 2))} //오늘 기준으로 2달후 까지만 선택 가능
            value={dateState}
            onChange={changeDate}
            calendarType="Hebrew" //한 주를 일요일부터 시작
            formatDay={(locale, date) => // '일' 제외하고 숫자만 보이도록 설정
              moment(date).format("DD")}
            // tileDisabled={tileDisabled} // 특정 날짜를 선택 불가능
            tileContent={titleContent} // 타일에 html 컨텐츠 추가
            next2Label={null}
            prev2Label={null} // 연 단위 이동 버튼 숨김
          />
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}>
            <p>지금 선택한 날짜는 {pickedDate} 입니다.</p>
            {btn}
          </Stack>

        </Grid>
        <Grid item xs={12} sm={4}>
          <ConsultingResHistory reservation={filteredReservations} />
        </Grid>
      </Grid>
    </Box>
  )
}

const StyledDiv = styled('div')({
  backgroundColor: "#FFE0DF",
})
