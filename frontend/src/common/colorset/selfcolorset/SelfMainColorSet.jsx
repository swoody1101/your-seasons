import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import MainColorSetItem from '../MainColorSetItem'
import { Box, Card, CardActions, Button, styled } from '@mui/material';



const MainColorSet = () => {
	const colorSet = useSelector(state=>state.colorSetList.data)
	const [season, setSeason] = useState('spring')

	const seasonColorSet = () => {
		if (season === "spring") return new Array(colorSet[0])
		else if (season === "summer") return new Array(colorSet[1])
		else if (season === "autumn") return new Array(colorSet[2])
		else if (season === "winter") return new Array(colorSet[3])
	}


  return (
	<CustomCard>
		<ColorCard variant="outlined" >
			{/* map돌려서 하나의 컬러셋씩 내려주기(계절별) */}
				{seasonColorSet().map((seasonObj, index)=>(
					<MainColorSetItem seasonObj={seasonObj} key={index} />
					))}
		</ColorCard>
		{/* 버튼 */}
    <div style={{display: 'flex', justifyContent: 'center'}}>
		<CardActions>
			<Button size="middle" value={'spring'} onClick={(e) => setSeason(e.target.value)}>봄</Button>
			<Button size="middle" value={'summer'} onClick={(e) => setSeason(e.target.value)}>여름</Button>
			<Button size="middle" value={'autumn'} onClick={(e) => setSeason(e.target.value)}>가을</Button>
			<Button size="middle" value={'winter'} onClick={(e) => setSeason(e.target.value)}>겨울</Button>
		</CardActions>
    </div>
	</CustomCard>
  );
}

export default MainColorSet;

const CustomCard = styled(Card)((props)=>({
	width: '400px',
	height: '100%',
  border: '1px solid #5A4D4D60',
  padding: 'auto',
}))

const ColorCard = styled(Box)((props)=>({
	width: '100%',
	height: '60vh',
  paddingLeft: '10px',
	overflow: 'auto',
  margin: 'auto',
  '&::-webkit-scrollbar': {
    width: '10px'
  },
  '&::-webkit-scrollbar-track': {
    boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
    webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
  },
  '&::-webkit-scrollbar-thumb':{
    height: '13px',
    backgroundColor: '#F9C5C7',
    borderRadius: 10,
	}
}))