import React from 'react'
import { useSelector } from 'react-redux'

import { Avatar, styled } from '@mui/material'

const MyAvatar = (
  setSize,
) => {
  const { imageUrl } = useSelector((state) => state.auth.logonUser)

  return (
    <SetAvatar si={setSize}>
			<img src={imageUrl} alt='' />
    </SetAvatar>
  )
}

export default MyAvatar

const SetAvatar = styled(Avatar)((props) => ({
  backgroundColor: "pink",
  width: `${props.si.setSize * 10}px`,
  height: `${props.si.setSize * 10}px`,
  img: {
    backgroundColor: 'white',
    borderRadius: "100%",
    width: `${props.si.setSize * 9}px`,
    height: `${props.si.setSize * 9}px`,
  }
}))