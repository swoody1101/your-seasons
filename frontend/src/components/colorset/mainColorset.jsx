import React, { useState } from 'react';
import { useSelector } from 'react-redux/es/exports';
import { Box, Card, CardActions, CardContent, Button } from '@mui/material';
import MainColorSetItem from './MainColorSetItem'

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
	<Box sx={{ minWidth: 275, width: 400 }}>
		<Card variant="outlined">
			{/* map돌려서 하나의 컬러셋씩 내려주기(계절별) */}
			<CardContent>
				{seasonColorSet().map((seasonObj, index)=>(
					<MainColorSetItem seasonObj={seasonObj} key={index}/>
				))}
			</CardContent>
			{/* 버튼 */}
			<CardActions>
				<Button size="small" value={'spring'} onClick={(e) => setSeason(e.target.value)}>봄</Button>
				<Button size="small" value={'summer'} onClick={(e) => setSeason(e.target.value)}>여름</Button>
				<Button size="small" value={'autumn'} onClick={(e) => setSeason(e.target.value)}>가을</Button>
				<Button size="small" value={'winter'} onClick={(e) => setSeason(e.target.value)}>겨울</Button>
			</CardActions>
		</Card>
	</Box>
  );
}

export default MainColorSet;