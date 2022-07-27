import React from 'react'
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { Box, Button, ImageList, Avatar, styled } from '@mui/material'

import { BAD_REQUEST, NOT_FOUND, CONFLICT, CONSULTANT } from '../../api/CustomConst'
import { modifyLogonUser } from '../login/loginSlice';
import { modalOff, modifyMember, loadMember } from './modifySlice';

const Sample = () => {
  const { role } = useSelector(state => state.login.logonUser)
  const common = useSelector(state => state.modify.common)

  const dispatch = useDispatch();

  // 모달 종료
  const handleSample = () => {
    dispatch(modalOff())
  }

  const handleAvatar = (e) => {
    console.log("선택한 이미지 주소값", e.target.src)
    let url = (e.target.src).slice(-28)
    console.log("수정할 이미지 url", url)
    const data = {
      role: role,
      nickname: common.nickname,
      contact: common.contact,
      imageUrl: url,
      introduction: common.introduction,
      cost: common.cost
    }
    dispatch(modifyMember(data))
      .then(() => {
        dispatch(loadMember(role))
        alert("수정이 완료되었습니다.")
        const modi = {
          nickname: common.nickname,
          role: role,
          imageUrl: common.imageUrl
        }
        dispatch(modifyLogonUser(modi))
        dispatch(modalOff())
        console.log("수정후 재로드 요청", modi)
      })
      .catch((err) => {
        if (err.status === BAD_REQUEST) {
          alert('적절한 요청이 아닙니다.')
        } else if (err.status === NOT_FOUND) {
          alert('없는 아이디 이거나 잘못된 정보입니다.')
        } else if (err.status === CONFLICT) {
          alert('거절된 수정내용입니다.')
        }
      })
  }

  const sampleRendering = () => {
    const result = [];
    for (let i = 1; i <= 32; i++) {
      let url = '/images/default/avatar'
        + ('0' + i).slice(-2) + '.png'
      result.push(
        <SetAvatar si={12} key={i}>
          <Button onClick={handleAvatar}>
            <img src={url} alt='MyAvatar' />
          </Button>
        </SetAvatar>
      )
    }
    return result;
  }
  return (
    <CoveredModal>
      <SampleBox>
        {sampleRendering()}
      </SampleBox>
      <StyledButton
        onClick={handleSample}
      >닫기</StyledButton>
    </CoveredModal >
  )
}

export default Sample

const CoveredModal = styled(Box)({
  position: 'absolute',
  top: "0",
  left: "0",
  width: "100vw",
  height: "100vh",
  backgroundColor: '#00000099',
  zIndex: '1101',
  display: "flex",
  flexDirection: "row",
  justifyContent: "center"
})

const SampleBox = styled(Box)({
  padding: "20vh",
  width: "100vw",
  height: "100vh",
  backgroundColor: '#00000090',
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  overflow: 'auto',
  zIndex: '1101',
})

const SetAvatar = styled(Avatar)((props) => ({
  backgroundColor: "skyblue",
  width: `${props.si * 10}px`,
  height: `${props.si * 10}px`,
  img: {
    backgroundColor: 'white',
    borderRadius: "100%",
    width: `${props.si * 9}px`,
    height: `${props.si * 9}px`,
  },
  zIndex: '1110'
}))

const StyledButton = styled(Button)({
  position: 'absolute',
  fontSize: '1.2rem',
  bottom: "2rem",
  right: "2rem",
  backgroundColor: '#00000090',
  color: 'whitesmoke',
  zIndex: '1120'
})
