import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { Button, CardActions, CardContent, Card, Typography, Avatar, CardActionArea, styled } from '@mui/material';
import BasicRating from './StarRating'
import { deleteReviewFetch, updateReviewFetch, myReviewFetch } from 'features/mypage/mypageSlice'
import { isEmpty } from 'lodash'

const MyReview = () => {
  const dispatch = useDispatch();
  const reviews = useSelector(state => state.mypage.myReviewsData);
  const [iscomment, setComment] = useState('')
  const [isstar, setStar] = useState('')
  const [isReviewId, setIsReviewId] = useState(false)

	// 처음에 reviews가 두번 찍혀서 주석처리 해둠. 아직 진단기록에 따른 후기는 테스트해보지 못함.
  // useEffect(() => {
  //   dispatch(myReviewFetch())
  // }, [])

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
      setIsReviewId(false)
      setComment('')
      setStar('')
    }
  }

  return (<>
    <Div>
      {isEmpty(reviews) ? <h2>내가 작성한 리뷰가 없습니다.</h2> : reviews.map(({ reviewId, consultantNickname, consultantImageUrl, star, comment, reviewDate }, index) => (
        <form onSubmit={onSubmit} key={index}>
          <Card sx={{ marginBottom: 5, padding: 1, borderRadius: 5 }} variant="outlined" className="history-card" key={index}>
            <CardActionArea>
              <CardContent>
                {/* 컨설턴트정보, 날짜 */}
                <Avatar src={consultantImageUrl} sx={{ width: 100, height: 100, marginBottom: 1 }} alt="컨설턴트프로필" />
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
                    setstar={setStar} key={star} />
                  <RequestText name="isComment" readOnly={isReviewId === reviewId ? false : true} defaultValue={comment}
                    onChange={(e) => setComment(e.target.value)} style={{ backgroundColor: isReviewId !== reviewId ? 'white' : '#cfe8fc' }}>
                  </RequestText>
                </RequestBox>

              </CardContent>
            </CardActionArea>
            <CardActions>
              <div id="request-submitbtn">
                <Button color="primary" sx={{ display: isReviewId === reviewId ? 'none' : 'inline-block' }}
                  disabled={isReviewId ? true : false}
                  onClick={(e) => {
                    setIsReviewId(reviewId); e.stopPropagation();
                    setComment(!iscomment ? comment : iscomment); setStar(!isstar ? star : isstar); setIsReviewId(!isReviewId ? reviewId : isReviewId)
                  }}>
                  수정
                </Button>
                <Button type="submit" sx={{ display: isReviewId !== reviewId ? 'none' : 'inline-block' }}>수정완료</Button>
                <Button
                  color="error"
                  onClick={() => {
                    dispatch(deleteReviewFetch(reviewId))
                      .then(() => {
                        dispatch(myReviewFetch())
                      })
                  }}>
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

const Div = styled('div')({
	maxWidth: '100%',
	margin: 'auto',
	display: 'flex',
	flexDirection: 'column-reverse',
})

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

