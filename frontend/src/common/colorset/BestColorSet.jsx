import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeSelectColor } from './colorSetSlice'

const BestColorSet = ({ setIsBest }) => {
  const bestcolors = useSelector(state => state.colorSetList.bestColor)
  const dispatch = useDispatch()

	return (<>
		<p>베스트 컬러팔레트</p>
		<div style={{ display:'flex', justifyContent:'start', alignContent:'center', backgroundColor: '#f5f5f5', width: '100%',  height: 60, border: '1px solid black'}}>
        {bestcolors.map((item, index) => (
          <div
            onClick={() => {
              dispatch(changeSelectColor(item));
              setIsBest(true)
            }}
            style={{ backgroundColor: item, width: 40, height: 40, margin: 5 }}
            key={index}>{item}</div>
        ))}
		</div>
	</>)
}

export default BestColorSet