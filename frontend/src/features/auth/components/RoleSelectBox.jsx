import React from "react";
import { RadioGroup, Radio, FormControlLabel, styled } from "@mui/material";
import { CUSTOMER, CONSULTANT } from 'api/CustomConst'
export default function RoleSelectBox({
  label,
  value,
  setValue,
}) {

  const HandleOnChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <Container>
      <Label>{label}</Label>
      <StyledRadioGroup
        aria-labelledby="radio-buttons-group-label"
        value={value}
        onChange={HandleOnChange}
        name="radio-buttons-group"
      >
        <FormControlLabel value={CUSTOMER} control={<Radio />} label="일반사용자" />
        <FormControlLabel value={CONSULTANT} control={<Radio />} label="컨설턴트" />
      </StyledRadioGroup>
    </Container>
  );
}

RoleSelectBox.defaultProps = {
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

const StyledRadioGroup = styled(RadioGroup)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "even"
})