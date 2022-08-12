import React, { useState } from "react";
import { TextField, styled } from "@mui/material";

export default function BirthSelectInput({
  label,
  type,
  value,
  maxValue,
  setValue,
  successText,
  errorText,
  defaultText
}) {
  const [isError, setIsError] = useState(true);
  const [helperText, setHelperText] = useState(defaultText);

  const HandleOnChange = (e) => {
    //최대값이 지정되어있으면 value를 저장하지 않는다.
    if (maxValue < e.target.value) {
      setIsError(true);
      setHelperText(errorText);
      return;
    }

    setValue(e.target.value);

    //공백인 경우 defaultText로 바꾼다.
    if (e.target.value === "") {
      setIsError(true);
      return setHelperText(defaultText);
    }
    if (e.target.value > '1920-01-01' && e.target.value < '2200-01-01') {
      setIsError(false);
      return setHelperText(successText);
    }
    if (e.target.value < '1920-01-01' || !e.target.value > '2200-01-01') {
      setIsError(true);
      setHelperText(errorText);
    }
  };

  return (
    <Container>
      <Label>{label}</Label>
      <Input
        error={isError}
        id="standard-error-helper-text"
        helperText={helperText}
        variant="standard"
        type={type}
        onChange={HandleOnChange}
        value={value}
      />
    </Container>
  );
}

BirthSelectInput.defaultProps = {
  type: "text",
  label: "",
  value: "",
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
    width: "100%"
  }
})
