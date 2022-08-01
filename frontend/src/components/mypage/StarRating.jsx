import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

export default function BasicRating({ setstar, star, reviewId, isReviewId}) {
  const [value, setValue] = useState(star);

  return (
    <Box
      sx={{
        '& > legend': { mt: 2 },
      }}
    >
			<div style={{display: isReviewId!==reviewId ? 'none' : '' }}>
				<Typography component="legend" >별점 수정</Typography>
				<Rating
					name="simple-controlled"
					value={value}
					setstar={star}
					onClick={e=> {
						setValue(e.target.value);
						setstar(Number(e.target.value));
					}}

					disabled={ isReviewId===reviewId ? false: true }
					/>
			</div>

			<div style={{marginBottom:8 ,display: isReviewId!==reviewId ? '' : 'none' }}>
				{/* <Typography component="legend">별점</Typography> */}
				<div style={{display:'flex', alignContent:'center'}}><p style={{marginTop:7, paddingLeft:2, marginRight:5}}>  별점:  </p> <Rating name="read-only" value={value} readOnly /> </div>
			</div>
    </Box>
  );
}