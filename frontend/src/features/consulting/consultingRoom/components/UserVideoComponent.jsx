import React from 'react';
import OpenViduVideoComponent from './OvVideo';

import { Box, styled, Typography } from '@mui/material'
import { CUSTOMER } from 'api/CustomConst'

import CoverFilter from './CoverFilter'

const UserVideoComponent = ({ streamManager }) => {
  const subRole = JSON.parse(streamManager.stream.connection.data).clientRole;

  const getNicknameTag = () => {
    // Gets the nickName of the user
    return JSON.parse(streamManager.stream.connection.data).clientData;
  }

  return (
    <div>
      {streamManager !== undefined ? (
        <StreamBox>
          <Typography>{getNicknameTag()}</Typography>
          <OpenViduVideoComponent streamManager={streamManager} />
          {subRole === CUSTOMER &&
            <CoverFilter />
          }
        </StreamBox>
      ) : null}
    </div>
  );
}

export default UserVideoComponent

const StreamBox = styled(Box)({
  position: "relative",
  width: '100%',
  video: {
    width: '100%',
  }
})