import React, { useState } from "react";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import ProfileImage from '../../assets/images/yourseasonlogo.png';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Container from '@mui/material/Container';
import StarRating from "./StarRating";
import Box from '@mui/material/Box';
import styled from '@emotion/styled' 

const ConsultantProfile = () => {
    const [nickname, setNickname] = useState('익명의');
    const [selfIntroduction, setSelfIntroduction] = useState('등록한 자기소개가 없습니다.');
    const [cost, setCost] = useState('30,000');
    const [starRate, setStarRate] = useState(4.7)

    console.log(setNickname, setSelfIntroduction, setCost, setStarRate)
    return (
        <Container fixed>
            <Grid container item spacing={2}>
                <Grid item xs={12} sm={3} sx={{
					display: 'flex',
					bgcolor: 'white',
					justifyContent: 'center',
				}}>
                    <Avatar
                        alt="프로필 사진"
                        src={ProfileImage}
                        sx={{ width: 140, height: 140 }}
                    />
                    <IconButton color="primary" aria-label="upload picture" component="label">
                        <input hidden accept="image/*" type="file" />
                        <PhotoCamera />
                    </IconButton>
                </Grid>
                <Grid item xs={12} sm={9}>
		<ProfileText>
                    <h3>
                        {nickname} 컨설턴트님
                    </h3>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <StarRating starrating={starRate} />
                        <h3>
                            {starRate}
                        </h3>
                    </Box>

                    <h3>
                        {selfIntroduction}
                    </h3>
                    <h3>
                        진단비용 {cost}
                    </h3>
                    <Stack spacing={2} direction="row">
                        <Button variant="contained">내 정보 수정</Button>
                        <Button variant="contained">프로필 수정</Button>
                    </Stack>
	        </ProfileText>
                </Grid>
            </Grid>
        </Container>
    )
}

export default ConsultantProfile

const ProfileText = styled.div`
	display:flex;
	flex-direction:column;
	padding-top: 20px;
	padding-left: 20px;
	line-height: 230%;
`
