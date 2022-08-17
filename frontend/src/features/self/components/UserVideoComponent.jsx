import React from 'react';
import OpenViduVideoComponent from './OvVideo';

import { Box, styled, Typography } from '@mui/material'
import CoverFilter from './CoverFilter'

const UserVideoComponent = ({ streamManager }) => {
  const getNicknameTag = () => {
    return JSON.parse(streamManager.stream.connection.data).clientData;
  }

  return (
    <div>
      {streamManager !== undefined ? (
        <CustomerStream>
          <div style={{ position: 'relative', }}>
            <OpenViduVideoComponent streamManager={streamManager} />
            <CoverFilter />
          </div>
          <CustomTypography>{getNicknameTag()} 님</CustomTypography>
        </CustomerStream>
      ) : null}
    </div>
  );
}

export default UserVideoComponent

const CustomerStream = styled(Box)({
  // height: '70%',
  position: 'relative',
  width: '100%',
  overflow: "hidden",
  backgroundColor: "#F5F5F5",
  border: '2px solid #5A4D4D99',
  borderRadius: '10px',
  // padding: '3px',
  video: {
    width: '100%',
    // height: '70%',
  }
})

const CustomTypography = styled(Typography)({
  color: "#5A4D4D",
  fontSize: '1rem',
  fontWeight: 'bold',
  textAlign: 'center',
})