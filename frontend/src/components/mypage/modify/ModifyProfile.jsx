import React, { useState } from 'react'
import { useSelector } from 'react-redux';

import {
  Grid, Container
} from '@mui/material'
import { styled } from '@mui/system'

import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import ModifyCommon from './ModifyCommon';
import ModifyPassword from './ModifyPassword';
import SignOut from './SignOut';

const ModifyProfile = () => {
  // 프로필 정보 가져오기
  const { nickname, role, imageUrl } = useSelector((state) => state.login.logonUser)


  // 세부 페이지 이동 방식
  const [page, setPage] = useState('profile')

  const handleChange = ((e, newPage) => {
    setPage(newPage)
  })

  return (
    <Container sx={{ xs: 'none', sm: 'block' }}>
      <TabContext value={page}>
        <Grid container sx={{ mt: 10, height: '80%' }}>
          <Grid
            item sm={2}
            sx={{
              borderRight: '2px solid #00000070',
              height: '70vh'
            }}
          >
            <StyledTabList
              value={page}
              onChange={handleChange}
            >
              <Tab label="프로필 수정" value="profile" />
              <Tab label="비밀번호 수정" value="password" />
              <Tab label="회원탈퇴" value="signout" />
            </StyledTabList>
          </Grid>
          <Grid item sm={6} >
            <TabPanel value="profile">
              <ModifyCommon nickname={nickname} />
            </TabPanel>
            <TabPanel value="password">
              <ModifyPassword />
            </TabPanel>
            <TabPanel value="signout">
              <SignOut />
            </TabPanel>
          </Grid>
          {
            page === "profile"
            &&
            <Grid
              item sm={4}
              sx={{ backgroundColor: 'yellow' }}
            >
              프로필이미지
            </Grid>
          }
        </Grid>
      </TabContext>
    </Container>
  )
}

export default ModifyProfile

const StyledTabList = styled(TabList)({
  div: {
    div: {
      marginTop: '1rem',
      display: 'flex',
      flexDirection: 'column',
      justifyItems: 'center',
      button: {
        fontSize: '1.2rem',
        ':active': {
          color: "#00000080",
          'backgroundColor': '#00000010',
        },
      },
    },
    span: { display: 'none' }
  }
}) 
