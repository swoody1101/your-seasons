import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, styled } from '@mui/material';
import StarRating from './StarRating'
import tmpImg from '../../assets/images/ancun.png'


const ConsultantListItem = ({consultantId, nickname, introduction, reviewCount, starAverage, cost, imageUrl }) => {

	return (<>
		<Card sx={{ maxWidth: 300, maxHeight: 330 }}>
			<CardActionArea>
			<div style={{display:'flex', justifyContent:'center'}}>
				<img src={tmpImg} style={{height:140}} />
			</div>
			{/* <p>인덱스확인 : {consultantId}</p> */}
			<CardContent>
				{/* 닉네임 */}
				<div style={{display:'flex', alignItems: 'center'}}>
					<span>컨설턴트</span>
					<Nickname>{nickname} </Nickname>
				</div>
				{/* 소개 */}
				<Introduce>
					{introduction}
				</Introduce>
				{/* 별점 */}
				<StarRating starAverage={starAverage}/>
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
</>	)
}

export default ConsultantListItem


const Introduce = styled('div')({
  display: "-webkit-box",
  "-webkit-box-orient": "vertical",
  "-webkit-line-clamp": "1",
  overflow: "hidden"
})

const Nickname = styled('span')({
  display: "-webkit-box",
  "-webkit-box-orient": "vertical",
  "-webkit-line-clamp": "1",
  overflow: "hidden",
	fontSize: 20,
})

const Review = styled('span')({
  display: "-webkit-box",
  "-webkit-box-orient": "vertical",
  "-webkit-line-clamp": "1",
  overflow: "hidden",
	fontSize: 12,
})

const Cost = styled('span')({
  display: "-webkit-box",
  "-webkit-box-orient": "vertical",
  "-webkit-line-clamp": "1",
  overflow: "hidden",
	fontSize: 12,
})
