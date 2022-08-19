import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  Button, CssBaseline,
  FormControlLabel, Checkbox,
  Grid, Container, styled,
} from '@mui/material'

import regex from '../components/regex';

import ValidationInput from '../components/ValidationInput'
import ComparePasswordInput from '../components/ConfirmPasswordInput'
import ConfirmValidationInput from '../components/ConfirmValidationInput'
import PhoneNumberInput from '../components/PhoneNumberInput'
import BirthSelectInput from '../components/BirthSelectInput'
import RoleSelectBox from '../components/RoleSelectBox'
import LicenseInput from '../components/LicenseInput'
import EmailAuthentication from '../components/EmailAuthentication'

import Policy from './Policy'
import { CONSULTANT, CUSTOMER, OK } from 'api/CustomConst'
import { nicknameCheck, emailCheck, signUpMember, emailSendCheck, emailAuthCheck, logoutUser } from 'features/auth/authSlice';


const SignUp = () => {
  const [userEmail, setUserEmail] = useState('');
  const [isEmailCheck, setIsEmailCheck] = useState(false);
  // 인증번호 발송 여부
  const [isEmailSend, setIsEmailSend] = useState(false);
  // emailauth입력
  const [emailAuth, setEmailAuth] = useState('');
  // emailauth true false여부
  const [isEmailAuthCheck, setIsEmailAuthCheck] = useState(false);

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

  const [role, setRole] = useState(CUSTOMER);

  const [licenseName, setLicenseName] = useState("컬러리스트기사");
  const [licenseNumber, setLicenseNumber] = useState('');

  const [agreeChecked, setAgreeChcked] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const signUpStatus = useSelector(state => state.auth.status);

  const userInfo = {
    email: userEmail,
    password: password,
    nickname: nickname,
    name: name,
    birth: birth,
    contact: phoneNumber,
    role: role,
    licenseName: licenseName,
    licenseNumber: licenseNumber,
  }

  const handleCheckEmail = () => {
    dispatch(emailCheck(userEmail))
      .then((res) => {
        if (res.payload) {
          alert("인증완료");
          setIsEmailCheck(true);
        } else {
          alert("이미 존재하는 이메일입니다.");
        }
      })
  }

  // 이메일 발송 완료
  const handleSendEmail = () => {
    dispatch(emailSendCheck(userEmail))
      .then((res) => {
        if (res.payload) {
          alert('인증번호가 전송되었습니다. 이메일을 확인해주세요.')
          setIsEmailSend(true)
        } else {
          alert('이메일 전송에 실패하였습니다.')
          setIsEmailSend(false)
        }
      })
  }
  // 발송된 토큰 체크
  const handleCheckEmailAuth = () => {
    const data = {
      email: userEmail,
      authToken: emailAuth,
    }
    dispatch(emailAuthCheck(data))
      .then((res) => {
        if (res.payload) {
          alert('이메일 인증이 완료되었습니다.')
          setIsEmailAuthCheck(true)
          return true
        } else {
          alert('이메일 인증에 실패하였습니다.')
          setIsEmailAuthCheck(false)
          setEmailAuth('')
          return false
        }
      })
  }


  const handleCheckNickname = () => {
    dispatch(nicknameCheck(nickname))
      .then((res) => {
        if (res.payload) {
          alert("인증완료");
          setIsNicknameCheck(true);
        } else {
          alert("이미 존재하는 닉네임입니다.");
        }
      })
  }

  const handleSubmit = (data) => {
    // email : 중복확인 후 글을 수정하면 해제됨
    if (!isEmailCheck) {
      alert("이메일 중복확인을 해주세요.")
      return;
    }

    // emailauthentication: 이메일 인증여부 
    if (!isEmailAuthCheck) {
      alert("이메일 인증을 해주세요.")
      return;
    }

    // password : success 이후에 사용할 수 없는 문자 1개를 추가해도 로직이 넘어가 마지막에 한번더 체크
    if (!password
      || password !== rePassword
      || !regex.password.test(password)) {
      alert("비밀번호를 확인해주세요.");
      return;
    }


    // nickname : 닉네임 중복확인 후 내용이 변경되면 중복확인이 해제됨
    if (!isNicknameCheck) {
      alert("닉네임 중복확인을 해주세요.")
      return;
    }

    // name : 글자수, 한글사용제외 제한 없음
    if (name.length < 2
      || !regex.name.test(name)) {
      alert("이름을 확인해주세요.")
      return;
    }

    // contact
    const rawPhone = phoneNumber.replace(/[-]/g, "");
    if (rawPhone.length < 10
      || !regex.phone.test(phoneNumber)) {
      alert("전화번호를 확인해주세요.")
      return;
    }

    // role license
    if (role === CONSULTANT && licenseNumber.length < 1) {
      alert("자격증 번호를 입력하거나, 일반 사용자로 가입해주세요.");
      return;
    }

    if (!agreeChecked) {
      alert("회원가입 약관에 동의해주세요.");
      return;
    }
    dispatch(signUpMember(data))
      .then((res) => {
        if (res.payload === OK) {
          alert("가입에 성공하였습니다. 로그인 페이지로 이동합니다.");
          // 로그인상태에서 회원가입으로 이동가능하나, 회원가입시 기존토큰 지워짐
          dispatch(logoutUser());
          navigate('/login');
        } else {
          alert("가입에 실패하였습니다.");
        }
      });
  }

  return (
    <Container sx={{ xs: 'none', sm: 'block', height: '100vh' }}>
      <CssBaseline />
      <SGrid container
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

            <EmailAuthentication
              label="이메일 인증번호 입력"
              id="emailauth"
              // email 중복확인 여부
              isTrueEmail={isEmailCheck}
              // 인증번호 발송 여부
              handleSendCheck={handleSendEmail}
              isSend={isEmailSend}
              setIsSend={setIsEmailSend}
              // value, setvalue
              value={emailAuth}
              setValue={setEmailAuth}
              // emailcheck, setemailcheck 이메일 인증번호 여부
              isEmailAuthCheck={isEmailAuthCheck}
              setIsEmailAuthCheck={setIsEmailAuthCheck}
              // 이메일 인증번호 체크
              handleValueCheck={handleCheckEmailAuth}
              defaultText="인증번호를 입력해주세요."
              successText="success"
              errorText="인증번호가 일치하지 않습니다."
            />

            <ValidationInput
              label="패스워드"
              type="password"
              value={password}
              setValue={setPassword}
              regexCheck={regex.password}
              maxValue={20}
              defaultText="비밀번호를 입력해주세요. 영문, 숫자, 특수문자를 포함합니다."
              successText="success"
              errorText="영문, 숫자, 특수문자 필수 8~20글자"
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
              errorText="영문, 숫자, 특수문자 필수 8~20글자"
            />

          </Grid>
          <Grid item xs={12} sm={6} p={1}>
            <ConfirmValidationInput
              autofocus
              label="닉네임"
              value={nickname}
              setValue={setNickname}
              isCheck={isNicknameCheck}
              setIsCheck={setIsNicknameCheck}
              handleValueCheck={handleCheckNickname}
              regexCheck={regex.nickname}
              defaultText="닉네임을 입력해주세요."
              successText="success"
              errorText="닉네임 양식을 맞춰주세요."
            />
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
              role === CONSULTANT
              &&
              <LicenseInput
                label="자격증 정보"
                licenseName={licenseName}
                setLicenseName={setLicenseName}
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
                onChange={() => {
                  setAgreeChcked(!agreeChecked)
                }} color="primary"
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
      </SGrid>
    </Container >
  )
}

export default SignUp

const SGrid = styled(Grid)({
  backgroundColor: "#F1F1F190",
  padding: '2rem',
  borderRadius: '1rem',
})