import React, { useState } from 'react'
import { useDispatch } from 'react-redux';


import {
  Grid, ButtonGroup, Button, Typography
} from '@mui/material'

import MyAvatar from 'common/avatar/MyAvatar';
import { modalOn } from 'features/auth/authSlice';

const ModifyAvatar = () => {
  const [isDirect, setIsDirect] = useState(false)
  const dispatch = useDispatch();
  const handleChangeImage = (e) => {
    // 파일전송은 추후
    console.log(e)
  }


  const handleSample = () => {
    dispatch(modalOn())
  }

  return (
    <Grid container item sm={4} gap={3}
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <MyAvatar
        setSize={22} />
      {isDirect
        ?
        <ButtonGroup
          orientation="vertical"
        >
          <Button
            component="label">
            <Typography>{"파일선택"}</Typography>
            <input id={"file-input"}
              style={{ display: 'none' }}
              type="file" name="imageFile"
              onChange={handleChangeImage} />
          </Button>
          <Button
            onClick={() => setIsDirect(!isDirect)}
          ><Typography>{"취소"}</Typography></Button>
        </ButtonGroup>
        :
        <ButtonGroup
          orientation="vertical"
        >
          <Button
            onClick={() => setIsDirect(!isDirect)}
          ><Typography>{"직접등록"}</Typography></Button>
          <Button
            onClick={handleSample}
          >
            <Typography>{"기본사진"}</Typography>
          </Button>
        </ButtonGroup>
      }
    </Grid >
  )
}

export default ModifyAvatar
