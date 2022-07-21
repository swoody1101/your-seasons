import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  Avatar,
  Button,
  CssBaseline,
  FormControlLabel,
  Checkbox,
  Grid,
  Container,
} from '@mui/material'

import regex from '../input/regex';
import LockIcon from '@mui/icons-material/Lock'

import ValidationInput from '../input/ValidationInput'
import ComparePasswordInput from '../input/ConfirmPasswordInput'
import ConfirmValidationInput from '../input/ConfirmValidationInput'
import PhoneNumberInput from '../input/PhoneNumberInput'
import BirthSelectInput from '../input/BirthSelectInput'
import RoleSelectBox from '../input/RoleSelectBox'
import LicenseInput from '../input/LicenseInput'

import Policy from './Policy'

import { signUpMember } from './signUpSlice';


const SignUp = () => {
  const [userEmail, setUserEmail] = useState('');
  const [isEmailCheck, setIsEmailCheck] = useState(false);
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [isNicknameCheck, setIsNicknameCheck] = useState(false);

  const [name, setName] = useState('');

  const date = new Date();
  let today = (date.getFullYear()) + '-' + ('0' + (date.getMonth() + 1)).slice(-2)
    + '-' + ('0' + date.getDate()).slice(-2);
  let beforeTw = (date.getFullYear() - 20) + '-' + ('0' + (date.getMonth() + 1)).slice(-2)
    + '-' + ('0' + date.getDate()).slice(-2);
  const [birth, setBirth] = useState(beforeTw);

  const [phoneNumber, setPhoneNumber] = useState('010');

  const [role, setRole] = useState('member');

  const [licenseId, setLicenseId] = useState(1);
  const [licenseNumber, setLicenseNumber] = useState('');

  const [agreeChecked, setAgreeChcked] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const signUpStatus = useSelector(state => state.signup.status);

  // useEffect(() => {
  //   if (signUpStatus === 'succeeded') {
  //     alert("가입에 성공하였습니다.");
  //     navigate('/login');
  //   }
  //   if (signUpStatus === 'failed') {
  //     alert("가입에 실패하였습니다.");
  //   }
  // }, [signUpStatus, navigate])


  const userInfo = {
    email: userEmail,
    password: password,
    nickname: nickname,
    name: name,
    birth: birth,
    contact: phoneNumber,
    role: role,
    licenseId: licenseId,
    licenseNumber: licenseNumber
  }

  const handleCheckEmail = (e) => {
    alert("인증완료");
    setIsEmailCheck(true);

  }

  const handleSubmit = (data) => {
    if (!isEmailCheck) {
      alert("이메일 중복확인을 해주세요.")
      return;
    }
    if (!password || password !== rePassword) {
      alert("비밀번호를 확인해주세요.");
      return;
    }

    if (!isNicknameCheck) {
      alert("닉네임 중복확인을 해주세요.")
      return;
    }

    if (name.length < 2) {
      alert("이름을 확인해주세요.")
      return;
    }

    const rawPhone = phoneNumber.replace(/[-]/g, "");
    if (rawPhone.length < 10) {
      alert("전화번호를 확인해주세요.")
      return;
    }

    if (role === 'consultant' && licenseNumber.length < 1) {
      alert("자격증 번호를 입력하거나, 일반 사용자로 가입해주세요.");
      return;
    }

    if (!agreeChecked) {
      alert("회원가입 약관에 동의해주세요.");
      return;
    }
    console.log(data);
    dispatch(signUpMember(data))
      .then(() => {
        if (signUpStatus === 'succeeded') {
          alert("가입에 성공하였습니다.");
          navigate('/login');
        }
        if (signUpStatus === 'failed') {
          alert("가입에 실패하였습니다.");
        }
      });
  }

  return (
    <Container sx={{ xs: 'none', sm: 'block' }}>
      <Avatar
        sx={{
          m: "1rem auto", bgcolor: 'primary.main'
        }} ><LockIcon /></Avatar>
      <CssBaseline />
      <Grid container
        direction="column"
        justifyContent="center"
        alignItems="center">
        <Grid container item xs={12} sx={{}}>
          <Grid item xs={12} sm={6} p={1} >
            <ConfirmValidationInput
              autofocus
              label="이메일"
              id="email"
              value={userEmail}
              setValue={setUserEmail}
              isCheck={isEmailCheck}
              setIsCheck={setIsEmailCheck}
              handleValueCheck={handleCheckEmail}
              regexCheck={regex.email}
              defaultText="이메일을 입력해주세요."
              successText="success"
              errorText="이메일 양식을 맞춰주세요."
            />

            <ValidationInput
              label="패스워드"
              type="password"
              value={password}
              setValue={setPassword}
              regexCheck={regex.password}
              maxValue={20}
              defaultText="비밀번호를 입력해주세요."
              successText="success"
              errorText="소문자, 특수문자, 8~20글자 이상"
            />

            <ComparePasswordInput
              label="패스워드 재확인"
              type="password"
              value={rePassword}
              setValue={setRePassword}
              compareValue={password}
              maxValue={20}
              defaultText="비밀번호를 다시한번 입력해주세요."
              incorrectText="비밀번호가 일치하지 않습니다."
              successText="success"
              errorText="소문자, 특수문자, 8~20글자 이상"
            />

            <ConfirmValidationInput
              autofocus
              label="닉네임"
              value={nickname}
              setValue={setNickname}
              isCheck={isNicknameCheck}
              setIsCheck={setIsNicknameCheck}
              handleValueCheck={() => {
                alert("인증완료");
                setIsNicknameCheck(true);
              }}
              regexCheck={regex.nickname}
              defaultText="닉네임을 입력해주세요."
              successText="success"
              errorText="닉네임 양식을 맞춰주세요."
            />
          </Grid>
          <Grid item xs={12} sm={6} p={1}>
            <Grid container item sx={{ padding: '0' }}>
              <Grid item xs={6} >
                <ValidationInput
                  label="이름"
                  type="text"
                  value={name}
                  setValue={setName}
                  regexCheck={regex.name}
                  maxValue={5}
                  defaultText="이름을 입력해주세요."
                  successText="success"
                  errorText="완성된 문자로 입력해주세요."
                />
              </Grid>
              <Grid item xs={6} >
                <BirthSelectInput
                  label="생년월일"
                  type="date"
                  value={birth}
                  setValue={setBirth}
                  maxValue={today}
                  defaultText="생일을 선택해주세요."
                  successText="success"
                  errorText="올바른 생년월일을 선택해주세요."
                />
              </Grid>
            </Grid>
            <PhoneNumberInput
              label="전화번호"
              type="text"
              value={phoneNumber}
              setValue={setPhoneNumber}
              maxValue={13}
              regexCheck={regex.phone}
              defaultText="전화번호를 입력해주세요."
              successText="success"
              errorText="올바른 전화번호를 입력해주세요."
            />
            <RoleSelectBox
              label="사용자 유형"
              value={role}
              setValue={setRole}
            />
            {
              role === 'consultant'
              &&
              <LicenseInput
                label="자격증 정보"
                licenseId={licenseId}
                setLicenseId={setLicenseId}
                value={licenseNumber}
                setValue={setLicenseNumber}
              />
            }
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ alignItems: "center" }}>
          <Policy />
          <FormControlLabel
            control={
              <Checkbox value={agreeChecked}
                onChange={e => { setAgreeChcked(e.target.value) }} color="primary"
              />
            }
            label="회원가입 약관에 동의합니다."
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            onClick={() => { handleSubmit(userInfo) }}
            sx={{ mt: 3, mb: 2, minWidth: 400, maxWidth: 600 }}
            size="large"
          >
            회원가입
          </Button>
        </Grid>
      </Grid>
    </Container >
  )
}

export default SignUp
