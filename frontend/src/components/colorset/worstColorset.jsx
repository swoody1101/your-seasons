import React from 'react'
import { useSelector } from 'react-redux'

const WorstColorSet = () => {
	const wortcolors = useSelector(state => state.colorSetList.worstColor)

	return (
		<div>
			{wortcolors.map((item, index)=>(
				<div style={{backgroundColor: item, width:50, height:50, margin:1 }} key={index}>{item}</div>
		))}
		</div>
	)
}

export default WorstColorSet