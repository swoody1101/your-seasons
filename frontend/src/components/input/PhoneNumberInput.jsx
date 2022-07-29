import React, { useState } from "react";
import { TextField, styled } from "@mui/material";

export default function PhoneNumberInput({
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
    if (maxValue && maxValue < e.target.value.length) return;

    if (e.target.value.length < 3) {
      setValue('010');
      setIsError(true);
      return setHelperText(defaultText);
    }

    if (regexCheck) {
      if (regexCheck.test(e.target.value)) {
        setNum(e.target.value);
        setIsError(false);
        return setHelperText(successText);
      }
      if (!regexCheck.test(e.target.value)) {
        setIsError(true);
        setHelperText(errorText);
      }
    }
  };
  function setNum(num) {
    setValue(num);
    if (num.length === 10) {
      setValue(num.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'));
    }
    if (num.length === 13) {
      setValue(num.replace(/-/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'));
    }
    if (num.length < 10) {
      setValue(num.replace(/-/g, ''))
    }
  }
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

PhoneNumberInput.defaultProps = {
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