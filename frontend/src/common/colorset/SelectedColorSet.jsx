import React from 'react'

import { Grid, styled } from '@mui/material'

import BestColorSet from './BestColorSet'
import WorstColorSet from './WorstColorSet'


const SelectedColorSet = ({
  setIsBest,
  setIsWorst
}) => {

  return (
    <MainDiv>
      <BestColorSet setIsBest={setIsBest} />
      <WorstColorSet setIsWorst={setIsWorst} />
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
