import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Button, ButtonGroup, Container, Grid, styled } from '@mui/material'

import regex from '../../components/regex';
import { BAD_REQUEST, NOT_FOUND, CONFLICT, CONSULTANT } from 'api/CustomConst'
import ConfirmValidation from 'features/auth/components/ConfirmValidationInput'
import PhoneNumberInput from 'features/auth/components/PhoneNumberInput';
import { nicknameCheck } from 'features/auth/authSlice';
import { modifyMember, loadMember } from 'features/auth/authSlice'

const ModifyCommon = () => {
  const { name, nickname, birth, contact, email, imageUrl } = useSelector((state) => state.auth.logonUser)
  const { introduction, cost, licenseName, licenseNumber } = useSelector((state) => state.auth.logonUser)

  const { role } = useSelector((state) => state.auth.logonUser)

  const [newNick, setNewNick] = useState('');
  const [isNickCheck, setIsNickCheck] = useState(false);
  const [newPhone, setNewPhone] = useState('');

  const [isModiNick, setIsModiNick] = useState(false);
  const [isModiPhone, setIsModiPhone] = useState(false);

  const dispatch = useDispatch();

  const handleCheckNickname = () => {
    dispatch(nicknameCheck(newNick))
      .then((res) => {
        if (res.payload) {
          alert("인증완료");
          setIsNickCheck(true);
        } else {
          alert("이미 존재하는 닉네임입니다.");
        }
      })
  }

  const handleModify = () => {
    if (newNick.length > 0 && !isNickCheck) {
      alert('닉네임을 변경하시려면 중복확인을 해주세요.')
      return;
    }
    const nick = newNick ? newNick : nickname;
    const phone = newPhone ? newPhone : contact;

    const modiData = {
      role: role,
      nickname: nick,
      contact: phone,
      introduction: introduction,
      imageUrl: imageUrl,
      cost: cost
    } // client와 consultant 똑같이 수행, slice에서 한번더 정제함
    dispatch(modifyMember(modiData))
      .unwrap()
      .then((res) => {
        alert("수정이 완료되었습니다.")
        dispatch(loadMember(role))
        setNewNick('');
        setIsNickCheck(false);
        setNewPhone('');
        setIsModiNick(false);
        setIsModiPhone(false);
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

  return (
    <>
      <Container>
        <h1>프로필 정보</h1>
        <Grid container m={2} gap={3} >
          <Grid container>
            <LabelGrid item xs={3}>
              <h2>이름</h2>
            </LabelGrid>
            <Grid item xs={8}>
              <h2>{name}</h2>
            </Grid>
          </Grid>
          <Grid container>
            <LabelGrid item xs={3}>
              <h2>닉네임</h2>
            </LabelGrid>
            <Grid item xs={8}>
              {
                isModiNick ?
                  <ConfirmValidation
                    value={newNick}
                    setValue={setNewNick}
                    isCheck={isNickCheck}
                    setIsCheck={setIsNickCheck}
                    handleValueCheck={handleCheckNickname}
                    regexCheck={regex.nickname}
                    defaultText="닉네임을 입력해주세요."
                    successText="success"
                    errorText="닉네임 양식을 맞춰주세요."
                  />
                  :
                  <h2>
                    {nickname}
                    <Button
                      sx={{ p: 0, ml: 1 }}
                      onClick={
                        () => setIsModiNick(true)
                      }>닉네임 수정</Button>
                  </h2>
              }

            </Grid>
          </Grid>
          <Grid container>
            <LabelGrid item xs={3}>
              <h2>생년월일</h2>
            </LabelGrid>
            <Grid item xs={8}>
              <h2>{birth}</h2>
            </Grid>
          </Grid>
          <Grid container>
            <LabelGrid item xs={3}>
              <h2>전화번호</h2>
            </LabelGrid>
            <Grid item xs={8}>
              {
                isModiPhone ?
                  <PhoneNumberInput
                    type="text"
                    value={newPhone}
                    setValue={setNewPhone}
                    maxValue={13}
                    regexCheck={regex.phone}
                    defaultText="전화번호를 입력해주세요."
                    successText="success"
                    errorText="올바른 전화번호를 입력해주세요."
                  />
                  :
                  <h2>
                    {contact}
                    <Button
                      sx={{ p: 0, ml: 1 }}
                      onClick={
                        () => setIsModiPhone(true)
                      }>전화번호 수정</Button>
                  </h2>
              }

            </Grid>
          </Grid>
          <Grid container>
            <LabelGrid item xs={3}>
              <h2>이메일</h2>
            </LabelGrid>
            <Grid item xs={8}>
              <h2>{email}</h2>
            </Grid>
          </Grid>
        </Grid>
        {
          (isModiNick || isModiPhone)
          &&
          <ButtonGroup
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "end"
            }}
          >
            <Button
              color='error'
              onClick={() => {
                setNewNick('');
                setIsNickCheck(false);
                setNewPhone('');
                setIsModiNick(false);
                setIsModiPhone(false);
              }}
            >취소</Button>
            <Button
              onClick={handleModify}
              color='error'
            >확인</Button>
          </ButtonGroup>
        }
      </Container>
      {
        role === CONSULTANT
        &&
        <Container sx={{ marginTop: "3rem" }}>
          <h1>자격증 정보</h1>
          <Grid container m={2} gap={3} >
            <Grid container>
              <LabelGrid item xs={3}>
                <h2>자격증</h2>
              </LabelGrid>
              <Grid item xs={8}>
                <h2>{licenseName}</h2>
              </Grid>
            </Grid>
            <Grid container>
              <LabelGrid item xs={3}>
                <h2>자격번호</h2>
              </LabelGrid>
              <Grid item xs={8}>
                <h3>{licenseNumber}</h3>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      }
    </>
  )
}

export default ModifyCommon

const LabelGrid = styled(Grid)({
  textAlign: 'end',
  marginRight: '1rem'
})