import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { Grid, Button, CardActions, CardContent, Card, Typography, CardActionArea, styled, Box } from '@mui/material';
import BasicRating from './StarRating'
import { deleteReviewFetch, updateReviewFetch, myReviewFetch } from 'features/mypage/mypageSlice'
import { isEmpty } from 'lodash'
import OtherAvatar from 'common/avatar/OtherAvatar';

const MyReview = () => {
  const dispatch = useDispatch();
  const reviews = useSelector(state => state.mypage.myReviewsData);
  const [iscomment, setComment] = useState('')
  const [isstar, setStar] = useState('')
  const [isReviewId, setIsReviewId] = useState(false)

  useEffect(() => {
    dispatch(myReviewFetch())
  }, [])

  const onSubmit = (event) => {
    event.preventDefault();
    const data = {
      star: isstar,
      comment: iscomment,
      reviewId: isReviewId
    }
    if (data.comment.length < 10) {
      alert('10자이상 입력해 주세요')
    } else if (data.comment.length > 1000) {
      alert('1000자 미만 입력해주세요.')
    } else {
      dispatch(updateReviewFetch(data))
			.then(({payload})=> {
				if(payload===false){
					return
				}else{
					setIsReviewId(false)
					setComment('')
					setStar('')
				}
			})
    }
  }

  return (<>
    <Div>
      {isEmpty(reviews) ? <h2>내가 작성한 리뷰가 없습니다.</h2> : reviews.map(({ reviewId, consultantNickname, consultantImageUrl, star, comment, reviewDate }, index) => (
        <form onSubmit={onSubmit} key={index}>
				<SetCard variant="outlined" key={index}>
				<CardActionArea>
				<CardContent>
				<Grid container>

					{/* 그리드 1 */}
					<ImgGrid item xs={12} sm={3}>
						<OtherAvatar setSize={14} imgUrl={consultantImageUrl} />
					</ImgGrid>

					{/* 그리드 2 */}
					<Grid item xs={12} sm={9}>
						{/* 컨설턴트정보, 날짜 */}
						<Forflex>
							<MainText>
								{consultantNickname}님에게 남긴 후기 | 
								{reviewDate}일
							</MainText>
						</Forflex>
						{/* 리뷰 박스 */}
						<ReviewBox>
							<BasicRating star={star} reviewId={reviewId} isReviewId={isReviewId}
								setstar={setStar} key={star} />
							<ReviewText name="isComment" readOnly={isReviewId === reviewId ? false : true} defaultValue={comment}
								onChange={(e) => setComment(e.target.value)} style={{ backgroundColor: isReviewId !== reviewId ? 'white' : '#eeeeee' }}>
							</ReviewText>
						</ReviewBox>
					</Grid>	

				</Grid>
				</CardContent>
				</CardActionArea>

				{/* 카드 액션부분 */}
				<CardActions sx={{display: 'flex', justifyContent: 'end'}}>
					{/* 수정 */}
					<Button color="primary" sx={{ display: isReviewId === reviewId ? 'none' : 'inline-block' }}
						disabled={isReviewId ? true : false}
						onClick={(e) => {
							// 현재 클릭된 리뷰와 데이터 맞춰주는 역할.
							setIsReviewId(reviewId); e.stopPropagation();
							setComment(!iscomment ? comment : iscomment); setStar(!isstar ? star : isstar); 
							setIsReviewId(!isReviewId ? reviewId : isReviewId)
						}}>
						수정
					</Button>
					<Button type="submit" sx={{ display: isReviewId !== reviewId ? 'none' : 'inline-block' }}>수정완료</Button>
					{/* 삭제 */}
					<Button
						color="error"
						onClick={(e) => {
							if (window.confirm("정말 삭제하시겠습니까?")) {
								dispatch(deleteReviewFetch(reviewId))
								.then(() => {
									dispatch(myReviewFetch())
								})
							} else {
								return
							}
						}}>
						리뷰 삭제
					</Button>
				</CardActions>

				</SetCard>
        </form>
      ))}
    </Div>
  </>)
}

export default MyReview

const Div = styled('div')({
	maxWidth: '100%',
	display: 'flex',
	flexDirection: 'column-reverse',
	gap: 10 ,
})

const SetCard = styled(Card)({
  marginBottom: 5,
  borderRadius: '1rem',
})


const ImgGrid = styled(Grid)({
  display:'flex',
	justifyContent: 'center',
	alignItems: 'start',
})

const ReviewBox = styled(Box)({
  border: '1px dashed #ADBED2',
  borderRadius: 5,
  padding: 10,
})


const Forflex = styled('div')({
	display:'flex',
	justifyContent: 'space-between',
	alignItems: 'end',
	padding: 10,
})

const MainText = styled(Typography)({
	fontSize: 20,
	fontWeight: 'bold',
})

const ReviewText = styled('textarea')({
	fontSize: 15,
	border: 'none',
	backgroundColor: '#FFFFFF00',
	height: '100%',
	width: '100%',
	resize: 'none',
})
