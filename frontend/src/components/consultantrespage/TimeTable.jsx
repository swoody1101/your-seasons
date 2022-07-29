import React from 'react'
import TimeTableItem from './TimeTableItem'
import { styled } from '@mui/material';

const TimeTable = (props) => {
  if (props.timetable.length === 0) {
    return <StyledDiv>예약불가</StyledDiv>
  }
  return (
    <div>
      {props.timetable.map((res, idx) => (
        <TimeTableItem
          key={idx}
          time={res}
        />
      ))}
    </div>
  )
}

export default TimeTable

const StyledDiv = styled('div')({
  backgroundColor: "#FFE0DF",
  textAlign: "center",
  fontSize: "0.7em",
})