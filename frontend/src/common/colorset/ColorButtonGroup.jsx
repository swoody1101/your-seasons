import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import { removeSelectColor, addBestColor, removeBestColor, addWorstColor, removeWorstColor } from './colorSetSlice'
import { setSnackBarOpen, setSnackbarMessage, setSnackBarSeverity } from 'common/snackbar/snackbarSlice';

import { Box, Fab, styled, Typography } from '@mui/material'
import { isEmpty } from 'lodash';

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
  
  return (
    <Div>
      {/* <CustomFab variant="extended" onClick={() => dispatch(removeSelectColor(selectedColor))}>
        선택 색상 제거
      </CustomFab> */}
      {/* bestbtn */}
      <CustomFab variant="extended" sx={{ display: isBest ? 'none' : '' }}
        onClick={() => { 
          if(!isEmpty(selectedColor)){
            if(clickColorFirst === false){
              clickColorFirstFunc();
            }else{
            }
            dispatch(addBestColor(selectedColor));
          }else{
            dispatch(setSnackBarOpen(true))
            dispatch(setSnackbarMessage('컬러를 추가해주세요'))
            dispatch(setSnackBarSeverity('error'))
          }
          }}>
        <FavoriteRoundedIcon sx={{ color: selectedColor, mr: 1 }} 
        /> <SubTypography>추가</SubTypography></CustomFab>
      <CustomFab variant="extended" sx={{ display: isBest ? '' : 'none' }} 
        onClick={() => {dispatch(removeBestColor(selectedColor)); setIsBest(false);}}>
        <FavoriteRoundedIcon sx={{ color: selectedColor, mr: 1 }} /> <SubTypography>제거</SubTypography> </CustomFab>
      {/* worstbtn */}
      <CustomFab variant="extended" sx={{ display: isWorst ? 'none' : '' }} 
        onClick={() => { 
          if(!isEmpty(selectedColor)){
            if(clickColorFirst === false){
              clickColorFirstFunc();
            }else{
            }
            dispatch(addWorstColor(selectedColor));
          }else{
            dispatch(setSnackBarOpen(true))
            dispatch(setSnackbarMessage('컬러를 추가해주세요'))
            dispatch(setSnackBarSeverity('error'))
          }
          }}>
        <HeartBrokenIcon sx={{ color: selectedColor, mr: 1 }} /> <SubTypography>추가</SubTypography> </CustomFab>
      <CustomFab variant="extended" sx={{ display: isWorst ? '' : 'none' }} 
        onClick={() => { dispatch(removeWorstColor(selectedColor)); setIsWorst(false); }}>
        <HeartBrokenIcon sx={{ color: selectedColor, mr: 1 }} /> <SubTypography>제거</SubTypography> </CustomFab>
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
  border: '1px solid #5A4D4D80',
  borderRadius: '5px',
  marginTop: '3px',
  height: '35px',
})

const SubTypography = styled(Typography)({
	fontFamily: 'malgunbd !important',
	fontSize: '15px',
	letterSpacing: 'var(--font-letter-spacing)',
	color: '#00000080',
  padding: 5,
})
