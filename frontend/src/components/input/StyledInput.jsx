import React, { useState } from "react";
import { TextField, styled } from "@mui/material";

export default function StyledInput({
  label,
  type,
  value,
  maxValue,
  setValue,
  regexCheck,
  successText,
  errorText,
  defaultText
}) {
  const [isError, setIsError] = useState(true);
  const [helperText, setHelperText] = useState(defaultText);

  const HandleOnChange = (e) => {
    //최대값이 지정되어있으면 value를 저장하지 않는다.
    if (maxValue && maxValue < e.target.value.length) return;

    setValue(e.target.value);

    //공백인 경우 defaultText로 바꾼다.
    if (e.target.value === "") {
      setIsError(true);
      return setHelperText(defaultText);
    }

    if (regexCheck) {
      if (regexCheck.test(e.target.value)) {
        setIsError(false);
        return setHelperText(successText);
      }
      if (!regexCheck.test(e.target.value)) {
        setIsError(true);
        setHelperText(errorText);
      }
    }
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
    </Container>
  );
}

StyledInput.defaultProps = {
  type: "text",
  label: "",
  value: ""
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