import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';

export default function BasicRating({ starAverage }) {
  const [value, setValue] = useState(starAverage);

  return (
    <Box
      sx={{
        '& > legend': { mt: 2 },
      }}
    >
			<div style={{marginBottom:7, backgroundColor: 'gray', borderRadius: 10, width: '80%', display:'flex', justifyContent:'center'}}>
				<div style={{display:'flex', alignContent:'center'}}><p style={{ marginTop:7, paddingLeft:2, marginRight:5}}>  </p> <Rating name="read-only" value={value} readOnly /> </div>
			</div>
    </Box>
  );
}