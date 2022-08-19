import React from 'react';
import OpenViduVideoComponent from './OvVideo';

import { Box, styled, Typography } from '@mui/material'
import { CUSTOMER, CONSULTANT } from 'api/CustomConst'

import CoverFilter from './CoverFilter'

const UserVideoComponent = ({ streamManager }) => {
  const subRole = JSON.parse(streamManager.stream.connection.data).clientRole;

  const getNicknameTag = () => {
    return JSON.parse(streamManager.stream.connection.data).clientData;
  }


  return (
    <div>
      {streamManager !== undefined ? (
        <>
          {subRole === CONSULTANT &&
            <ConsultantStream>
              <CustomTypography>{getNicknameTag()} 컨설턴트</CustomTypography>
              <OpenViduVideoComponent streamManager={streamManager} />

            </ConsultantStream>
          }
          {subRole === CUSTOMER &&
            <CustomerStream>
              <div style={{ position: 'relative', }}>
                <OpenViduVideoComponent streamManager={streamManager} />
                <CoverFilter />
              </div>
              <CustomTypography>{getNicknameTag()} 님</CustomTypography>
            </CustomerStream>
          }
        </>
      ) : null}
    </div>
  );
}

export default UserVideoComponent

const ConsultantStream = styled(Box)({
  width: '100%',
  overflow: "hidden",
  border: '2px solid #5A4D4D99',
  borderRadius: '10px',
  video: {
    width: '100%',
  }
})

const CustomerStream = styled(Box)({
  width: '100%',
  overflow: "hidden",
  border: '2px solid #5A4D4D80',
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