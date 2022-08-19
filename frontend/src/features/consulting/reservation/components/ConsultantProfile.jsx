import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Grid, styled, Stack } from '@mui/material'
import { useParams } from "react-router-dom";
import StarRating from "common/starrating/StarRating";
import MyAvatar from "common/avatar/MyAvatar";
import { ConsultantDetailFetch, ConsultingReviewFetch } from "features/consulting/consultantListSlice";

const ConsultantProfile = () => {
	const dispatch = useDispatch()
	const consultantId = useParams().id
	const { nickname, introduction, cost, starAverage, imageUrl } = useSelector(state => state.consultantList.consultantDetail)

	useEffect(() => {
		dispatch(ConsultantDetailFetch(consultantId))
	}, [dispatch])

	useEffect(() => {
		dispatch(ConsultingReviewFetch(consultantId))
	}, [dispatch])

	return (
		<Grid container sx={{ backgroundColor: "white", borderRadius: "10px" }} >
			{/* 이미지 */}
			<Grid item xs={12} sm={3} sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}>
				<MyAvatar setSize={16} imgUrl={imageUrl} />
			</Grid>
			{/* 프로필 텍스트 */}
			<Grid item xs={12} sm={9}>
				<ProfileText>
					<MainText>
						<h3>{nickname} 컨설턴트님</h3>
						<div>{starAverage === 0 ? '등록된 별점이 없습니다.' : <StarRating starrating={starAverage} />}</div>
					</MainText>
					<Introduction>{introduction ? introduction : '등록된 자기소개가 없습니다.'}</Introduction>
					<p>진단비용: {cost ? cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '원' : '등록된 비용이 없습니다.'}</p>
				</ProfileText>
			</Grid>
		</Grid>
	)
}

export default ConsultantProfile


const ProfileText = styled(Stack)({
	display: "flex",
	flexDirection: "column",
	paddinTop: "20px",
	paddingLeft: "20px",
	height: "180px",
	justifyContent: "space-evenly",
})

const Introduction = styled('div')({
	display: "-webkit-box",
	WebkitBoxOrient: "vertical",
	WebkitLineClamp: "3",
	maxWidth: 600,
	overflow: "hidden",
	lineHeight: "100%",
})


const MainText = styled('div')({
	display: "flex",
	gap: "5%",
})
