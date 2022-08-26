import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {
	Grid, Box, CardContent,
	Card, Typography, styled,
	Tooltip, CircularProgress
} from '@mui/material';
import { isEmpty } from 'lodash'
import { selfDxFetch } from "features/mypage/mypageSlice";


const SelfDiagnosis = () => {
	const results = useSelector(state => state.mypage.selfDxData);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(selfDxFetch())
	}, [])
	return (
		<Div>
			{isEmpty(results) ? <h2>자가 진단 기록이 없습니다.</h2> : results.map(({ tone, selfConsultingDate,
				bestColorSet, worstColorSet, percentages }, index) => (
				<div key={index}>
					{/* 카드1 */}
					<SetCard variant="outlined">
						<CardContent>
							<Grid container sx={{ display: 'flex', flexFlow: 'no-wrap' }}>
								<Grid item sx={{width: '100%'}}>
									{/* 컨설턴트정보, 날짜 */}
									<Forflex>
										<MainText>
											자가진단결과 | {tone} | 일시: {selfConsultingDate.slice(0, 4)}년 {selfConsultingDate.slice(5, 7)}월 {selfConsultingDate.slice(8, 10)}일
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
											<FlexDiv>
												{percentages.map((res, idx) => (
													<FlexDiv key={idx}>
														<SubText>
															{res.tone}톤
														</SubText>
														<Box sx={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
															<CircularProgress variant="determinate" value={res.percentage} color='success' />
															<Box
																sx={{
																	top: 0,
																	left: 0,
																	bottom: 0,
																	right: 0,
																	position: 'absolute',
																	display: 'flex',
																	alignItems: 'center',
																	justifyContent: 'center',
																}}
															>
																<Typography variant="caption" component="div" color="text.success">
																	{`${res.percentage}%`}
																</Typography>
															</Box>
														</Box>
													</FlexDiv>
												))}
											</FlexDiv>
										</CommentBox>
									</TextBox>
								</Grid>

							</Grid>
						</CardContent>
					</SetCard>
				</div>
			))}
		</Div>
	)
}

export default SelfDiagnosis

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
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	fontSize: 16,
	fontWeight: 'bold',
	margin: '0px 8px'
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

const FlexDiv = styled('div')({
	display: 'flex',
	marginBottom: '8px',
	marginRight: '16px',
})