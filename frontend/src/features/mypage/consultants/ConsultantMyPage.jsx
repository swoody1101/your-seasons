import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router'

import ConsultantProfile from "./components/ConsultantProfile";
import Container from '@mui/material/Container';
import ConsultantMyPageTab from "./mypageTab/ConsultantMypageTab";
import { consultingResFetch } from '../mypageSlice';
import { getToken } from "api/JWToken";

const ConsultantMyPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();

  useEffect(() => {
    const token =  getToken()
    if (token){
      dispatch(consultingResFetch())
    }else{
      alert('로그인 후 접근해 주세요');
      navigate('/login')
    }
  }, [])

  useEffect(() => {
    dispatch(consultingResFetch())
  }, [dispatch])

  return (<>
    <Container fixed sx={{ mt: '2rem' }}>
      <ConsultantProfile />
      <br />
      <ConsultantMyPageTab />
    </Container>
</>)
}

export default ConsultantMyPage