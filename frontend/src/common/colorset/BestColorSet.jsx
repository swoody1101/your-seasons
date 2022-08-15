import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Card, styled, Tooltip } from '@mui/material'
import { isEmpty } from 'lodash'

import { changeSelectColor } from './colorSetSlice'

const BestColorSet = ({ setIsBest }) => {
  const bestcolors = useSelector(state => state.colorSetList.bestColor)
  const dispatch = useDispatch()

	return (
  <Div>
		<p>베스트 컬러팔레트</p>
		<Pallete>
        {!isEmpty(bestcolors) ? bestcolors.map((item, index) => (
          <Tooltip title={item} key={index}  placement="top">
            <ColorItem
              item={item}
              onClick={() => {
                dispatch(changeSelectColor(item));
                setIsBest(true)
              }}/>
          </Tooltip>
        ))
      :
      <p style={{margin:'auto'}}>
        최대 10개의 컬러를 추가할 수 있어요.
      </p>
      }
		</Pallete>
	</Div>)
}

export default BestColorSet

const Div = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 5,
})

const Pallete = styled(Card)({
  display:'flex', 
  justifyContent:'start', 
  alignItems:'center', 
  backgroundColor: '#f5f5f5', 
  border: '1px solid black',
  height: 34, 
  width: 323,
  // maxWidth: 323,
  // width: '100%',
})


const ColorItem = styled(Box)((props) => ({
  backgroundColor: props.item, 
  width: 30, 
  height: 30, 
  margin: 1,
  cursor: 'pointer',
}))