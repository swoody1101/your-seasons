import React from 'react'
import { useSelector } from 'react-redux';

import { Stack, styled } from '@mui/material'
import ChatItem from './ChatItem'

const ChatList = () => {
  const { messageList } = useSelector(state => state.consult)

  const msgSetting = () => {
    const msgList = []
    for (let i = 0; i < messageList.length; i++) {
      msgList.push(
        <ChatItem
          key={messageList[i].id}
          avatar={messageList[i].imageUrl}
          side={messageList[i].side ?? 'left'}
          message={messageList[i].message}
        />
      )
    }

    return msgList;
  }

  return (
    <ListBox
      direction="column"
      justifyContent="flex-end"
      spacing={0.5}
    >
      {msgSetting()}
    </ListBox>
  )
}

export default ChatList

const ListBox = styled(Stack)({
  width: "100%",
  height: "100%"
})

