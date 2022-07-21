import React, {useState} from "react";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import ProfileImage from '../../assets/images/yourseasonlogo.png';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Container from '@mui/material/Container';
import whitestar from '../../assets/images/whitestar.png'
import filledstar from '../../assets/images/filledstar.png'
import './ConsultantProfile.css'

const ConsultantProfile = () => {
    const [nickname, setNickname] = useState('익명의');
    const [selfIntroduction, setSelfIntroduction] = useState('등록한 자기소개가 없습니다.');
    const [cost, setCost] = useState('30,000');
    const [starRate, setStarRate] = useState(5)

    console.log(setNickname, setSelfIntroduction, setCost, setStarRate)
    return (
        <Container fixed>
            <Grid container item spacing={2}>
                <Grid item xs={12} sm={2} sx={{display: 'block'}}>
                    <Avatar
                        alt="프로필 사진"
                        src={ProfileImage}
                        sx={{ width: 140, height: 140  }}
                    />
                    <IconButton color="primary" aria-label="upload picture" component="label">
                        <input hidden accept="image/*" type="file" />
                        <PhotoCamera />
                    </IconButton>
                </Grid>
                <Grid item xs={12} sm={10}>
                    <h3>
                        {nickname} 컨설턴트님
                    </h3>
                    <h3>
                        평점 {starRate}
                    </h3>
                    <div className="starbox" style={{ width: starRate*20 }}>
                        <img
                        className="pointofstar"
                        alt="별"
                        src={filledstar}
                        />
                        <img
                        className="backgrdoundstar"
                        alt="별"
                        src={whitestar}
                        />
                    </div>
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
                </Grid>
            </Grid>
        </Container>
    )
}

export default ConsultantProfile