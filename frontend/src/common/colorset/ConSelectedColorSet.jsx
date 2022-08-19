import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Grid, styled } from '@mui/material'

import BestColorSet from './BestColorSet'
import WorstColorSet from './WorstColorSet'


const ConSelectedColorSet = ({
  setIsBest,
  setIsWorst
}) => {
  const selectedColor = useSelector(state => state.colorSetList.selectedColor)

  return (
    <MainDiv>
      {/* <div style={{ backgroundColor: selectedColor, width: "40", height: "40" }} /> */}
      <BestColorSet setIsBest={setIsBest} />
      <WorstColorSet setIsWorst={setIsWorst} />
    </MainDiv>
  )
}

export default ConSelectedColorSet

ConSelectedColorSet.defaultProps = {
  setIsBest: () => { },
  setIsWorst: () => { }
}

const MainDiv = styled(Grid)({
  display: 'flex',
  flexDirection: 'row',
  gap: 10,
})
