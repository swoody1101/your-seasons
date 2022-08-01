import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

import { Stack, Button, Grid, styled } from '@mui/material';

import DefaultImg from 'assets/images/default/avatar01.png';
import MyAvatar from "common/avatar/MyAvatar";

import { loadMember } from 'features/auth/modifySlice'
import { getToken } from 'api/JWToken';
import axios from 'axios';
// import { useParams } from "react-router";

const MyProfile = () => {
  // const [nickname, setNickname] = useState('치당');
  const [lastDiagnosis, setlastDiagnosis] = useState('');
  const [userImg, setUserImg] = useState('')
  // const userId = useParams().customerId;
  // nickname도 selector로 부를 수 있습니다.
  const { nickname, role, imageUrl } = useSelector(state => state.login.logonUser)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // axios test 안함.
  // useEffect(() => {
  //   axios({
  //     // userID 가져오는 방식 ??
  //     // url: `/customers/${userId}`,
  //     method: "get",
  //     headers: {
  //       // Authorization: `Token ${logonUser}` // 임시 주석
  //     }
  //   })
  //     .then((response) => response.data)
  //     .then((user) => {
  //       setNickname(user.nickname)
  //       // 
  //       setlastDiagnosis(user.lastTestResult)
  //       setUserImg(user.image)
  //     });
  // }, [])
  const diagnosis = () => {
    if (lastDiagnosis === null || lastDiagnosis === undefined || lastDiagnosis === '') {
      return <>
        <Link to="/consultants" variant="body2">진단하러 가기</Link></>
    } else {
      return <>
        <Diagnosis>{lastDiagnosis}</Diagnosis></>
    }
  }
  const handleModify = () => {
    navigate('/modify')
    dispatch(loadMember(role)).unwrap()
      .then((res) => {
        // console.log(res)
      })
  }
  return (
    <Grid container>
      {/* 이미지 */}
      <Grid item xs={12} sm={3} sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <MyAvatar setSize={16} />
      </Grid>
      {/* 프로필  TEXT */}
      <Grid item xs={12} sm={9}>
        <ProfileText>
          <h3>{nickname} 님</h3>
          <div>{diagnosis()}</div>
          {/* 내 정보 수정 링크 추가 해야함 */}
          <Stack spacing={2} direction="row">
            <Button variant="contained"
              onClick={handleModify}
            >
              내 정보 수정
            </Button>
          </Stack>
        </ProfileText>
      </Grid>
    </Grid>
  )
}
export default MyProfile;

const ProfileImg = styled('img')({
  width: "140px",
  height: "140px",
  borderRadius: "50%",
})

const ProfileText = styled('div')({
  display: "flex",
  flexDirection: "column",
  paddingTop: "20px",
  paddingLeft: "20px",
  height: "200px",
  lineHeight: "250%",
})

const Diagnosis = styled('div')({
  display: "-webkit-box",
  "-webkit-box-orient": "vertical",
  "-webkit-line-clamp": "2",
  overflow: "hidden"
})