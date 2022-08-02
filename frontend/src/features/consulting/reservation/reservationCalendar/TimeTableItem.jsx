import React from 'react'
import { Button, Stack, Box, styled } from '@mui/material';

const TimeTableItem = (props) => {
  const time = props.time.slice(0, 2)
  if (time < 12) {
    return <StyledDiv>오전 {time}시 예약 가능 </StyledDiv>
  }
  return (
    <StyledDiv>오후 {time}시 예약 가능</StyledDiv>
  )
}

export default TimeTableItem

const StyledDiv = styled('div')({
  color: "blue",
  fontSize: "0.7em",
})
