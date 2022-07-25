import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { Button, Grid, Box, Modal, CardContent,Card, Typography } from '@mui/material';
import styled from '@emotion/styled'
import './mypage.css'

// Todo. 리뷰 작성하기 버튼 활성화

// 진단결과사진 모달
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 1000,
	maxHeight: 700,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
	overflow:'scroll',
};

export const BasicModal = ({resultImageUrl}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div style={{display:'flex', justifyContent:'center',}}>
      <Button size="medieum" onClick={handleOpen} sx={{backgroundSize: 'cover', objectFit: 'cover'}}>진단결과 자세히보기</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="span" component="h3">
            퍼스널컬러 진단결과
          </Typography>
					<img src={resultImageUrl} style={{width: '100%'}}/>
        </Box>
      </Modal>
    </div>
  );
}


const ConsultantDiagnosis = () => {
  const dispatch = useDispatch();
	const results = useSelector(state=>state.myConsultantDx.data);
	// useEffect(()=>{
		// 	dispatch(myConsultantDxFetch())
		// }, [])
	const goReview = (e) => {
		e.stopPropagation();
		e.preventDefault();
		// 리뷰작성하러 가기
		// 리뷰작성여부 false면 리뷰작성버튼 활성화 기능 고려
	}

	return (<>
		<Div>
		{results.map( ({consultantNickname, consultantImageUrl, consultingDate, bestColorSet, worstColorSet, resultImageUrl, comment } , index) => (
			<div style={{display:'flex', justifyContent:'center'}}>
			{/* 카드1 */}
				<Card sx={{ textAlign:'center', display:'flex', justifyContent:'center', maxWidth:700, width: 700,
									boxSizing:'border-box', flexDirection:"column", marginBottom:5, padding:1, borderRadius: 5 }} variant="outlined" key={index}>

					{/* 진단결과 */}
					<CardContent sx={{display:'flex', textAlign:'center', justifyContent:'center', flexDirection:"column"}}>
						{/* 컨설턴트정보 및 코멘트 */}
						<Grid container >
							<Grid item xs={3}>
								<ConImg src={consultantImageUrl} alt="컨설턴트프로필"/>
								<Typography gutterBottom variant="span" component="div">
									{consultantNickname}
									<p>컨설턴트</p>
								</Typography>
							</Grid>
							<Grid item xs={9} className="task-tooltip">{comment}</Grid>
						</Grid>
						{/* 날짜 */}
						<Forflex>
							<div></div>
							<Typography gutterBottom variant="span" component="div" >
								{consultingDate}일 
							</Typography>
						</Forflex>
						{/* 색상결과 */}
						<Pallete>
							{/* best */}
							<Grid container spacing={2} >
								<Grid item xs={3} sx={{marginTop:1 }}>베스트 컬러</Grid>
								{/* style={{display:'flex', justifyContent:'center', border: '1px solid', maxWidth:200 }} */}
								<Grid item xs={9} sx={{display:'flex', justifyContent:'start', alignContent: 'center', maxWidth:200}}>
									{bestColorSet.map(color=>
										<div style={{background: color, width:30, height:30, borderRadius: 15, margin: 5}} key={color}></div>)}
								</Grid>
							</Grid>
							{/* worst */}
							<Grid container spacing={2}>
								<Grid item xs={3} sx={{marginTop:1 }}>워스트 컬러</Grid>
								{/* style={{display:'flex', justifyContent:'center', border: '1px solid', maxWidth:200 }} */}
								<Grid item xs={9} sx={{display:'flex', justifyContent:'start', alignContent: 'flex-end',maxWidth:200}}>
									{worstColorSet.map(color=>
										<div style={{background: color, width:30, height:30, borderRadius: 15, margin: 5}} key={color}></div>)}
								</Grid>
							</Grid>
						</Pallete>
					</CardContent>

					{/* 모달 */}
					<BasicModal resultImageUrl={resultImageUrl}/>

					{/* 버튼 */}
					<Button size="medieum" color="primary" onClick={goReview}>리뷰작성하기</Button>
			</Card>
		</div>
		))}
	</Div>
	</>)
}

export default ConsultantDiagnosis


const Div = styled.div`
	max-width:700px;
	margin:auto;
	display:flex;
	flex-direction: column-reverse;
`
const ConImg = styled.img`
	width: 100px;
	height: 100px;
	border-radius: 50%;
`
const Forflex = styled.div`
	display:flex;
	justify-content: space-between;
	align-items: end;
	padding: 10px;
`

const Pallete = styled.div`
	display: flex;
	justify-content: start;
	flex-direction: column;
	border: 1px dashed #ADBED2;
	border-radius: 5px;
	padding: 10px;
`