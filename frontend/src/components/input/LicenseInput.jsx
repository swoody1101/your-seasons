import React from "react";
import styled from "@emotion/styled";
import { Box, MenuItem, Select, TextField } from "@mui/material";

export default function LicenseInput({
  label,
  licenseId,
  setLicenseId,
  value,
  setValue,
}) {

  const HandleOnChange = (e) => {
    setValue(e.target.value);

  };
  const HandleLicenseIdChange = (e) => {
    setLicenseId(e.target.value);
  }
  return (
    <Container>
      <Label>{label}</Label>
      <StyledBox>
        <StyledSelect
          id="select-license"
          value={licenseId}
          onChange={HandleLicenseIdChange}
        >
          <MenuItem value={1}>컬러리스트</MenuItem>
          <MenuItem value={2}>퍼스널컬러 컨설턴트</MenuItem>
          <MenuItem value={3}>NPO 퍼스널컬러</MenuItem>
          <MenuItem value={4}>NCNS 퍼스널컬러리스트</MenuItem>
        </StyledSelect>
        <StyledTextField
          id={label}
          variant="standard"
          type="text"
          onChange={HandleOnChange}
          value={value}
          placeholder="자격증 번호"
        />
      </StyledBox>
    </Container>
  );
}

LicenseInput.defaultProps = {
  type: "text",
  label: "",
  value: ""
};

const Container = styled('div')({
  position: "relative",
  width: "100%"
})

const Label = styled.span`
  color: #878787;
  font-size: 1.2rem;
`;

const StyledBox = styled(Box)({
  display: "flex",
  flexDirection: "row",
  gap: "0.8rem",
  alignItems: "flex-end",
  marginTop: "0.8rem"
})
const StyledSelect = styled(Select)({
  width: "38%",
  height: "2rem"
})
const StyledTextField = styled(TextField)({
  width: "60%"
})