import React, { useState } from 'react'
import ConsultantDiagnosis from '../consultantsDiagnosis/ConsultantDiagnosis'
import SelfDiagnosis from './SelfDiagnosis';
import { Box, Tab } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab';
// Mydiagnosis(자가진단도 넣게되면, 컴포넌트 분리 필요함)
// 따라서, 내 진단(mydiagnosis) -> (컨설턴트진단, 셀프진단 컴포넌트 있음)
const MyDiagnosis = () => {
	const [value, setValue] = useState('1');
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	return (
		<Box sx={{ width: '100%', typography: 'body1' }}>
			<TabContext value={value}>
				<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
					<TabList onChange={handleChange}>
						<Tab label="컨설팅" value="1" />
						<Tab label="자가진단" value="2" />
					</TabList>
				</Box>
				<TabPanel value="1">
					<ConsultantDiagnosis />
				</TabPanel>
				<TabPanel value="2">
					<SelfDiagnosis />
				</TabPanel>
			</TabContext>
		</Box>
	)
}

export default MyDiagnosis