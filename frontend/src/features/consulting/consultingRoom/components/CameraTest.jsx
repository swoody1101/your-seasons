import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { Box, Button, Container, Grid, styled, Typography, Slider } from '@mui/material'

import { settingModalOff } from 'features/consulting/consultingRoom/consultSlice'

import UserVideoComponent from './UserVideoComponent';

import WarningIcon from '@mui/icons-material/Warning';

const CameraTest = () => {
  const { customer } = useSelector(state => state.consult)
  const dispatch = useDispatch();

  const [hue, setHue] = useState(0.0);
  const [saturation, setSaturation] = useState(1.0);
  const [brightness, setBrightness] = useState(0.0);

  const handleHSB = () => {
    if (!customer.stream.filter) {
      customer.stream
        .applyFilter("GStreamerFilter", { "command": `videobalance hue=${hue} saturation=${saturation} brightness=${brightness}` })
        .then(() => { })
        .catch((err) => { });
    } else {
      customer.stream.removeFilter()
        .then(() => {
          customer.stream
            .applyFilter("GStreamerFilter", { "command": `videobalance hue=${hue} saturation=${saturation} brightness=${brightness}` })
            .then(() => { })
        })
    }
  }
  return (
    <Container sx={{ xs: 'none', sm: 'block', height: '100%', position: 'fixed', top: '0', left: '0', zIndex: '1200' }}>
      <SContainer>
        <SGridContainer container>
          <SGrid item xs={12} sm={3}>
            <NotiText>
              <WarningIcon sx={{
                color: "black",
                backgroundColor: "yellow",
                fontSize: "3rem",
                padding: "0.2rem",
                border: "0.2rem solid black",
                borderRadius: "100%"
              }} />
              <MainTypography>
                밝기 조절을 최소화 하기 위해<br />
                본인의 피부톤과 화면의 색상이<br />
                일치하는 곳에서 촬영해주시기 바랍니다.
              </MainTypography>
            </NotiText>
          </SGrid>
          <SGrid item xs={12} sm={6}>
            <VideoContainer>
              <UserVideoComponent
                streamManager={customer} />
            </VideoContainer>
          </SGrid>
          <SGrid item xs={12} sm={3}>
            <Controller >
              <MainTypography variant="h5">HSB 컨트롤러</MainTypography>
              {/* 마우스가 스크롤에서 벗어나면 적용됩니다. */}
              <CustomTypography>
                * 클릭 후 커서를 위, 아래로 이동해주세요. <hr />
              </CustomTypography>
              <MainTypography variant="h6">색조 (HUE)</MainTypography>
              <Slider
                value={hue}
                size="small"
                valueLabelDisplay="auto"
                marks step={0.1} min={-1.0} max={1.0}
                onMouseLeave={handleHSB}
                onChange={(event, newValue) => {
                  if (typeof newValue === 'number') {
                    setHue(newValue);
                  }
                }}
              />
              <MainTypography variant="h6">채도 (SATURATION)</MainTypography>
              <Slider
                value={saturation}
                size="small"
                valueLabelDisplay="auto"
                marks step={0.1} min={0.0} max={2.0}
                onMouseLeave={handleHSB}
                onChange={(event, newValue) => {
                  if (typeof newValue === 'number') {
                    setSaturation(newValue);
                  }
                }}
              />
              <MainTypography variant="h6">밝기 (BRIGHTNESS)</MainTypography>
              <Slider
                value={brightness}
                size="small"
                valueLabelDisplay="auto"
                marks step={0.1} min={-1.0} max={1.0}
                onMouseLeave={handleHSB}
                onChange={(event, newValue) => {
                  if (typeof newValue === 'number') {
                    setBrightness(newValue);
                  }
                }}
              />

            </Controller>
          </SGrid>
        </SGridContainer>
        <Button onClick={() => { dispatch(settingModalOff()) }} variant="contained" sx={{ xs: { width: "100%" }, width: "40%", marginTop: 3 }}>
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
  position: 'absolute',
  top: "0",
  left: "0",
  width: "100vw",
  height: "100vh",
  backgroundColor: '#000000df',
  zIndex: '12000',
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
  width: "100%",
  aspectRatio: "16/9",
  backgroundColor: "#F1F1F190",
  borderRadius: "1rem",
  padding: "1rem",
})

const Controller = styled(Box)({
  backgroundColor: "#F1F1F190",
  borderRadius: "1rem",
  width: "90%",
  padding: "1rem",
})

const NotiText = styled(Container)({
  backgroundColor: "#F1F1F190",
  borderRadius: "1rem",
  width: "90%",
  padding: "1rem",
  textAlign: "center"
})

const CustomTypography = styled(Typography)({
  fontFamily: 'malgunbd !important',
  fontSize: '20px',
  letterSpacing: 'var(--font-letter-spacing)',
  color: '#FFFFFF',
})

const MainTypography = styled(Typography)({
  fontFamily: 'malgunbd !important',
  fontSize: '18px',
  letterSpacing: '-1px',
  color: '#000000',
})