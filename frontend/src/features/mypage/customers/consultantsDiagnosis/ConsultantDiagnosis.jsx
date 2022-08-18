import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Grid, Box, Modal, CardContent, Card, Typography, styled, CardActions, Tooltip } from '@mui/material';
import ConsultantDiagnosisReview from './ConsultantDiagnosisReview';
import OtherAvatar from 'common/avatar/OtherAvatar';
import { isEmpty } from 'lodash'
import '../mypage.css'


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
	overflow: 'scroll',
};

export const BasicModal = ({ consultingFile }) => {
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	return (
		<div style={{ display: 'flex', justifyContent: 'center', }}>
			<Button size="medieum" onClick={handleOpen} sx={{ backgroundSize: 'cover', objectFit: 'cover', width: '100vw' }}>진단결과 자세히보기</Button>
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
					{consultingFile !== "" ? <img src={consultingFile} style={{ width: '100%' }} />
						: <><p style={{ margin: '8px 0px' }}>진단결과표를 제공하지 않은 상담입니다.</p></>}

				</Box>
			</Modal>
		</div>
	);
}


const ConsultantDiagnosis = () => {
	const results = useSelector(state => state.mypage.myConsultantDxData);

	return (<>
		<Div>
			{isEmpty(results) ? <h2>지난 진단 기록이 없습니다.</h2> : results.map(({ consultingId, tone, consultantNickname,
				consultantImageUrl, consultingDate, bestColorSet, worstColorSet, consultingFile, consultingComment, hasReview }, index) => (
				<div key={index}>
					{/* 카드1 */}
					<SetCard variant="outlined">

						<CardContent>
							<Grid container sx={{ display: 'flex', flexFlow: 'no-wrap' }}>
								{/* 그리드 1 */}
								<ImgGrid item xs={12} sm={3}>
									<OtherAvatar setSize={14} imgUrl={consultantImageUrl} />
								</ImgGrid>

								{/* 그리드 2 */}
								<Grid item xs={12} sm={9}>
									{/* 컨설턴트정보, 날짜 */}
									<Forflex>
										<MainText>
											{consultantNickname}님과의 상담결과 | {tone} | 일시: {consultingDate}일
										</MainText>
									</Forflex>
									<TextBox>
										{/* 색상결과 */}
										<Pallete>
											<PalleteItem sx={{ marginTop: 1 }}>베스트 컬러 |
												{bestColorSet.map((color, idx) => (
													<Tooltip title={color} key={idx} placement="top">
														<Color color={color} /></Tooltip>
												))}
											</PalleteItem>
											<PalleteItem sx={{ marginTop: 1 }}>워스트 컬러 |
												{worstColorSet.map((color, idx) => (
													<Tooltip key={idx} title={color} >
														<Color color={color} /></Tooltip>
												))}
											</PalleteItem>
										</Pallete>
										<Line></Line>
										{/* 코멘트 */}
										<CommentBox>
											<SubText>{consultantNickname}컨설턴트님의 꿀팁 !</SubText>
											{consultingComment}
										</CommentBox>
									</TextBox>
								</Grid>

							</Grid>
						</CardContent>

						<CardActions sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
							{/* 이미지 모달 */}

							<BasicModal consultingFile={`data:image/jpg;base64,${consultingFile}`} />
							{/* 리뷰작성 모달 */}
							<ConsultantDiagnosisReview consultingId={consultingId} consultantNickname={consultantNickname} hasReview={hasReview} />
						</CardActions>

					</SetCard>
				</div>
			))}
		</Div>
	</>)
}

export default ConsultantDiagnosis


const Div = styled('div')({
	display: 'flex',
	flexDirection: 'column-reverse',
	maxWidth: '100%',
	gap: 10,
})

const SetCard = styled(Card)({
	marginBottom: 5,
	borderRadius: '1rem',
})

const TextBox = styled(Box)({
	border: '1px dashed #ADBED2',
	borderRadius: 5,
	padding: 10,
	minHeight: 100,
	marginTop: 7,
	fontSize: 15,
})

const CommentBox = styled(Box)({
	marginTop: 7,
	padding: 7,
	fontSize: 15,
})

const Line = styled(Typography)({
	width: '100%',
	height: 1,
	border: '1px dashed #ADBED2',
})

const SubText = styled(Typography)({
	fontSize: 16,
	fontWeight: 'bold',
	marginBottom: 6,
})

const ImgGrid = styled(Grid)({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'start',
})

const MainText = styled(Typography)({
	fontSize: 20,
	fontWeight: 'bold',
})

const Forflex = styled('div')({
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'end',
	padding: 10,
})

const Pallete = styled('div')({
	fontSize: 15,
	display: 'flex',
	justifyContent: 'start',
	flexDirection: 'column',
	minHeight: 100,
	maxWidth: 550,

})

const PalleteItem = styled('div')({
	display: 'flex',
	justifyContent: 'start',
	alignItems: 'center',
	paddingLeft: 7,
	borderRadius: 5,
	// border: "1px dashed #ADBED2",
})

const Color = styled('div')((props) => ({
	background: `${props.color}`,
	width: 30,
	height: 30,
	borderRadius: 15,
	margin: 5,
	cursor: 'pointer',
}))
