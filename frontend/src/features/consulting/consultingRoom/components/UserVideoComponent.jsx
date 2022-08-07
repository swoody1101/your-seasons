import React from 'react';
import OpenViduVideoComponent from './OvVideo';

import { Box, styled, Typography } from '@mui/material'

const UserVideoComponent = ({ streamManager }) => {
  const getNicknameTag = () => {
    // Gets the nickName of the user
    return JSON.parse(streamManager.stream.connection.data).clientData;
  }

  return (
    <div>
      {streamManager !== undefined ? (
        <StreamBox>
          <OpenViduVideoComponent streamManager={streamManager} />
          <Typography>{getNicknameTag()}</Typography>
        </StreamBox>
      ) : null}
    </div>
  );
}

export default UserVideoComponent

const StreamBox = styled(Box)({
  width: '100%',
  video: {
    width: '100%',
  }
})