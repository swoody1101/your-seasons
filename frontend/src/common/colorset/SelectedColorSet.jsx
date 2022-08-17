import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Grid, styled } from '@mui/material'

import BestColorSet from './BestColorSet'
import WorstColorSet from './WorstColorSet'


const SelectedColorSet = ({
  setIsBest,
  setIsWorst
}) => {
  const selectedColor = useSelector(state => state.colorSetList.selectedColor)

  return (
    <MainDiv>
      <BestColorSet/>
      <WorstColorSet/>
    </MainDiv>
  )
}

export default SelectedColorSet

SelectedColorSet.defaultProps = {
  setIsBest: () => { },
  setIsWorst: () => { }
}

const MainDiv = styled(Grid)({
  display: 'flex',
  flexDirection: 'row',
  gap: 10,
})
