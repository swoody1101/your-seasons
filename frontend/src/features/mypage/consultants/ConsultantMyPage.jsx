import React, { useEffect } from "react";
import { useDispatch } from 'react-redux';

import ConsultantProfile from "./components/ConsultantProfile";
import Container from '@mui/material/Container';
import ConsultantMyPageTab from "./mypageTab/ConsultantMypageTab";

import { consultingResFetch } from '../mypageSlice';

const ConsultantMyPage = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(consultingResFetch())
  }, [])

  useEffect(() => {
    dispatch(consultingResFetch())
  }, [dispatch])

  return (
    <Container fixed sx={{ mt: '2rem' }}>
      <ConsultantProfile />
      <br />
      <ConsultantMyPageTab />
    </Container>
  )
}

export default ConsultantMyPage