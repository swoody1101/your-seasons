import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { Button, CardActions, CardContent, Card, Typography, Avatar, CardActionArea } from '@mui/material';
import styled from '@emotion/styled'
import BasicRating from './StarRating'
import { myReviewFetch, deleteReviewFetch, updateReviewFetch } from './myReviewSlice'
// post시 필요한 정보 추후 고려(date)


var today = new Date();

var year = today.getFullYear();
var month = ('0' + (today.getMonth() + 1)).slice(-2);
var day = ('0' + today.getDate()).slice(-2);
var dateString = year + '-' + month  + '-' + day;

var hours = ('0' + today.getHours()).slice(-2); 
var minutes = ('0' + today.getMinutes()).slice(-2);
var seconds = ('0' + today.getSeconds()).slice(-2); 
var timeString = hours + ':' + minutes  + ':' + seconds;


const MyReview = () => {
  const dispatch = useDispatch();
	const reviews = useSelector(state=>state.myReviews.data);
	const [iscomment, setComment] = useState('')
	const [isstar, setStar] = useState('')
	const [isReviewId, setIsReviewId] = useState(false)
	const onSubmit = (event) => {
		event.preventDefault();
		const data = {
			star: isstar,
			comment: iscomment,     
			reviewDate: dateString + ' ' + timeString,  
		}
			console.log('수정요청');
			dispatch(updateReviewFetch(data))
			console.log(data)
			setIsReviewId(false)
	}
	console.log(reviews)
	
	return (<>
		<Div>
		{reviews.map(({ reviewId, consultantNickname, consultantImageUrl, star, comment, reviewDate }, index)=>(
		<form onSubmit={onSubmit}>
    <Card sx={{ marginBottom:5, padding:1, borderRadius: 5}} variant="outlined" className="history-card" key={index}>
			<CardActionArea>
				<CardContent>
					{/* 컨설턴트정보, 날짜 */}
					<Avatar src={consultantImageUrl} sx={{ width: 100, height: 100, marginBottom:1 }} alt="컨설턴트프로필"/>
					<Forflex>
						<Typography gutterBottom variant="h6" component="div">
							{consultantNickname} 컨설턴트님
						</Typography>
						<Typography gutterBottom variant="h6" component="div" >
							{reviewDate}일 
						</Typography>
					</Forflex>
					<RequestBox>
						{/* <Typography sx={{marginBottom:1}}>후기 작성</Typography> */}
						<BasicRating star={star} reviewId={reviewId} isReviewId={isReviewId}
							setstar={setStar}	key={star} /> 
						<RequestText name="isComment" readOnly={isReviewId===reviewId ? false : true} defaultValue={comment}
							onChange={(e)=>setComment(e.target.value)} style={{backgroundColor: isReviewId!==reviewId ? 'white' : '#cfe8fc'}}>
						</RequestText>
					</RequestBox>
					
				</CardContent>
			</CardActionArea>
			<CardActions>
				<div id="request-submitbtn">
					<Button color="primary" sx={{display: isReviewId===reviewId ? 'none' : 'inline-block'}}
						disabled={isReviewId ? true : false}
						onClick={(e) => { setIsReviewId(reviewId); e.stopPropagation(); 
						setComment(!iscomment? comment: iscomment); setStar(!isstar ? star:isstar) }}>
						수정
					</Button>
					<Button type="submit" sx={{display: isReviewId!==reviewId ? 'none' : 'inline-block'}}>수정완료</Button>
					<Button color="error" onClick={() => dispatch(deleteReviewFetch(reviewId))}>
						리뷰 삭제
					</Button>
				</div>
			</CardActions>
	</Card>
	</form>
	))}
	</Div>
</>)
}

//  onchane 기본값, 수정 버튼....
export default MyReview


const Div = styled.div`
	max-width:700px;
	margin:auto;
	display:flex;
	flex-direction: column-reverse;
`

const RequestBox = styled.div`
	border: 1px dashed #ADBED2;
	border-radius: 5px;
	padding: 10px;
`

const Forflex = styled.div`
	display:flex;
	justify-content: space-between;
	align-items: end;
	padding: 10px;
`

const RequestText = styled.textarea`
	font-family: Roboto;
	font-size: 15px;
	border: none;
	background-color: white;
	height: 100px;
	width: 100%;
	resize: none;
`

// const RequestBox = styled(textarea)({
// 	border: '1px dashed #ADBED2',
// 	borderRadius: '5px',
// 	padding: '10px',
// })

