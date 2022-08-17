import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import ConsultingResHistory from './ConsultingResHistory';
import Calendar from 'react-calendar'
import moment from 'moment';
import { Button, Stack, Box, styled, Grid } from '@mui/material';
import { ContentPasteOff, ContentPaste } from '@mui/icons-material';
import { closeDay, deleteClosedDay } from 'features/mypage/mypageSlice';
import { loadMember } from 'features/auth/authSlice';
import { isEmpty } from 'lodash';

export default function ConsultingResCalendar(props) {
  const dispatch = useDispatch();
  const today = new Date()
  const { closedDays, role } = useSelector(state => state.auth.logonUser)
  const dayOff = []

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

  const titleContent = ({ activeStartDate, date, view }) => {
    let resTimeTable = []
    const newdate = ((date.getFullYear()) + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2))
    if (view === "month" && dayOff.includes(newdate)) {
      return <PinkdDiv>휴무일</PinkdDiv>
    }
    // if문 변경

    if (!isEmpty(props.reservations)) {
      props.reservations.forEach(res => {
        resTimeTable.push(res.reservationDate)
      })
    } else {
      return
    }

    if (view === "month" && resTimeTable.includes(newdate)) {
      return <BlueDiv>예약 확인</BlueDiv>
    }
  }

  // const tileDisabled = ({ date, view }) =>
  // (view === "month" && dayOff.includes(((date.getFullYear()) + '-' + ('0' + (date.getMonth() + 1)).slice(-2)
  //   + '-' + ('0' + date.getDate()).slice(-2))))



  // if문이라 아래에서 실행해줌. 기존코드 if문 X ==> if문으로 변경 및 함수실행으로 바꿈
  // 변경코드 1
  let filteredReservation = []
  const filteredReservations = () => {
    if (!isEmpty(props.reservations)) {
      filteredReservation = props.reservations.filter(res => {
        return res.reservationDate === pickedDate
      })
    } else {
      return
    }
  }
  filteredReservations()
  // 변경코드 2
  let reservedDate = []
  let btn = ''
  const resdate = () => {
    if (!isEmpty(props.reservations)) {
      props.reservations.forEach(res => {
        reservedDate.push(res.reservationDate)
      })
    } else {
      return
    }
  }
  resdate()
  // 변경코드 3
  const closeday = () => {
    if (!isEmpty(closedDays)) {
      closedDays.forEach((off) => {
        dayOff.push(off.date)
      })
    } else {
      return
    }
  }
  closeday()

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
          <ConsultingResHistory reservation={filteredReservation} />
        </Grid>
      </Grid>
    </Box>
  )
}

const PinkdDiv = styled('div')({
  backgroundColor: "#FFE0DF",
})

const BlueDiv = styled('div')({
  backgroundColor: "#B2EAFF",
})