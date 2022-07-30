import { Grid } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import MainColorSet from './MainColorSet'
import BestColorSet from './BestColorSet'
import WorstColorSet from './WorstColorSet'

const TemporaryRoom = () => {
	const selectedColor = useSelector(state=>state.colorSetList.selectedColor)

	return (<>
	<Grid container>
		{/* 가상배경에 컬러 적용하는 부분 */}
		<Grid item style={{border: '1px solid black', width: 100, height: 100}}>
			<p>선택한 색상</p>
			<div style={{backgroundColor: selectedColor, width: 100, height:100}}>
				{selectedColor}
			</div>
		</Grid>

		<Grid item>
			<WorstColorSet />
		</Grid>


		<Grid item>
			<BestColorSet />
		</Grid>




		{/* 컬러셋 들어가는 부분 */}
		<Grid item>
			<MainColorSet />
		</Grid>
	</Grid>

</>)
}

export default TemporaryRoom