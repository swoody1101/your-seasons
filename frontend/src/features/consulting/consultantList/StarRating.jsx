import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';

export default function BasicRating({ starAverage, reviewCount }) {
  const [value, setValue] = useState(starAverage);

  return (
    <Box
      sx={{
        '& > legend': { mt: 2 },
      }}
    >
			<div style={{ backgroundColor: 'white', width: '80%', display:'flex', justifyContent:'center'}}>
				<div style={{display:'flex', alignContent:'center'}}><p style={{ marginTop:7, paddingLeft:2, marginRight:5}}>  </p> <Rating name="read-only" value={value} readOnly /> </div>
			</div>
    </Box>
  );
}