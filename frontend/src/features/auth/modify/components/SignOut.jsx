import React from 'react'
import { Box, Typography, ButtonGroup } from '@mui/material'
import SignOutModal from './SignOutModal';

const SignOut = () => {

  return (
    <Box
      fullWidth
      p={2}
    >
      <Typography
        sx={{ color: 'orange', fontSize: '2rem' }}
      >정말로 탈퇴하시겠습니까?</Typography>
      <ButtonGroup
        sx={{
          marginTop: '4rem',
          display: "flex",
          flexDirection: "row",
          justifyContent: "end",
        }}
      >
        <SignOutModal></SignOutModal>
      </ButtonGroup>
    </Box >
  )
}

export default SignOut