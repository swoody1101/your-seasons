import React, { useState } from 'react'
import { Grid } from '@mui/material';
import { useDispatch } from 'react-redux';
import { changeSelectColor } from './colorSetSlice';

const Pallete = ({colorset, tone, setIsBest}) => {
	const dispatch = useDispatch()	

	return <>
	{/* 한 팔레트당 색상 20개 씩 존재 */}
	<p style={{padding:5, color: 'rainbow'}}>	{tone} </p>
	<Grid item sx={{display:'flex', flexDirection:'row', flexWrap: 'wrap', justifyContent: 'center'}}>
			{colorset.map((item, index)=>(
				<div style={{backgroundColor: item, width:50, height:50, margin:1 }} 
					key={index} onClick={() => {dispatch(changeSelectColor(item)); setIsBest(false)}}></div>
			))}
	</Grid>

	</>
} 


const MainColorSetItem = ({seasonObj, setIsBest}) => {
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
				<Pallete key={index} tone={tone} colorset={seasonObj[tone]} setIsBest={setIsBest}/>
			))}
	</Grid>
</>)
}

export default MainColorSetItem