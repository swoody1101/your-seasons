import React, { useState } from 'react';
import { useSelector } from 'react-redux/es/exports';
import { Card, CardActions, CardContent, Button, styled } from '@mui/material';
import MainColorSetItem from './MainColorSetItem'

const MainColorSet = ({setIsBest, setIsWorst}) => {
	const colorSet = useSelector(state=>state.colorSetList.data)
	const [season, setSeason] = useState('spring')

	const seasonColorSet = () => {
		if (season === "spring") return new Array(colorSet[0])
		else if (season === "summer") return new Array(colorSet[1])
		else if (season === "autumn") return new Array(colorSet[2])
		else if (season === "winter") return new Array(colorSet[3])
	}

  return (
	<Card>
		<ColorCard variant="outlined" >
			{/* map돌려서 하나의 컬러셋씩 내려주기(계절별) */}
				{seasonColorSet().map((seasonObj, index)=>(
					<MainColorSetItem seasonObj={seasonObj} key={index} setIsBest={setIsBest} setIsWorst={setIsWorst}/>
					))}
		</ColorCard>
		{/* 버튼 */}
		<CardActions>
			<Button size="small" value={'spring'} onClick={(e) => setSeason(e.target.value)}>봄</Button>
			<Button size="small" value={'summer'} onClick={(e) => setSeason(e.target.value)}>여름</Button>
			<Button size="small" value={'autumn'} onClick={(e) => setSeason(e.target.value)}>가을</Button>
			<Button size="small" value={'winter'} onClick={(e) => setSeason(e.target.value)}>겨울</Button>
		</CardActions>
	</Card>
  );
}

export default MainColorSet;


const ColorCard = styled(Card)((props)=>({
	width: '300px',
	height: '500px',
	overflow: 'auto',
  '&::-webkit-scrollbar': {
    width: '10px'
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