import React from 'react'
import { useSelector } from 'react-redux'

import { Avatar, Button, styled } from '@mui/material'

const MyAvatar = (
  setSize,
) => {
  const { imageUrl } = useSelector((state) => state.auth.logonUser)
  const handleAvatar = (e) => {
    console.log("타겟", e.target.src)
    console.log("주소", imageUrl)
  }


  return (
    <SetAvatar si={setSize}>
      <Button onClick={handleAvatar}>
        <img src={imageUrl} alt='' />
      </Button>
    </SetAvatar>
  )
}

export default MyAvatar

const SetAvatar = styled(Avatar)((props) => ({
  backgroundColor: "skyblue",
  width: `${props.si.setSize * 10}px`,
  height: `${props.si.setSize * 10}px`,
  img: {
    backgroundColor: 'white',
    borderRadius: "100%",
    width: `${props.si.setSize * 9}px`,
    height: `${props.si.setSize * 9}px`,
  }
}))