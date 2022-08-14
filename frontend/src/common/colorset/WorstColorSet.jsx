import { styled } from '@mui/material';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeSelectColor } from './colorSetSlice'


const WorstColorSet = ({setIsWorst}) => {
	const wortcolors = useSelector(state => state.colorSetList.worstColor);
	const dispatch = useDispatch();


	return (
  <WorstDiv>
		<PalleteName>워스트 컬러팔레트</PalleteName>
		<Pallete >
			{wortcolors.map((item, index)=>(
				<div
				onClick={()=>{
					dispatch(changeSelectColor(item));
					setIsWorst(true)}}
					style={{backgroundColor: item, width:50, height:50, margin:5}}  
					key={index}>{item}</div>
					))}
		</Pallete>
  </WorstDiv>
)
}

export default WorstColorSet

const WorstDiv = styled('div')({
  // display: "flex",
  // flexDirection: "column",
})

const PalleteName = styled('p')({
  display: "flex",
  flexDirection: "row",
})

const Pallete = styled('div')({
  display:'flex', 
  justifyContent:'start', 
  alignContent:'center', 
  backgroundColor: '#f5f5f5', 
  width: '100%',  
  height: 60, 
  border: '1px solid black',
})
