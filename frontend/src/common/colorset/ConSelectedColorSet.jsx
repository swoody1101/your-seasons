import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Grid, Button, styled } from '@mui/material'

import BestColorSet from './BestColorSet'
import WorstColorSet from './WorstColorSet'


const ConSelectedColorSet = ({
  setIsBest,
  setIsWorst
}) => {
  const selectedColor = useSelector(state => state.colorSetList.selectedColor)

  return (
    <ConGrid item>
      <div style={{ backgroundColor: selectedColor, width: "40", height: "40" }} />
      <BestColorSet setIsBest={setIsBest} />
      <WorstColorSet setIsWorst={setIsWorst} />
    </ConGrid>
  )
}

export default ConSelectedColorSet

ConSelectedColorSet.defaultProps = {
  setIsBest: () => { },
  setIsWorst: () => { }
}

const ConGrid = styled(Grid)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  backgroundColor: 'red',
})