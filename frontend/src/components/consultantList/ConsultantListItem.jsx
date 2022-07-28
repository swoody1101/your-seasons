import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
// 소개 글자수 제한
import tmpImg from '../../assets/images/ancun.png'


const ConsultantListItem = ({consultantId, nickname, introduction, reviewCount, starAverage, cost, imageUrl }) => {
	return (<>
	
			<Card sx={{ maxWidth: 345 }}>
				<CardActionArea>
					<CardMedia
						component="img"
						height="140"
						image={tmpImg}  //{imageUrl}
						alt="green iguana"
					/>
					<CardContent>
						<Typography gutterBottom variant="h5" component="div">
							{nickname}
							{consultantId}
						</Typography>
						<Typography variant="body2" color="text.secondary">
							소개: {introduction}
							리뷰개수: {reviewCount}
							별점: {starAverage}
							가격: {cost}
						</Typography>
					</CardContent>
				</CardActionArea>
				<CardActions>
					<Button size="small" color="primary">
						Share
					</Button>
				</CardActions>
			</Card>
</>	)
}

export default ConsultantListItem