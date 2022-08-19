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
  position: 'relative',
  width: '100%',
  overflow: "hidden",
  backgroundColor: "#FAFAFA",
  border: '2px solid #5A4D4D60',
  borderRadius: '10px',
  video: {
    width: '100%',
  }
})

const CustomTypography = styled(Typography)({
  color: "#5A4D4D",
  fontSize: '1rem',
  fontWeight: 'bold',
  textAlign: 'center',
})