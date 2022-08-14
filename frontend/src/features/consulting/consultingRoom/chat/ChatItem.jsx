import React from 'react';

import { Grid, Box, styled } from '@mui/material'
import OtherAvatar from 'common/avatar/OtherAvatar'

const ChatItem = ({
  avatar,
  message,
  side
}) => {
  return (
    <GridContainer
      container
      justifyContent={side === 'right' ? 'flex-end' : 'flex-start'}
    >
      {side === 'left' && (
        <Grid item sx={{marginRight:"4px"}}>
          <OtherAvatar
            setSize={4}
            imgUrl={avatar}
          />
        </Grid>
      )}
      <Grid item xs={8}>
        <MessageBox side={side}>
          <Message side={side}>{message}</Message>
        </MessageBox>
      </Grid>
    </GridContainer>
  );
};

export default ChatItem;

ChatItem.defaultProps = {
  avatar: '/images/default/avatar20.png',
  message: '',
  side: 'left',
};

const GridContainer = styled(Grid)({
  width: "100%"
})

const MessageBox = styled(Box)((props) => ({
  backgroundColor: (props.side === 'left' ? "#FFFFFF90" : "#3f51b5"),
  padding: "0.4rem 1rem",
  borderRadius: "1rem",
}))

const Message = styled('p')((props) => ({
  color: (props.side === "right" ? "#FFFFFF" : "#3f51b5"),
  fontSize: '1.2rem'
}))