import React, { useState } from 'react'
import { useDispatch } from 'react-redux/es/exports';
import { Button, Checkbox, FormControlLabel, TextField, Grid, Link, Typography, Avatar, styled } from '@mui/material';
import { Box, Container } from '@mui/system';
import './login.css';
import mainimg from '../../assets/images/mainimg.png';
import kakaotalk_img from '../../assets/images/kakaotalk_img.png';
import google_img from '../../assets/images/google_img.png';
import { loginUser } from "./loginSlice"

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [checked, setChecked] = useState(false);
	const dispatch = useDispatch();

	const handleSubmit=(event) =>{
		event.preventDefault();
		dispatch(loginUser({email, password}))
			.then(res => {
				if (res.type === 'user/login/fulfilled'){
					document.location.href = '/home'
				}else{
					alert('이메일 또는 비밀번호를 잘못 입력했습니다. 입력하신 내용을 다시 확인해주세요.')
				}
			}) 
	}
  const saveAgree = ({target}) => {
    target.checked ? setChecked(true) : setChecked(false);
		console.log(checked)
		if(checked === false){
			sessionStorage.setItem('email', email)
		}else{
			sessionStorage.setItem('email', "")
		}
  };


	function handleEmail(event){
		const { target: { value } } = event;
		// value check
		setEmail(value.replace(/\s/g, ''))
		
	}

	function handlePassword(event) {
		const { value } = event.target;
    // value check
		setPassword(value.replace(/\s/g, ''));
    
	}

  return (
		// 전체를 div + Box로 묶음
		<div className="login">
		<Box
				sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'center',
				}}
			>	

			{/* 좌측 */}
			<div maxwidth="xs" className="mobile-hidden">
				<img className="mainimg" src={mainimg} alt="mainimg"/>
			</div>

			{/* 중앙선 */}
			<div className="v-line mobile-hidden"></div>
			
			{/* 우측 */}
			<Container component="main" maxwidth="sm">
				{/* 로그인컴포넌트 */}
				<Box
					component="form"
					onSubmit={handleSubmit}
					sx={{
						marginTop: 8,
						display: 'flex',
						flexDirection: 'column',
						width: 400,
					}}
					>
					<Typography component="h1" variant="h5" id="login-text">
						로그인
					</Typography>
					<TextField label="이메일 주소" name="email" margin="normal" onChange={handleEmail}
							autoComplete="email" autoFocus	required fullWidth  />
					<TextField label="비밀번호" type="password" margin="normal" onChange={handlePassword}
							name="password" autoComplete="current-password" required fullWidth/>
					<FormControlLabel 
						control={<Checkbox onClick={saveAgree} value={checked} color="primary" />}
						label="이메일 주소 저장"
					/>

					<Button type="submit" fullWidth variant="contained" 
						sx={{ mt: 3, mb: 2 }}>login</Button>
				</Box>

				{/* forgetpassword, signup*/}
				<Grid container
					sx={{
						display: 'flex',
						justifyContent: 'space-between',					
					}}>
						<Link href="/#" variant="body2">
							비밀번호 찾기
						</Link>
						<span><Link href="/signup" variant="body2">{"퍼스널 컬러 찾으러 가기"}</Link></span>
				</Grid>

				{/* 소셜 로그인 */}
				<div className='social-login'>
					<Grid container
						sx={{
							display: 'flex',
							justifyContent: 'center',	
						}}>
						<Grid item><Avatar sx={{ m: 1, bgcolor: '#eeeeee' }}>
							<a href="/#"><img className="login-icon" src={google_img} alt="loginicon"/></a>
						</Avatar></Grid>
						<Grid item>
						<Avatar sx={{ m: 1, bgcolor: '#ffea00' }}>
						<a href="/#"><img className="login-icon" src={kakaotalk_img} alt="loginicon"/></a>
						</Avatar></Grid>
					</Grid>
				</div>
			</Container>
		</Box>
		</div>
  );
}

export default Login