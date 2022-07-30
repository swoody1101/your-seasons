import React from 'react'
import { Grid } from '@mui/material';


const Pallete = ({colorset, tone}) => {
	const selectColor = () => {
		
	}
	return <>
	{/* 한 팔레트당 색상 20개 씩 존재 */}
	{tone}
	<Grid item xs={12} sx={{display:'flex', flexDirection:'row', flexWrap: 'wrap', justifyContent: 'start'}}>
			{colorset.map((item, index)=>(
				<div style={{backgroundColor: item, width:50, height:50 }} key={index} onClick={selectColor}></div>
			))}
	</Grid>

	</>
} 


const MainColorSetItem = ({seasonObj}) => {
	// key 값 저장
	const seasonTone = []

	const selectTone = () => {
		for(let colorset in seasonObj){
			seasonTone.push(colorset)
		}
		return seasonTone
	}

	return ( <>
	<Grid container sx={{display: 'flex', flexDirection:'column'}}>
			{selectTone().map((tone, index) => (
				<Pallete key={index} tone={tone} colorset={seasonObj[tone]}/>
			))}
	</Grid>
</>)
}

export default MainColorSetItem