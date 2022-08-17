import React, { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router'
import ConsultantProfile from "./components/ConsultantProfile";
import ConsultantMyPageTab from "./mypageTab/ConsultantMypageTab";
import { consultingResFetch } from '../mypageSlice';
import { getToken } from "api/JWToken";
import { Container, styled } from '@mui/material'
import adbed2 from 'assets/images/ADBED2.jpg'

const ConsultantMyPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken()
    if (token) {
      dispatch(consultingResFetch())
    } else {
      alert('로그인 후 접근해 주세요');
      navigate('/login')
    }
  }, [])

  useEffect(() => {
    dispatch(consultingResFetch())
  }, [dispatch])

  return (
    <>
      <Img src={adbed2}>
      </Img>
      <Container>
        <CContainer fixed sx={{ mt: '2rem' }}>
          <ConsultantProfile />
          <br />
          <ConsultantMyPageTab />
        </CContainer>
      </Container>
    </>)
}

export default ConsultantMyPage

const Img = styled('img')({
	position: "absolute",
  marginTop: "-70px",
	minWidth: "940px",
	minHeight: "22px",
	height: "290px",
	width: "100vw",
})

const CContainer = styled(Container)({
  position: "relative",
  top: '16px'
})
