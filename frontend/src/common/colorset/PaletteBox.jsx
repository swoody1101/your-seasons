import React from 'react'
import { useDispatch } from 'react-redux'
import { Box, Button, styled, Tooltip } from '@mui/material'
import { changeSelectColor } from './colorSetSlice';
const ColorPaletteBox = ({ colorSet }) => {
  const colorList = colorSet ? colorSet : []
  const dispatch = useDispatch()

  const paletteSetting = () => {
    const result = [];
    for (let i = 0; i < colorList.length; i++) {
      result.push(
        <Tooltip title={colorList[i]} key={i}  placement="top">
          <ColorPaletteItem  value={colorList[i]} onClick={() => { dispatch(changeSelectColor(colorList[i])) }}>
        </ColorPaletteItem></Tooltip>
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
  minWidth: '24px',
  color: 'black',
  backgroundColor: `${props.value}`,
  margin: '0.4%',
  width: '9%',
  aspectRatio: '1/1'
}))