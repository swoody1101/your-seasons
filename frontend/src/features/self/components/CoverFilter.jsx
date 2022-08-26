import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';

import { Box, styled, IconButton, Slider } from '@mui/material'
import WifiProtectedSetupIcon from '@mui/icons-material/WifiProtectedSetup';
import GradientIcon from '@mui/icons-material/Gradient';
import { getFilter } from './rgbConverter'

import FABRIC0 from 'assets/fabric/fabric000.png'
import FABRIC1 from 'assets/fabric/fabric001.png'
import FABRIC2 from 'assets/fabric/fabric002.png'

const CoverFilter = () => {
  const { selectedColor } = useSelector(state => state.colorSetList)
  const { role } = useSelector(state => state.auth.logonUser)
  const { session } = useSelector(state => state.self)
  const [img, setImg] = useState(FABRIC0)
  const [isFilter, setIsFilter] = useState(false)
  const [hvalue, setHvalue] = useState(4.0)
  const [falue, setFalue] = useState(0)
  const fabric = [FABRIC0, FABRIC1, FABRIC2]
  const [colorString, setColorString] = useState('opacity(1.0)')

   useEffect(() => {
    if (selectedColor) {
      setColorString(getFilter(selectedColor))
    }
  }, [selectedColor])

  const handelFabric = () => {
    const value = falue + 1
    if (value > 2) {
      const f = fabric[0]
      setImg(f)
      setFalue(0)
    }
    else {
      const f = fabric[value]
      setImg(f)
      setFalue(value)
    }
  }

  return (
    <SBox>
      {isFilter &&
        <Img src={img} filter={colorString} hi={hvalue} />
      }
      {isFilter ?
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <SIconButton onClick={() => setIsFilter(!isFilter)}>
            <GradientIcon />
          </SIconButton>
          <SIconButton
            onClick={handelFabric}
          >
            <WifiProtectedSetupIcon />
          </SIconButton>
          <SliderBox>
            <SSlider
              value={hvalue}
              size="small"
              step={0.1} min={1.0} max={6.0}
              onChange={(event, newValue) => {
                if (typeof newValue === 'number') {
                  setHvalue(newValue);
                }
              }}
            />
          </SliderBox>
        </Box>
        :
        <SIconButton onClick={() => setIsFilter(!isFilter)}>
          <GradientIcon />
        </SIconButton>
      }
    </SBox>
  )
}

export default CoverFilter

const SBox = styled(Box)({
  width: "100%",
  position: "absolute",
  bottom: "4px",
  left: "0",
})

const Img = styled('img')((props) => ({
  width: "100%",
  aspectRatio: `${9 - props.hi}/1`,
  position: "absolute",
  bottom: "0",
  left: "0",
  filter: `${props.filter}`
}))

const SliderBox = styled(Box)({
  width: `calc(100% - 90px)`,
  padding: '0 16px'
})

const SSlider = styled(Slider)({
  color: '#4f4f4f'
})

const SIconButton = styled(IconButton)({
  backgroundColor: "#9f9f9f90",
  zIndex: "2000",
  marginLeft: "4px",
  marginBottom: "4px",
  ":hover": {
    backgroundColor: "#f9f9f990",
  }
})