import Drawing from './Drawing'
import React from 'react';
import { Card, styled } from '@mui/material';

const TmpDrawing = () => {

  return (
		<ColorCard variant="outlined" >
      <Drawing />
		</ColorCard>
  );
}

export default TmpDrawing;


const ColorCard = styled(Card)((props)=>({
	width: '300px',
	height: '500px',
	overflow: 'auto',
  // 스크롤바 두께
  '&::-webkit-scrollbar': {
    width: '10px',
    height: '10px',
  },
  '&::-webkit-scrollbar-track': {
    boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
    webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
  },
  '&::-webkit-scrollbar-thumb':{
    height: '17%',
    backgroundColor: '#F9C5C7',
    borderRadius: 10,
	}
}))