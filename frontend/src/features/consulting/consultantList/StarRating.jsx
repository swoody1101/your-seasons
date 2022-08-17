import React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';

export default function BasicRating({ starAverage }) {

  return (
    <Box
      sx={{
        '& > legend': { mt: 2 },
      }}
    >
			<div style={{ backgroundColor: 'white', width: '80%', display:'flex', justifyContent:'center'}}>
				<div style={{display:'flex', alignContent:'center'}}><p style={{ marginTop:7, paddingLeft:5, marginRight:5}}>  </p> <Rating name="read-only" value={starAverage} readOnly/> </div>
			</div>
    </Box>
  );
}