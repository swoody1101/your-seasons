import React, { useState } from "react";
import { Button, TextField, styled } from "@mui/material";

export default function EmailAuthentication({
  label,
  // email 중복확인 여부
  isTrueEmail,
  // 인증번호 발송 여부
  handleSendCheck,
  isSend,
  //value, setvalue
  value,
  setValue,
  // 이메일 인증번호 체크
  isEmailAuthCheck,
  setIsEmailAuthCheck,
  handleValueCheck,
  defaultText,
  successText,
}) {
  const [isError, setIsError] = useState(true);
  const [helperText, setHelperText] = useState(defaultText);

  const HandleOnChange = (e) => {
    setValue(e.target.value);
    setIsEmailAuthCheck(false)
    setIsError(false)
    setHelperText(successText)

    if (e.target.value === "") {
      setIsError(true);
      setHelperText(defaultText)
    }

  };

  const handleCheck = () => {
    handleSendCheck();
  };

  const handleCheckAuth = () => {
    handleValueCheck();
  }


  return (
    <Container>
      <Label>{label}</Label>
      <Input
        error={isError}
        id={label}
        helperText={helperText}
        variant="standard"
        onChange={HandleOnChange}
        value={value}
        // false면 인증아직안한상태 라서 disable false
        disabled={isEmailAuthCheck ? true : false}
      />
      {/* 이메일 보낸 상태 여부에 따름 */}
      {!isSend ? (
        // 이메일 안보낸 상태
        <CheckBnt 
          disabled={!isTrueEmail ? true : false}
          label={label} 
          onClick={handleCheck}
          >
          이메일 인증요청</CheckBnt>
      ) : (
        // 이메일인증 보낸상태
        <CheckSuccessBnt
          label={label}
          // isEmailAuthCheck===true => 버튼 사용 불가(인증완료)
          disabled={isEmailAuthCheck ? true : false}
          onClick={handleCheckAuth}>
          인증 확인
        </CheckSuccessBnt>
      )}
    </Container>
  );
}

EmailAuthentication.defaultProps = {
  type: "text",
  label: "",
  value: "",
  setValue: () => { },
  isEmailAuthCheck: false,
  setIsEmailAuthCheck: () => { },
  handleValueCheck: () => { }
};

const Container = styled('div')({
  position: "relative"
})

const Label = styled('span')({
  color: "#878787",
  fontSize: "1.2rem"
})

const Input = styled(TextField)({
  width: "100%",
  input: {
    width: "calc(100% - 110px)"
  }
})

const CheckBnt = styled(Button)`
  display: flex;
  align-items: center;
  position: absolute;
  width: 9rem;
  height: ${props => (props.label === '' ? '1.8rem' : '2rem')};
  right: 0;
  top: ${props => (props.label === '' ? '0' : '1rem')};
  border: ${(isTrueEmail) => (isTrueEmail ? "1px solid #ff7775;" : "1px solid #ff7775")};
  color: ${(isTrueEmail) => (isTrueEmail ? "#3C3C3C" : "#ff7775")};
  font-size: 1rem;
  border-radius: 2rem;
`;


// isEmailAuthCheck가 false면 빨간버튼, true면 파란버튼
const CheckSuccessBnt = styled(Button)`
  position: absolute;
  width: 6rem;
  height: ${props => (props.label === '' ? '1.8rem' : '2rem')};
  right: 0;
  top: ${props => (props.label === '' ? '0' : '1rem')};
  border: ${(isEmailAuthCheck) => (isEmailAuthCheck ? "1px solid #6b95ff;" : "1px solid #ff7775")};
  color: ${(isEmailAuthCheck) => (isEmailAuthCheck ? "#3C3C3C" : "#ff7775")};
  font-size: 1rem;
  border-radius: 2rem;
`;

