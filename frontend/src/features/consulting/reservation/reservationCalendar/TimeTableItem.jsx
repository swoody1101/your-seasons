import React from 'react'
import {styled } from '@mui/material';

const TimeTableItem = (props) => {
  const time = props.time.slice(0, 2)
  if (time < 12) {
    return <StyledDiv> <Dot />{time}시 예약 가능 </StyledDiv>
  }
  return (
    <StyledDiv> <Dot />{time}시 예약 가능</StyledDiv>
  )
}

export default TimeTableItem

const StyledDiv = styled('div')({
  color: "black",
  fontSize: "0.7em",
})

const Dot = styled('span')({
  display: "inline-block",
  backgroundColor: "pink",
  borderRadius: "50%",
  width: "7px",
  height: "7px",
  margin: "0 5px 1px 0"
})
