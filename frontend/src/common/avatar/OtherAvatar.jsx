import React from 'react'

import { Avatar, styled } from '@mui/material'

// 이미지 프롭으로 내려주면 받아서 사용
const OtherAvatar = ( setSize, imageUrl) => {
	
  return (
    <SetAvatar si={setSize}>
        <img src={imageUrl} alt='img' />
    </SetAvatar>
  )
}

export default OtherAvatar

const SetAvatar = styled(Avatar)((props) => ({
  // backgroundColor: "pink",
  width: `${props.si.setSize * 10}px`,
  height: `${props.si.setSize * 10}px`,
  img: {
    backgroundColor: 'white',
    borderRadius: "100%",
		// 9px -> 10px
    width: `${props.si.setSize * 10}px`,
    height: `${props.si.setSize * 10}px`,
  }
}))