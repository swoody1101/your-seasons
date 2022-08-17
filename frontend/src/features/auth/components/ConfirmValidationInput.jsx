import React, { useState } from "react";
import { Button, TextField, styled } from "@mui/material";

//handleValueCheck는 중복확인을 할 수 있는 api함수를 담아주면 됩니다.
//isCheck는 부모로부터 중복확인 여부 state 값을 받아온다.
//setIsCheck는 부모로부터 중복확인 여부 state를 변경시킬 수 있는 함수를 받아온다.
export default function ConfirmValidationInput({
  label,
  type,
  value,
  maxValue,
  setValue,
  regexCheck,
  successText,
  errorText,
  defaultText,
  handleValueCheck,
  isCheck,
  setIsCheck
}) {
  const [isError, setIsError] = useState(true);
  const [isOnCheck, setisOnCheck] = useState(false); //중복체크를 on 할 것인지 안할것인지 판별 여부
  const [helperText, setHelperText] = useState(defaultText);

  const HandleOnChange = (e) => {
    //한번이라도 수정한 적이 있으면 isWrite를 true로, isCheck를 false 변경시킨다.
    if (isCheck) setIsCheck(false);

    //최대값이 지정되어있으면 value를 저장하지 않는다.
    if (maxValue && maxValue < e.target.value.length) return;

    setValue(e.target.value);

    //공백인 경우 defaultText로 바꾼다.
    if (e.target.value === "") {
      setIsError(true);
      setisOnCheck(false);
      return setHelperText(defaultText);
    }

    if (regexCheck) {
      // 정규표현식체크가 통과되면 successText를 송출하고 아니면 errorText를 송출한다
      if (regexCheck.test(e.target.value)) {
        setIsError(false);
        setisOnCheck(true);
        return setHelperText(successText);
      }
      if (!regexCheck.test(e.target.value)) {
        setIsError(true);
        setHelperText(errorText);
        setisOnCheck(false);
      }
    }
  };

  const handleCheck = () => {
    handleValueCheck();
  };

  return (
    <Container>
      <Label>{label}</Label>
      <Input
        error={isError}
        id={label}
        helperText={helperText}
        variant="standard"
        type={type}
        onChange={HandleOnChange}
        value={value}
      />
      {isCheck ? (
        <CheckSuccessBnt 
        label={label}
        disabled={isCheck ? true : false}>사용가능</CheckSuccessBnt>
      ) : (
        <CheckBnt
          label={label}
          disabled={!isOnCheck ? true : false} onClick={handleCheck}>
          중복확인
        </CheckBnt>
      )}
    </Container>
  );
}

ConfirmValidationInput.defaultProps = {
  type: "text",
  label: "",
  value: "",
  setValue: () => { },
  isCheck: false,
  setIsCheck: () => { },
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
//props 받을 때는 ({객체}) 형식주는 것보다 백틱으로 하는게 짧습니다.
const CheckBnt = styled(Button)`
  position: absolute;
  width: 6rem;
  height: ${props => (props.label === '' ? '1.8rem' : '2rem')};
  right: 0;
  top: ${props => (props.label === '' ? '0' : '1rem')};
  border: ${(isOnCheck) => (isOnCheck ? "1px solid #ff7775;" : "1px solid #d9d9d9")};
  color: ${(isOnCheck) => (isOnCheck ? "#FF7775" : "#3C3C3C")};
  font-size: 1rem;
  border-radius: 2rem;
`;

const CheckSuccessBnt = styled(Button)`
  display: flex;
  align-items: center;
  position: absolute;
  width: 6rem;
  height: ${props => (props.label === '' ? '1.8rem' : '2rem')};
  right: 0;
  top: ${props => (props.label === '' ? '0' : '1rem')};
  border: 1px solid #6b95ff;
  font-size: 1rem;
  border-radius: 2rem;
`;