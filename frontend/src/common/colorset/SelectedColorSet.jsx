import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Grid, Button, styled } from '@mui/material'

import BestColorSet from './BestColorSet'
import WorstColorSet from './WorstColorSet'


const SelectedColorSet = ({
  setIsBest,
  setIsWorst
}) => {
  const selectedColor = useSelector(state => state.colorSetList.selectedColor)

  return (
    <ColorSet>
      {/* 임시로 확인할 수 있게 만든 div, 추후 삭제 가능*/}
      <p>선택한 색상</p>
      <div style={{ backgroundColor: selectedColor, width: 100, height: 100 }}>
        {selectedColor}
      </div>
      {/* 필수기능 */}
      <BestColorSet setIsBest={setIsBest} />
      <WorstColorSet setIsWorst={setIsWorst} />
    </ColorSet>
  )
}

export default SelectedColorSet

SelectedColorSet.defaultProps = {
  setIsBest: () => { },
  setIsWorst: () => { }
}

const ColorSet = (styled('div'))({
  // display: "flex",
  // flexDirection: "row",
})
