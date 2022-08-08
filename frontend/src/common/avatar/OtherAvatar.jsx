import React from 'react'
import { Avatar, styled } from '@mui/material'

// 이미지 프롭으로 내려주면 받아서 사용
const OtherAvatar = ( {setSize, imgUrl }) => {
	const tmpImg = '/images/default/avatar20.png'

  return (
    <SetAvatar si={setSize}>
        <img src={imgUrl ? imgUrl : tmpImg} alt='img' />
    </SetAvatar>
  )
}

export default OtherAvatar

const SetAvatar = styled(Avatar)((props) => ({
  // backgroundColor: "pink",
  width: `${props.si * 10}px`,
  height: `${props.si * 10}px`,
  img: {
    backgroundColor: 'white',
    borderRadius: "100%",
		// 9px -> 10px
    width: `${props.si * 10}px`,
    height: `${props.si * 10}px`,
  }
}))