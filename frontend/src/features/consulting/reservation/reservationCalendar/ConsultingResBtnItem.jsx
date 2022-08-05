import React, { useState } from 'react'
import {
  Box, Button,
} from '@mui/material';

const ConsultingResBtnItem = (props) => {

  return (
    <Box component="span" sx={{ pr: 1, pb: 1 }}>
      <Button
        disabled={props.isReserved}
        value={props.time}
        variant="contained"
        size="medium"
        sx={{ width: 80 }}
        onClick={props.timeClickHandler}>
        {props.time}
      </Button>
    </Box>
  )
}

export default ConsultingResBtnItem