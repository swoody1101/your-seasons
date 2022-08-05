import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Link } from 'react-router-dom';
import { CardActionArea, CardActions, styled } from '@mui/material';
import StarRating from './StarRating'

const ConsultantListItem = ({ consultantId, nickname, introduction, starAverage, reviewCount, cost, imageUrl }) => {

	return (<>
	<Link to={`/consultants/detail/${consultantId}`}>
		<CardItem>
			<CardActionArea>
				<div style={{display:'flex', justifyContent:'center'}}>
					<img src={imageUrl} style={{height:140}} />
				</div>
				<CardContent>
					{/* 닉네임 */}
					<Nickname>
						컨설턴트
						<span style={{fontSize:20}}>{nickname}</span>
					</Nickname>
					{/* 별점 */}
					<StarReview>
						<StarRating starAverage={starAverage}/>
						<ReviewCount>({reviewCount})</ReviewCount>
					</StarReview>
					{/* 소개 */}
					<IntroduceDiv>
						<Introduce>
							{introduction}
						</Introduce>
					</IntroduceDiv>
					{/* 가격 */}
					<Cost>
						가격: {cost}
					</Cost>
				</CardContent>
			</CardActionArea>
		</CardItem>
	</Link>
</>)
}
export default ConsultantListItem

const CardItem = styled(Card)({
	width: 250, 
	height: 300, 
	boxSizing: 'border-box',
})


const IntroduceDiv = styled('div')({
	height: 40,
	// backgroundColor: 'pink',
})

const Introduce = styled('div')({
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: "2",
  overflow: "hidden"
})

const Nickname = styled('span')({
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: "1",
  overflow: "hidden",
	fontSize: 15,
})

const StarReview = styled('div')({
  display: "flex",
	justifyContent: "start",
	alignItems: 'center',
	overflow: "hidden",
	fontSize: 12,
})

const ReviewCount = styled('div')({
	fontSize: 13,
	fontWeight: 'bold',
	marginLeft: -5,
})

const Cost = styled('span')({
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: "1",
  overflow: "hidden",
	fontSize: 12,
})
