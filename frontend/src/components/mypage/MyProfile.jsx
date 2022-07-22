import React, {useState, useEffect} from "react";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import DefaultImg from '../../assets/images/default_profile.jpg';
import Grid from '@mui/material/Grid';
import styled from '@emotion/styled'
import { Link } from '@mui/material'
import { getToken } from '../../api/JWToken';
import axios from 'axios';
// import { useParams } from "react-router";

const MyProfile = () => {
    const [nickname, setNickname] = useState('치당');
    const [lastDiagnosis, setlastDiagnosis] = useState('');
		const [userImg, setUserImg] = useState('')
		// const userId = useParams().customerId;
		const logonUser = getToken();

		// axios test 안함.
		useEffect(()=>{
			axios({
				// userID 가져오는 방식 ??
				// url: `/customers/${userId}`,
				method: "get",
				headers: {
					Authorization: `Token ${logonUser}`
				}
			})
			.then((response)=>response.data)
			.then((user)=>{
				setNickname(user.nickname)
				// 
				setlastDiagnosis(user.lastTestResult)
				setUserImg(user.image)
			});
		}, [])
		const diagnosis = () =>{
			if(lastDiagnosis === null || lastDiagnosis === undefined || lastDiagnosis === ''){
				return <>
				<Link href="/consultants" variant="body2">진단하러 가기</Link></>
			}else{
				return <>
				<Diagnosis>{lastDiagnosis}</Diagnosis></>
			}
		}
		
    return (
			<Grid container>
				{/* 이미지 */}
				<Grid item xs={12} sm={3} sx={{
					display: 'flex',
					bgcolor: 'white',
					justifyContent: 'center',
					alignItems: 'center',
				}}>
				<ProfileImg src={ userImg || DefaultImg } />
				</Grid>
				{/* 프로필  TEXT */}
				<Grid item xs={12} sm={9}>
					<ProfileText>
						<h3>{nickname} 님</h3>
						<div>{diagnosis()}</div>
						{/* 내 정보 수정 링크 추가 해야함 */}
						<Stack spacing={2} direction="row">
						<Button variant="contained">내 정보 수정</Button>
						</Stack>
					</ProfileText>
				</Grid>		
			</Grid>
    )
	}
	export default MyProfile
	
const ProfileImg = styled.img`
		width: 140px;
		height: 140px;
		border-radius: 50%;
`;


const ProfileText = styled.div`
	display:flex;
	flex-direction:column;
	padding-top: 20px;
	padding-left: 20px;
	height: 200px;
	line-height: 250%;
`
const Diagnosis = styled.div`
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	overflow: hidden;
`
