import React, { useState } from 'react'
import { useDispatch } from 'react-redux/es/exports';
import { Button, Checkbox, FormControlLabel, TextField, Grid, Link, Typography, Avatar } from '@mui/material';
import { Box, Container } from '@mui/system';
import './login.css';
import mainimg from '../../assets/images/mainimg.png';
import kakaotalk_img from '../../assets/images/kakaotalk_img.png';
import google_img from '../../assets/images/google_img.png';
// import SignUp from '../signup/SignUp';
import { login } from "./loginSlice"



const Login = () => {
	const [userLogin, setUserLogin] = useState([]);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [checked, setChecked] = useState("");
	const dispatch = useDispatch();

	// 체크박스 이메일 저장
	const handleSubmit=(event) =>{
		event.preventDefault();
		dispatch(login(userLogin));
		if (saveAgree===true){
			setUserLogin("")
			setPassword("")
		}else{
			setUserLogin("")
			setEmail("")
			setPassword("")
		}
	}

  const saveAgree = (event) => {
    setChecked(event.target.checked);
  };

	function handleEmail(event){
		const { value } = event.target;
		// value check
		setEmail(value.replace(/\s/g, ''))
	}
	console.log(email);
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
					<TextField label="이메일 주소" name="email" margin="normal" onSubmit={handleEmail}
							autoComplete="email" autoFocus	required fullWidth/>
					<TextField label="비밀번호" type="password" margin="normal" onSubmit={handlePassword}
							name="password" autoComplete="current-password" required fullWidth/>
					<FormControlLabel 
						control={<Checkbox onChange={saveAgree} value="remember" color="primary" />}
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
						<Link href="#" variant="body2">
							비밀번호 찾기
						</Link>
						<span><Link href="#" variant="body2">{"퍼스널 컬러 찾으러 가기"}</Link></span>
				</Grid>

				{/* 소셜 로그인 */}
				<div className='social-login'>
					<Grid container
						sx={{
							display: 'flex',
							justifyContent: 'center',	
						}}>
						<Grid item><Avatar sx={{ m: 1, bgcolor: '#eeeeee' }}>
							<img className="login-icon" src={google_img} alt="loginicon"/>
						</Avatar></Grid>
						<Grid item>
						<Avatar sx={{ m: 1, bgcolor: '#ffea00' }}>
							<img className="login-icon" src={kakaotalk_img} alt="loginicon"/>
						</Avatar></Grid>
					</Grid>
				</div>
			</Container>
		</Box>
		</div>
  );
}

export default Login
