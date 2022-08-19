import React from 'react'
import {
  Box, Button, styled
} from '@mui/material';

const ConsultingResBtnItem = (props) => {

  return (
    <Box component="span" sx={{ pr: 1, pb: 1 }}>
      <CustomBtn
        disabled={props.isReserved}
        value={props.time}
        variant="contained"
        size="medium"
        sx={{ width: 80 }}
        onClick={props.timeClickHandler}>
        {props.time}
      </CustomBtn>
    </Box>
  )
}

export default ConsultingResBtnItem

const CustomBtn = styled(Button)(() => ({
  backgroundColor: 'pink',
  color: 'black',
  '&:hover': {
    backgroundColor: 'pink',
    color: 'white',
    fontWeight: 'normal',
  },
  fontWeight: 'bold',
}))