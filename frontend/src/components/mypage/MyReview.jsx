import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { Button, CardActions, CardContent, Card, Typography, Avatar, CardActionArea, styled } from '@mui/material';
import BasicRating from './StarRating'
import { deleteReviewFetch, updateReviewFetch } from './myPageSlice'


const MyReview = () => {
  const dispatch = useDispatch();
	const reviews = useSelector(state=>state.customerMyPage.myReviewsData);
	const [iscomment, setComment] = useState('')
	const [isstar, setStar] = useState('')
	const [isReviewId, setIsReviewId] = useState(false)
	const onSubmit = (event) => {
		event.preventDefault();
		const data = {
			star: isstar,
			comment: iscomment,
			reviewId: isReviewId
		}
			if(data.comment.length<10){
				alert('10자이상 입력해 주세요')
			}else if(data.comment.length>1000){
				alert('1000자 미만 입력해주세요.')
			}else{
				dispatch(updateReviewFetch(data))
				console.log(data)
				setIsReviewId(false)
				setComment('')
				setStar('')
			}
	}
	
	return (<>
		<Div>
		{reviews.map(({ reviewId, nickname, imageUrl, star, comment, reviewDate }, index)=>(
		<form onSubmit={onSubmit} key={index}>
    <Card sx={{ marginBottom:5, padding:1, borderRadius: 5}} variant="outlined" className="history-card" key={index}>
			<CardActionArea>
				<CardContent>
					{/* 컨설턴트정보, 날짜 */}
					<Avatar src={imageUrl} sx={{ width: 100, height: 100, marginBottom:1 }} alt="컨설턴트프로필"/>
					<Forflex>
						<Typography gutterBottom variant="h6" component="div">
							{nickname} 컨설턴트님
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
						setComment(!iscomment? comment: iscomment); setStar(!isstar ? star:isstar); setIsReviewId(!isReviewId ? reviewId:isReviewId) }}>
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

export default MyReview


const Div = styled('div')`
	max-width:700px;
	margin:auto;
	display:flex;
	flex-direction: column-reverse;
`

const RequestBox = styled('div')`
	border: 1px dashed #ADBED2;
	border-radius: 5px;
	padding: 10px;
`

const Forflex = styled('div')`
	display:flex;
	justify-content: space-between;
	align-items: end;
	padding: 10px;
`

const RequestText = styled('textarea')`
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

