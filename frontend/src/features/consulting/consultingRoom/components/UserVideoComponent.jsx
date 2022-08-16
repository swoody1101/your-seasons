import React from 'react';
import OpenViduVideoComponent from './OvVideo';

import { Box, styled, Typography } from '@mui/material'

const UserVideoComponent = ({ streamManager, role }) => {
  const getNicknameTag = () => {
    // Gets the nickName of the user
    return JSON.parse(streamManager.stream.connection.data).clientData;
  }


  return (
    <div>
      {streamManager !== undefined ? (
        <>
        {
        role==='CONSULTANT' &&
        <ConsultantStream>
          <OpenViduVideoComponent streamManager={streamManager} />
          <CustomTypography>{getNicknameTag()} 컨설턴트</CustomTypography>
        </ConsultantStream>
        }
        {role!=='CONSULTANT' &&
        <CustomerStream>
          <OpenViduVideoComponent streamManager={streamManager} />
          <CustomTypography>{getNicknameTag()} 님</CustomTypography>
        </CustomerStream>
        }
        </>
      ) : null}
    </div>
  );
}


// <StreamBox>
// <OpenViduVideoComponent streamManager={streamManager} />
// <CustomTypography>{getNicknameTag()} 컨설턴트</CustomTypography>
// </StreamBox>

export default UserVideoComponent

const ConsultantStream = styled(Box)({
  // height: '70%',
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

const CustomerStream = styled(Box)({
  // height: '70%',
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
  color: "#5A4D4D" ,
  fontSize: '1rem',
  fontWeight: 'bold',
  textAlign: 'center',
})