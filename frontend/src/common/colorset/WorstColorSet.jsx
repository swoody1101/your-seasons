import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeSelectColor } from './colorSetSlice'


const WorstColorSet = ({setIsWorst}) => {
	const wortcolors = useSelector(state => state.colorSetList.worstColor);
	const dispatch = useDispatch();


	return (<>
		<p>WORST COLOR SET</p>
		<div style={{ display:'flex', justifyContent:'start', alignContent:'center', backgroundColor: '#f5f5f5', width: '100%',  height: 60, border: '1px solid black'}}>
			{wortcolors.map((item, index)=>(
				<div
				onClick={()=>{
					dispatch(changeSelectColor(item));
					setIsWorst(true)}}
					style={{backgroundColor: item, width:50, height:50, margin:5}}  
					key={index}>{item}</div>
					))}
		</div>
</>)
}

export default WorstColorSet