import React from 'react'
import { Avatar, styled } from '@mui/material'

const MyAvatar = (
  { setSize, imgUrl }
) => {

	return (
    <SetAvatar si={setSize}>
			<img src={imgUrl} alt='' />
    </SetAvatar>
  )
}

export default MyAvatar

const SetAvatar = styled(Avatar)((props) => ({
  backgroundColor: "pink",
  width: `${props.si * 10}px`,
  height: `${props.si * 10}px`,
  img: {
    backgroundColor: 'white',
    borderRadius: "100%",
    width: `${props.si * 9}px`,
    height: `${props.si * 9}px`,
  }
}))