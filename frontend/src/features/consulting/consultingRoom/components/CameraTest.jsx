import React, { useRef, useState } from 'react'

import { Box, Button, Container, Grid, styled, Typography, Slider } from '@mui/material'

import WarningIcon from '@mui/icons-material/Warning';
import MicIcon from '@mui/icons-material/Mic';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const CameraTest = ({
  isSetClear,
  setIsSetClear
}) => {
  const myVideo = useRef('');

  const [hue, setHue] = useState(50);
  const [saturation, setSaturation] = useState(50);
  const [brightness, setBrightness] = useState(50);

  const [micVolume, setMicVolume] = useState(10);

  const handleSetClear = (e) => {
    e.preventDefault();
    setIsSetClear(!isSetClear)
  }
  return (
    <Container sx={{ xs: 'none', sm: 'block', height: '100%' }}>
      <SContainer>
        <Typography variant="h4">카메라 테스트</Typography>
        <SGridContainer container>
          <SGrid item xs={12} sm={6}>
            <VideoContainer>
              <Typography variant="h6">
                비디오 확인하기
              </Typography>
              {/* <video ref={myVideo} /> */}
              <Container sx={{ backgroundColor: "#555", height: '180px' }} />
              <Typography variant="h6">
                색상 | 채도 | 명도
              </Typography>
              <Slider
                size="small"
                value={hue}
                onChange={(event, newValue) => {
                  if (typeof newValue === 'number') {
                    setHue(newValue);
                  }
                }}
              />
              <Slider
                size="small"
                value={saturation}
                onChange={(event, newValue) => {
                  if (typeof newValue === 'number') {
                    setSaturation(newValue);
                  }
                }}
              />
              <Slider
                size="small"
                value={brightness}
                onChange={(event, newValue) => {
                  if (typeof newValue === 'number') {
                    setBrightness(newValue);
                  }
                }}
              />
            </VideoContainer>
          </SGrid>
          <SGrid item xs={12} sm={6}>
            <NotiText>
              <WarningIcon sx={{
                color: "black",
                backgroundColor: "yellow",
                fontSize: "3rem",
                padding: "0.2rem",
                border: "0.2rem solid black",
                borderRadius: "100%"
              }} />
              <Typography variant="h5">
                밝기 조절을 최소화 하기 위해<br />
                본인의 피부톤과 화면의 색상이<br />
                일치하는 곳에서 촬영해주시기 바랍니다.
              </Typography>
            </NotiText>
            <SoundContainer>
              <Typography variant="h6">
                음성 확인하기
              </Typography>
              <Button variant="contained">
                <MicIcon />
                <Typography>
                  마이크
                </Typography>
              </Button>
              <Button variant="contained">
                <PlayArrowIcon />
                <Typography >
                  재생하기
                </Typography>
              </Button>
              <Slider
                size="small"
                value={micVolume}
                onChange={(event, newValue) => {
                  if (typeof newValue === 'number') {
                    setMicVolume(newValue);
                  }
                }}
                color='secondary'
              />
            </SoundContainer>
          </SGrid>
        </SGridContainer>
        <Button onClick={handleSetClear} variant="contained" sx={{ xs: { width: "100%" }, width: "40%" }}>
          세팅완료
        </Button>
      </SContainer>
    </Container>
  )
}

export default CameraTest

CameraTest.defaultProps = {
  isSetClear: false,
  setIsSetClear: () => { }
}

const SContainer = styled(Box)({
  backgroundColor: "#F1F1F190",
  borderRadius: "3rem",
  padding: "3rem",
  marginTop: "5rem",
  height: "80%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center"
})

const SGridContainer = styled(Grid)({
  height: "80%",
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
  width: "80%",
  backgroundColor: "#F1F1F190",
  borderRadius: "1rem",
  padding: "1rem",
})

const SoundContainer = styled(Box)({
  width: "80%",
  marginTop: "1rem",
  backgroundColor: "#F1F1F190",
  borderRadius: "1rem",
  padding: "1rem",
})

const NotiText = styled(Container)({
  backgroundColor: "#F1F1F190",
  borderRadius: "3rem",
  padding: "1rem",
  textAlign: "center"
})