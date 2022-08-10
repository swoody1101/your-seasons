import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { useNavigate, Link } from 'react-router-dom';

import OtherAvatar from 'common/avatar/OtherAvatar'
import { CUSTOMER, CONSULTANT, BAD_REQUEST, NOT_FOUND, CONFLICT } from 'api/CustomConst'
import { Box, Button, Typography, styled, Stack, ButtonGroup } from '@mui/material'
import { getConsultantSessionName, openConsulting } from 'features/consulting/consultingRoom/consultSlice'

const JoinResList = () => {
  const { role } = useSelector(state => state.auth.logonUser)

  const { myResData, reservations } = useSelector(state => state.mypage)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleJoin = (reservationId) => {
    dispatch(getConsultantSessionName(reservationId))
      .then((res) => {
        navigate('/consult')
      })
      .catch((err) => {
        if (err.response.status === BAD_REQUEST) {
          alert('적절한 요청이 아닙니다.')
        } else if (err.response.status === NOT_FOUND) {
          alert('개설된 세션이 없습니다.')
        } else if (err.response.status === CONFLICT) {
          alert('이미 중복으로 접속된 세션입니다.')
        }
      })
  }

  const handleOpen = (reservationId) => {
    dispatch(openConsulting(reservationId))
      .then((res) => {
        navigate('/consult')
      })
      .catch((err) => {
        if (err.response.status === BAD_REQUEST) {
          alert('적절한 요청이 아닙니다.')
        } else if (err.response.status === NOT_FOUND) {
          alert('개설된 세션이 없습니다.')
        } else if (err.response.status === CONFLICT) {
          alert('이미 중복으로 접속된 세션입니다.')
        }
      })
  }

  const myResDataList = () => {
    const result = []
    for (let i = 0; i < myResData.length; i++) {
      result.push(
        <SButton key={i} onClick={() => handleJoin(myResData[i].reservationId)}>
          <OtherAvatar imgUrl={myResData[i].consultantImageUrl} setSize={6} />
          <Typography>{myResData[i].consultantNickname}</Typography>
          <SmallBox>
            <Typography variant="small">
              {myResData[i].reservationDate}
            </Typography>
            <Typography variant="small">
              {myResData[i].reservationTime}
            </Typography>
          </SmallBox>
        </SButton>
      )
    }
    return result
  }
  const reservationsList = () => {
    const result = []
    for (let i = 0; i < reservations.length; i++) {
      result.push(
        <SButton key={i} onClick={() => handleOpen(reservations[i].reservationId)}>
          <OtherAvatar imgUrl={reservations[i].imageUrl} setSize={6} />
          <Typography>{reservations[i].nickname}</Typography>
          <SmallBox>
            <Typography variant="small">
              {reservations[i].reservationDate}
            </Typography>
            <Typography variant="small">
              {reservations[i].reservationTime}
            </Typography>
          </SmallBox>
        </SButton>
      )
    }
    return result
  }


  return (
    <SBox>
      <Typography display='inline'>
        나의 예약 정보
      </Typography>

      {
        role === CUSTOMER
          ?
          <Stack>
            {myResDataList()}
          </Stack>
          :
          <Stack>
            {reservationsList()}
          </Stack>
      }
    </SBox>
  )
}

export default JoinResList

const SBox = styled(Box)({
  width: "100%",
  height: "100%",
  diplay: "flex",
  flexDirection: "column",
  justifyContent: "center",
})

const SmallBox = styled(Stack)({
  fontSize: "0.7rem",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
})

const SButton = styled(Button)({
  width: "100%",
  hegiht: "3rem",
  margin: "0.2rem 0",
  backgroundColor: "white",
  diplay: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  ":hover": {
    backgroundColor: "#ffffff30",
  }
})