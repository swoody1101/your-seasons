import React from "react";
import { Grid, CardContent, Card, Typography, CardActionArea, styled, Box } from '@mui/material';
import StarRating from "../../../../../common/starrating/StarRating";
import OtherAvatar from "common/avatar/OtherAvatar";

const UserReviewItem = props => {

	const year = props.date.slice(0, 4) + "년 "
	const month = props.date.slice(5, 7) + "월 "
	const day = props.date.slice(-2) + "일"

	return (
		<>
			<SetCard variant="outlined" >
				<CardActionArea>
					<CardContent>
						<Grid container>
							{/* 그리드 1 */}
							<ImgGrid item xs={12} sm={3}>
								<OtherAvatar imgUrl={props.imageUrl} setSize={14} />
							</ImgGrid>

							{/* 그리드 2 */}
							<Grid item xs={12} sm={9}>
								{/* 컨설턴트정보, 날짜 */}
								<Forflex>
									<MainText>
										{props.nickname}님에게 받은 후기 |
										{year + month + day}
									</MainText>
								</Forflex>
								{/* 리뷰 박스 */}
								<ReviewBox>
									<StarRating starrating={props.rating} />
									<ReviewText>{props.review}</ReviewText>
								</ReviewBox>
							</Grid>

						</Grid>
					</CardContent>
				</CardActionArea>
			</SetCard>
		</>)
}

export default UserReviewItem


const SetCard = styled(Card)({
	marginBottom: 5,
	borderRadius: '1rem',
})


const ImgGrid = styled(Grid)({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'start',
})

const ReviewBox = styled(Box)({
	border: '1px dashed #ADBED2',
	borderRadius: 5,
	padding: 10,
})


const Forflex = styled('div')({
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'end',
	padding: 10,
})

const MainText = styled(Typography)({
	fontSize: 20,
	fontWeight: 'bold',
})

const ReviewText = styled('div')({
	fontSize: 15,
	border: 'none',
	backgroundColor: '#FFFFFF00',
	height: '100%',
	width: '100%',
	resize: 'none',
})
