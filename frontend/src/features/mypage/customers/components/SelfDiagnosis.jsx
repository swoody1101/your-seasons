import React from 'react'
import { useSelector } from 'react-redux';
import {
	Grid, Box, CardContent,
	Card, Typography, styled,
	Tooltip
} from '@mui/material';
import { isEmpty } from 'lodash'

const SelfDiagnosis = () => {
	const results = useSelector(state => state.mypage.selfDxData);
	return (
		<Div>
			{isEmpty(results) ? <h2>자가 진단 기록이 없습니다.</h2> : results.map(({ tone, selfConsultingDate,
				bestColorSet, worstColorSet, percentages }, index) => (
				<div key={index}>
					{/* 카드1 */}
					<SetCard variant="outlined">
						<CardContent>
							<Grid container sx={{ display: 'flex', flexFlow: 'no-wrap' }}>
								<Grid item>
									{/* 컨설턴트정보, 날짜 */}
									<Forflex>
										<MainText>
											자가진단결과 | {tone} | 일시: {selfConsultingDate}일
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
											{percentages.map((res) => {
												<SubText> {res.tone}톤 {res.percentage}% </SubText>
											})}
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
	fontSize: 16,
	fontWeight: 'bold',
	marginBottom: 6,
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