import React, { useState, useEffect } from 'react';
import {Typography, Button, Box, Rating, Modal} from '@mui/material';
import { useDispatch } from 'react-redux/es/exports';
import { createReviewFetch } from './myReviewSlice';
import { red } from '@mui/material/colors';


// 스타레이팅

const BasicRating = ({setIsStar}) => {
	const [value, setValue] = useState(5)
	


  return (
    <Box
      sx={{
        '& > legend': { mt: 2 },
      }}
    >
			<div style={{display: 'flex',  alignContent:'center'}}>
				<span style={{marginTop:7, paddingLeft:2, marginRight:5}}>별점: </span>
				<Rating
					name="simple-controlled"
					value={value|| ''}
					onClick={e=> {
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
	maxWidth:'90%',
  bgcolor: 'background.paper',
	borderRadius: '2%', 
  border: '2px #000',
  boxShadow: 24,
  p: 3,
};

const ConsultantDiagnosisReview = ({consultantNickname, consultantId, hasReview}) => {
  const [open, setOpen] = useState(false);
	const [isComment, setComment] = useState('')
	const [isStar, setIsStar] = useState(5)
	

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();

	
	const onSubmit = () => {
		const data = {
			star: isStar,
			comment: isComment,
			consultantId: consultantId,
		}
		console.log(data)
		dispatch(createReviewFetch(data))
	}

  return (
    <div>
      <Button onClick={handleOpen} disabled={!hasReview? false : true}>리뷰 작성하기</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
					<p style={{marginBottom:3, }}>{consultantNickname} 컨설턴트님께 리뷰를 작성해 보세요 !</p>

						<div style={{ paddingTop: 3}}>
							<BasicRating setIsStar={setIsStar}/>
							<textarea style={{width: '100%', height: 120, backgroundColor: '#c5cae9', borderRadius: 2, padding:10}} 
								onChange={(e)=>{
								console.log(e.target.value);
								setComment(e.target.value)}}>
							</textarea>
						</div>
					<Button onClick={onSubmit} sx={{width: '100%'}}>리뷰 작성</Button>
        </Box>
      </Modal>
    </div>
  );
}

export default ConsultantDiagnosisReview