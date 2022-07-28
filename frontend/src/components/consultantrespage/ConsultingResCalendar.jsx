import React, { useState } from 'react'
import ConsultingResBtn from './ConsultingResBtn';
import Calendar from 'react-calendar'
import './ConsultingResCalendar.css';
import moment from 'moment';
import { Stack, Box, styled, Grid } from '@mui/material';



const ConsultingResCalendar = (props) => {
  const today = new Date()

  let date = (today.getFullYear()) + '-' + ('0' + (today.getMonth() + 1)).slice(-2)
    + '-' + ('0' + today.getDate()).slice(-2);

  const [dateState, setDateState] = useState(new Date())
  const [pickedDate, setPickedDate] = useState(date)
  const [dayOff, setDayOff] = useState(['2022-08-01', '2022-08-02', '2022-08-06'])

  const changeDate = (event) => {
    const date = (event.getFullYear()) + '-' + ('0' + (event.getMonth() + 1)).slice(-2)
      + '-' + ('0' + event.getDate()).slice(-2);

    setPickedDate(date)
    setDateState(event)
  }

  const titleContent = ({ activeStartDate, date, view }) => (
    (view === "month" && dayOff.includes(((date.getFullYear()) + '-' + ('0' + (date.getMonth() + 1)).slice(-2)
      + '-' + ('0' + date.getDate()).slice(-2)))) && <StyledDiv>예약불가</StyledDiv>
  )

  const tileDisabled = ({ date, view }) =>
  (view === "month" && dayOff.includes(((date.getFullYear()) + '-' + ('0' + (date.getMonth() + 1)).slice(-2)
    + '-' + ('0' + date.getDate()).slice(-2))))

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
          <Stack sx={{ mt: 1, fontSize: 16 }} alignItems="center">
            <p>선택하신 날짜는 {pickedDate} 입니다.</p>
          </Stack>

        </Grid>
        <Grid item xs={12} sm={4}>
          <ConsultingResBtn />
        </Grid>
      </Grid>
    </Box >
  )
}

const StyledDiv = styled('div')({
  backgroundColor: "#FFE0DF",
})
