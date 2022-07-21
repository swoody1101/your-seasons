import React, { useState } from "react";
import styled from "@emotion/styled";
import { TextField, RadioGroup, Radio } from "@mui/material";

export default function RoleSelectBox({
  label,
  setValue,
}) {

  const HandleOnChange = (e) => {
    setValue(e.target.value);

  };

  return (
    <Container>
      <Label>{label}</Label>
      <RadioG
        defaultValue="일반사용자"
        name="role"
        onChange={HandleOnChange}
      >
        <Radio value="mamber" label="일반사용자" >일반 사용자</Radio>
        <Radio value="consultant" label="컨설턴트">컨설턴트</Radio>
      </RadioG>
    </Container>
  );
}

RoleSelectBox.defaultProps = {
  label: "",
  value: ""
};

const Container = styled.div`
  position: relative;
`;

const Label = styled.span`
  color: #878787;
  font-size: 1.2rem;
`;

const RadioG = styled(RadioGroup)({
  width: "100%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-even"
});
