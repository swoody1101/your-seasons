import React from "react";
import { Box, MenuItem, Select, TextField, styled } from "@mui/material";

export default function LicenseInput({
  label,
  licenseName,
  setLicenseName,
  value,
  setValue,
}) {

  const HandleOnChange = (e) => {
    setValue(e.target.value);

  };
  const HandleLicenseIdChange = (e) => {
    setLicenseName(e.target.value);
  }
  return (
    <Container>
      <Label>{label}</Label>
      <StyledBox>
        <StyledSelect
          id="select-license"
          value={licenseName}
          onChange={HandleLicenseIdChange}
        >
          <MenuItem value={"컬러리스트산업기사"}>컬러리스트산업기사</MenuItem>
          <MenuItem value={"컬러리스트기사"}>컬러리스트기사</MenuItem>
          <MenuItem value={"NPO 국제 퍼스널컬러"}>NPO 국제 퍼스널컬러</MenuItem>
          <MenuItem value={"NCNS 퍼스널컬러"}>NCNS 퍼스널컬러</MenuItem>
          <MenuItem value={"퍼스널컬러코디네이터"}>퍼스널컬러코디네이터</MenuItem>
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

const Label = styled('span')({
  color: "#878787",
  fontSize: "1.2rem"
})

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