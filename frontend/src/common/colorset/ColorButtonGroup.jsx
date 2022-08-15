import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import { removeSelectColor, addBestColor, removeBestColor, addWorstColor, removeWorstColor } from './colorSetSlice'

import { Box, Fab, styled } from '@mui/material'

const ColorButtonGroup = ({
  isBest,
  isWorst,
  setIsBest,
  setIsWorst,
  clickColorFirst,
  clickColorFirstFunc
}) => {
  const selectedColor = useSelector(state => state.colorSetList.selectedColor)
  const dispatch = useDispatch()
  
  const onFirstClick = () => {
    if(clickColorFirst === false){
      clickColorFirstFunc();
      return
    }else{
      return
    }
  }


  return (
    <Div>
      <CustomFab variant="extended" onClick={() => dispatch(removeSelectColor(selectedColor))}>
        현재 배경 제거
      </CustomFab>
      {/* bestbtn */}
      <CustomFab variant="extended" sx={{ display: isBest ? 'none' : '' }} 
        onClick={() => { dispatch(addBestColor(selectedColor)); onFirstClick(); }}>
        <FavoriteRoundedIcon sx={{ color: selectedColor, mr: 1 }} /> 추가 </CustomFab>
      <CustomFab variant="extended" sx={{ display: isBest ? '' : 'none' }} 
        onClick={() => { dispatch(removeBestColor(selectedColor)); setIsBest(false); }}>
        <FavoriteRoundedIcon sx={{ color: selectedColor, mr: 1 }} /> 제거 </CustomFab>
      {/* worstbtn */}
      <CustomFab variant="extended" sx={{ display: isWorst ? 'none' : '' }} 
        onClick={() => { dispatch(addWorstColor(selectedColor)); onFirstClick(); }}>
        <HeartBrokenIcon sx={{ color: selectedColor, mr: 1 }} /> 추가 </CustomFab>
      <Fab variant="extended" sx={{ display: isWorst ? '' : 'none' }} 
        onClick={() => { dispatch(removeWorstColor(selectedColor)); setIsWorst(false); }}>
        <HeartBrokenIcon sx={{ color: selectedColor, mr: 1 }} /> 제거 </Fab>
    </Div>
  )
}

export default ColorButtonGroup

ColorButtonGroup.defaultProps = {
  isBest: false,
  isWorst: false
}

const Div = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  gap: 3,
})
const CustomFab = styled(Fab)({
  backgroundColor: '#EFEFEF',
  color: '#5A4D4D',
  boxShadow: 'none',
  '&:hover': {
		backgroundColor: '#D3D3D3',
		color: 'black',
		fontWeight: 'normal',
  },
  border: '1px solid #66635C',
})