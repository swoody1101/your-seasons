import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Link } from 'react-router-dom';
import { CardActionArea, CardActions, styled } from '@mui/material';

import StarRating from './StarRating'
import { useNavigate } from 'react-router';


const ConsultantListItem = ({ consultantId, nickname, introduction, reviewCount, starAverage, cost, imageUrl }) => {
	const navigate = useNavigate();

	return (<>
		<Link to={`detail/${consultantId}`}>
			<Card sx={{ maxWidth: 300, maxHeight: 330 }} onClick={() => navigate(`detail/${consultantId}`)}>
				<CardActionArea>
					<div style={{ display: 'flex', justifyContent: 'center' }}>
						<img src={imageUrl} style={{ height: 140 }} />
					</div>
					{/* <p>인덱스확인 : {consultantId}</p> */}
					<CardContent>
						{/* 닉네임 */}
						<Nickname>
							컨설턴트
							<span style={{ fontSize: 20 }}>{nickname}</span>
						</Nickname>
						{/* 소개 */}
						<Introduce>
							{introduction}
						</Introduce>
						{/* 별점 */}
						<StarRating starAverage={starAverage} />
						{/* 리뷰 */}
						<Review>
							리뷰개수: {reviewCount}
						</Review>
						{/* 가격 */}
						<Cost>
							가격: {cost}
						</Cost>
					</CardContent>
				</CardActionArea>
				<CardActions>
					{/* <Button size="small" color="primary">
					Share
				</Button> */}
				</CardActions>
			</Card>
		</Link>
	</>)
}

export default ConsultantListItem


const Introduce = styled('div')({
	display: "-webkit-box",
	WebkitBoxOrient: "vertical",
	WebkitLineClamp: "1",
	overflow: "hidden"
})

const Nickname = styled('span')({
	display: "-webkit-box",
	WebkitBoxOrient: "vertical",
	WebkitLineClamp: "1",
	overflow: "hidden",
	fontSize: 15,
})

const Review = styled('span')({
	display: "-webkit-box",
	WebkitBoxOrient: "vertical",
	WebkitLineClamp: "1",
	overflow: "hidden",
	fontSize: 12,
})

const Cost = styled('span')({
	display: "-webkit-box",
	WebkitBoxOrient: "vertical",
	WebkitLineClamp: "1",
	overflow: "hidden",
	fontSize: 12,
})
