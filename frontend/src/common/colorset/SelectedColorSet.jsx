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
    <Grid item>
      <p>선택한 색상</p>
      <div style={{ backgroundColor: selectedColor, width: 100, height: 100 }}>
        {selectedColor}
      </div>
      <BestColorSet setIsBest={setIsBest} />
      <WorstColorSet setIsWorst={setIsWorst} />
    </Grid>
  )
}

export default SelectedColorSet

SelectedColorSet.defaultProps = {
  setIsBest: () => { },
  setIsWorst: () => { }
}