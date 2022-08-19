import React, { useState } from 'react';
import { Button, Box, Rating, Modal } from '@mui/material';
import { useDispatch } from 'react-redux/es/exports';
import { createReviewFetch } from 'features/mypage/mypageSlice';


// 스타레이팅
const BasicRating = ({ setIsStar }) => {
  const [value, setValue] = useState(5)

  return (
    <Box
      sx={{
        '& > legend': { mt: 2 },
      }}
    >
      <div style={{ display: 'flex', alignContent: 'center' }}>
        <span style={{ marginTop: 7, paddingLeft: 2, marginRight: 5 }}>별점: </span>
        <Rating
          name="simple-controlled"
          value={Number(value) || 0}
          onClick={e => {
            setValue(e.target.value)
            setIsStar(e.target.value)
          }}
        />
      </div>
    </Box>
  );
}


// 모달 스타일
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  maxWidth: '90%',
  bgcolor: 'background.paper',
  borderRadius: '2%',
  border: '2px #000',
  boxShadow: 24,
  p: 3,
};


const ConsultantDiagnosisReview = ({ consultantNickname, consultingId, hasReview }) => {
  const [open, setOpen] = useState(false);
  const [isComment, setComment] = useState('')
  const [isStar, setIsStar] = useState(5)

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const onSubmit = () => {
    const review = {
      star: Number(isStar),
      comment: isComment,
      consultingId: consultingId,
    }
    if (review.comment.length < 10) {
      alert('10자이상 입력해 주세요')
    } else if (review.comment.length > 1000) {
      alert('1000자 미만 입력해주세요.')
    } else {
      dispatch(createReviewFetch(review))
      setIsStar(5)
      setComment('')
      handleClose()
    }
  }

  return (
    <div>
      <Button onClick={handleOpen} disabled={!hasReview ? false : true} sx={{ width:'100vw' }}>리뷰 작성하기</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <p style={{ marginBottom: 3, }}>{consultantNickname} 컨설턴트님께 리뷰를 작성해 보세요 !</p>
          <div style={{ paddingTop: 3 }}>
            <BasicRating setIsStar={setIsStar} />
            <textarea style={{ width: '100%', height: 120, backgroundColor: '#eeeeee', borderRadius: 2, padding: 10 }}
              onChange={(e) => {
                setComment(e.target.value)
              }}>
            </textarea>
          </div>
          <Button onClick={onSubmit} sx={{ width: '100%' }}>리뷰 작성</Button>
        </Box>
      </Modal>
    </div>
  );
}

export default ConsultantDiagnosisReview