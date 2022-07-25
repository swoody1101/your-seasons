import React from 'react'
import MyProfile from './MyProfile'
import MyResHistory from './MyResHistory'
import MyDiagnosis from './MyDiagnosis'
import MyReview from './MyReview'


import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Container from '@mui/material/Container';

const MyPage = () => {
	const [value, setValue] = React.useState('1');
	const handleChange = (event, newValue) => {
			setValue(newValue);
	};

	return (<>
		<Container fixed sx={{ display:'block' }}>
		<Box sx={{ bgcolor: '#cfe8fc' }}>
            <MyProfile />
            <br />
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="예약보기" value="1" />
                            <Tab label="지난진단기록" value="2" />
                            <Tab label="내가 작성한 후기" value="3" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <MyResHistory />
                    </TabPanel>
                    <TabPanel value="2">
                        <MyDiagnosis />
                    </TabPanel>
                    <TabPanel value="3">
                        <MyReview />
                    </TabPanel>
                </TabContext>
            </Box>
					</Box>
        </Container>


		</>
	)
}

export default MyPage


