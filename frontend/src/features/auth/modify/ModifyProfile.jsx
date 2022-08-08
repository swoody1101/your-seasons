import React, { useState } from 'react'
import { useSelector } from 'react-redux';

import {
  Grid, Container, styled
} from '@mui/material'

import { Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';

import ModifyCommon from './components/ModifyCommon';
import ModifyConsultant from './components/ModifyConsultant';
import ModifyPassword from './components/ModifyPassword';
import SignOut from './components/SignOut';
import ModifyAvatar from './components/ModifyAvatar';
import Sample from './components/Sample';

import { CONSULTANT } from 'api/CustomConst';

const ModifyProfile = () => {
  // 프로필 정보 가져오기
  const { role, imageUrl } = useSelector((state) => (state.auth.logonUser))
  const { isModal } = useSelector((state) => (state.auth))


  // 세부 페이지 이동 방식
  const [page, setPage] = useState('profile')

  const handleChange = ((e, newPage) => {
    setPage(newPage)
  })


  return (
    <Container sx={{ xs: 'none', sm: 'block'}}>
      {
        isModal
          ?
          <Sample />
          :
          <></>
      }
      <Box
        sx={{
          mt: '5rem',
          backgroundColor: "#F1F1F190",
          padding: '2rem',
          borderRadius: '1rem',
        }}
      >
        <TabContext value={page}  >
          <Grid container sx={{ height: '80%' }}>
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
                {role === CONSULTANT &&
                  <Tab label="컨설턴트 정보" value="consultant" />
                }
                <Tab label="비밀번호 수정" value="password" />
                <Tab label="회원탈퇴" value="signout" />
              </StyledTabList>
            </Grid>
            <Grid item sm={6} >
              <TabPanel value="profile">
                <ModifyCommon />
              </TabPanel>
              <TabPanel value="consultant">
                <ModifyConsultant />
              </TabPanel>
              <TabPanel value="password">
                <ModifyPassword />
              </TabPanel>
              <TabPanel value="signout">
                <SignOut />
              </TabPanel>
            </Grid>
            {
              (page === "profile" || page === "consultant")
              &&
              <ModifyAvatar imageUrl={imageUrl} />
            }
          </Grid>
        </TabContext>
      </Box>
    </Container >
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

