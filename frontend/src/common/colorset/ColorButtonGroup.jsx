import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import { removeSelectColor, addBestColor, removeBestColor, addWorstColor, removeWorstColor } from './colorSetSlice'

import { Box, Button } from '@mui/material'

const ColorButtonGroup = ({
  isBest,
  isWorst
}) => {
  const selectedColor = useSelector(state => state.colorSetList.selectedColor)
  const dispatch = useDispatch()
  return (
    <Box container>
      <Button onClick={() => dispatch(removeSelectColor(selectedColor))}>현재 배경 제거</Button>
      <FavoriteRoundedIcon sx={{ color: selectedColor }}></FavoriteRoundedIcon>
      <Button sx={{ display: isBest ? 'none' : '' }}
        onClick={() => { dispatch(addBestColor(selectedColor)); }}>Add Best</Button>
      <Button sx={{ display: isBest ? '' : 'none' }}
        onClick={() => { dispatch(removeBestColor(selectedColor)); }}>Remove Best</Button>
      <FavoriteRoundedIcon sx={{ color: selectedColor }}></FavoriteRoundedIcon>
      <Button sx={{ display: isWorst ? 'none' : '' }}
        onClick={() => { dispatch(addWorstColor(selectedColor)); }}>Add Worst</Button>
      <Button sx={{ display: isWorst ? '' : 'none' }}
        onClick={() => { dispatch(removeWorstColor(selectedColor)); }}>Remove Worst</Button>
    </Box>
  )
}

export default ColorButtonGroup

ColorButtonGroup.defaultProps = {
  isBest: false,
  isWorst: false
}