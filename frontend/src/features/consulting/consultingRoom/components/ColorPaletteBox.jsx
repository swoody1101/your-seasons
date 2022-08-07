import React from 'react'

import { Box, Button, Grid, styled, Typography, ButtonGroup } from '@mui/material'

const ColorPaletteBox = ({ colorSet }) => {
  const colorList = colorSet ? colorSet : []

  const paletteSetting = () => {
    const result = [];
    for (let i = 0; i < colorList.length; i++) {
      result.push(
        <ColorPaletteItem key={i} value={colorList[i]}>
          <small>
            {colorList[i]}
          </small>
        </ColorPaletteItem>
      )
    }
    return result
  }

  return (
    <ColorPaletteBoxContainer>
      {paletteSetting()}
    </ColorPaletteBoxContainer>
  )
}

export default ColorPaletteBox

const ColorPaletteBoxContainer = styled(Box)({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'center'
})

const ColorPaletteItem = styled(Button)((props) => ({
  color: 'black',
  backgroundColor: `${props.value}`,
  margin: '0.4%',
  width: '18%',
  aspectRatio: '1/1'
}))