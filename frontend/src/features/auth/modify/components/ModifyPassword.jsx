import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Grid, Button, ButtonGroup, Container } from '@mui/material'

import ValidationInput from 'features/auth/components/ValidationInput'
import ComparePasswordInput from 'features/auth/components/ConfirmPasswordInput'

import regex from 'features/auth/components/regex';
import { BAD_REQUEST, NOT_FOUND, CONFLICT } from 'api/CustomConst'

import { modifyPass } from 'features/auth/authSlice'

const ModifyPassword = () => {

  const [beforePassword, setBeforePassword] = useState('');
  const [afterPassword, setAfterPassword] = useState('');
  const [rePassword, setRePassword] = useState('');

  const { role } = useSelector((state) => state.auth.logonUser)

  const dispatch = useDispatch();

  const handleModiPass = () => {
    if (beforePassword.length === 0) {
      alert('기존 비밀번호를 입력해주세요.')
      return;
    }
    if (beforePassword === afterPassword) {
      alert("동일한 비밀번호로 변경하실 수 없습니다.");
      return;
    }

    if (!afterPassword
      || afterPassword !== rePassword
      || !regex.password.test(afterPassword)) {
      alert("비밀번호를 확인해주세요.");
      return;
    }
    dispatch(modifyPass({ role, beforePassword, afterPassword }))
      .unwrap()
      .then(() => {
        alert("수정이 완료되었습니다.")
        setBeforePassword('');
        setAfterPassword('');
        setRePassword('');
      })
      .catch((err) => {
        if (err.status === BAD_REQUEST) {
          alert('적절한 요청이 아닙니다.')
        } else if (err.status === NOT_FOUND) {
          alert('찾을 수 없는 이용자입니다.')
        } else if (err.status === CONFLICT) {
          alert('수정이 거절되었습니다.')
        }
      })
  }

  return (
    <Container>
      <Grid>
        <ValidationInput
          label="기존 패스워드"
          type="password"
          value={beforePassword}
          setValue={setBeforePassword}
          regexCheck={regex.password}
          maxValue={20}
          defaultText="기존 비밀번호를 입력해주세요."
          successText="success"
          errorText="소문자, 특수문자, 8~20글자 이상"
        />

        <ValidationInput
          label="수정할 패스워드"
          type="password"
          value={afterPassword}
          setValue={setAfterPassword}
          regexCheck={regex.password}
          maxValue={20}
          defaultText="변경하실 비밀번호를 입력해주세요."
          successText="success"
          errorText="소문자, 특수문자, 8~20글자 이상"
        />

        <ComparePasswordInput
          label="패스워드 재확인"
          type="password"
          value={rePassword}
          setValue={setRePassword}
          compareValue={afterPassword}
          maxValue={20}
          defaultText="비밀번호를 다시한번 입력해주세요."
          incorrectText="비밀번호가 일치하지 않습니다."
          successText="success"
          errorText="소문자, 특수문자, 8~20글자 이상"
        />

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
              setBeforePassword('');
              setAfterPassword('');
              setRePassword('');
            }}
          >취소</Button>
          <Button
            color='error'
            onClick={handleModiPass}
          >확인</Button>
        </ButtonGroup>
      </Grid>
    </Container>
  )
}

export default ModifyPassword