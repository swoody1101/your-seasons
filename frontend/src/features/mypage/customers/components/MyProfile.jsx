import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

import { Stack, Grid, styled } from '@mui/material';

import MyAvatar from "common/avatar/MyAvatar";
import PinkButton from "common/PinkButton";
import { loadMember } from 'features/auth/authSlice'
import { myConsultantDxFetch } from "features/mypage/mypageSlice";


const MyProfile = () => {
  const results = useSelector(state => state.mypage.myConsultantDxData)
  const tone = results.length > 0 ? results[results.length - 1].tone : '';
  const { nickname, role, imageUrl } = useSelector(state => state.auth.logonUser)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(myConsultantDxFetch())
  }, [])

  const diagnosis = () => {
    if (tone === '') {
      return (<>
        <Link to="/consultants" variant="body2">진단받으러 가기</Link><br />
      </>)
    } else {
      return (<>
        <Diagnosis>마지막 컨설팅 결과: {tone}톤 입니다.</Diagnosis>
      </>)
    }
  }

  const handleModify = () => {
    navigate('/modify')
    dispatch(loadMember(role)).unwrap()
      .then((res) => {
      })
  }

  return (
    <Grid container sx={{ backgroundColor: "white", borderRadius: "10px" }}>
      {/* 이미지 */}
      <Grid item xs={12} sm={3} sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <MyAvatar setSize={16} imgUrl={imageUrl} />
      </Grid>
      {/* 프로필  TEXT */}
      <Grid item xs={12} sm={9}>
        <ProfileText>
          <h3>{nickname} 님</h3>
          <div>{diagnosis()}</div>
          {/* 내 정보 수정 */}
          <PinkButton
            isClick={handleModify}
            width="120"
            btnText="내정보수정"
          />
        </ProfileText>
      </Grid>
    </Grid>
  )
}
export default MyProfile;

PinkButton.defaultProps = {
  isClick: () => { },
  width: "",
  btnText: "",
}

const ProfileText = styled(Stack)({
  display: "flex",
  flexDirection: "column",
  paddingTop: "20px",
  paddingLeft: "20px",
  height: "180px",
  justifyContent: "space-evenly",
})

const Diagnosis = styled('div')({
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: "2",
  overflow: "hidden"
})
