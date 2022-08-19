import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Link } from 'react-router-dom';
import { CardActionArea, styled } from '@mui/material';
import StarRating from './StarRating'
import OtherAvatar from '../../../common/avatar/OtherAvatar'

const ConsultantListItem = ({ consultantId, nickname, introduction, starAverage, reviewCount, cost, imageUrl }) => {
  const iscost = cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')

	return (<>
	<Link to={`/consultants/detail/${consultantId}`}>
		<CardItem>
			<CardActionArea>
				<div style={{display:'flex', justifyContent:'center', marginTop: 9}}>
					<OtherAvatar imgUrl={imageUrl} setSize={14} />
				</div>
				<CardContent>
					{/* 닉네임 */}
					<Nickname>
						컨설턴트
						<span style={{fontSize:20}}> {nickname}</span>
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
						가격: {cost ? iscost + ' 원': '등록된 비용이 없습니다.'}
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
  paddingTop: 5,
	height: 58,
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
