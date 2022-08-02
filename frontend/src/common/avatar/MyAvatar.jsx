import React from 'react'
import { useSelector } from 'react-redux'

import { Avatar, Button, styled } from '@mui/material'

const MyAvatar = (
  setSize,
) => {
  const { nickname, imageUrl } = useSelector((state) => state.auth.logonUser)
  const handleAvatar = (e) => {
    console.log("타겟", e.target.src)
    console.log("주소", imageUrl)
  }
  const modiNick = useSelector((state) => state.auth.common.nickname)
  const modiImage = useSelector((state) => state.auth.common.imageUrl)

  // 닉네임과 아바타 변경 감지하기 modify -> logonUser
  if (nickname !== modiNick || imageUrl !== modiImage) {

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