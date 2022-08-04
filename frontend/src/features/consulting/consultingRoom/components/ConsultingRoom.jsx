import React from 'react'

import { Box, Button, Container, Grid, styled, Typography, Slider, ButtonGroup } from '@mui/material'

const ConsultingRoom = ({
  isSetClear,
  setIsSetClear
}) => {
  const handleSetClear = (e) => {
    e.preventDefault();
    setIsSetClear(!isSetClear)
  }
  return (
    <SContainer>
      <Typography variant="h4">"OOO님의 컬러 컨설팅 룸"</Typography>
      <SGridContainer container>
        <SGrid item xs={12} sm={4}>
          <VideoContainer>
            <Typography variant="h6">
              나의 화면
            </Typography>
            {/* <video ref={myVideo} /> */}
            <Container sx={{ backgroundColor: "#555", height: '240px' }} />
          </VideoContainer>
        </SGrid>
        <SGrid item xs={12} sm={4}>
          <VideoContainer>
            <Typography variant="h6">
              컨설턴트
            </Typography>
            {/* <video ref={myVideo} /> */}
            <Container sx={{ backgroundColor: "#555", height: '240px' }} />
          </VideoContainer>
        </SGrid>
        <SGrid item xs={12} sm={4}>
          <PaletteContainer>
            <Typography variant="h6">
              색상 팔레트
            </Typography>
            {/* 색상 선택 파레트 버튼이 들어갈 자리 */}
            <Container sx={{ backgroundColor: "#555", flex: "1" }} />
          </PaletteContainer>
        </SGrid>

      </SGridContainer>
      <ButtonGroup sx={{ justifyContent: "end", xs: { width: "100%" }, width: "40%" }}>
        <Button variant="outlined" onClick={handleSetClear} >
          화면 조정
        </Button>
        <Button variant="outlined">
          화면 일시정지
        </Button>
        <Button variant="contained">
          종료
        </Button>
      </ButtonGroup>
    </SContainer>
  )
}

export default ConsultingRoom

const SContainer = styled(Box)({
  backgroundColor: "#F1F1F190",
  borderRadius: "1rem",
  padding: "1rem",
  margin: "1rem",
  height: "80%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center"
})

const SGridContainer = styled(Grid)({
  height: "100%",
  marginTop: "2rem",
  justifyContent: "center"
})

const SGrid = styled(Grid)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center"
})

const VideoContainer = styled(Box)({
  width: "90%",
  backgroundColor: "#F1F1F190",
  borderRadius: "1rem",
  padding: "1rem",
})

const PaletteContainer = styled(Box)({
  width: "90%",
  height: "90%",
  backgroundColor: "#F1F1F190",
  borderRadius: "1rem",
  padding: "1rem",
})
