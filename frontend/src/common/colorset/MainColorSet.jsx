import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Box, Grid, styled, Tab } from '@mui/material'

import { TabContext, TabList, TabPanel } from '@mui/lab';
import ColorPaletteBox from './PaletteBox'
import Drawing from 'common/drawing/Drawing';
import { VerticalAlignCenter } from '@mui/icons-material';


const MainColorSet = ({ setIsBest, setIsWorst }) => {
	const selectedColor = useSelector(state => state.colorSetList.selectedColor)
	console.log(selectedColor)
	const [
		{ spring_bright, spring_true, spring_light },
		{ summer_light, summer_true, summer_soft },
		{ autumn_soft, autumn_true, autumn_dark },
		{ winter_bright, winter_true, winter_dark }
	] = useSelector(state => state.colorSetList.data)
	const [value, setValue] = useState(1);
	const handleChange = (event, newValue) => {
		setValue(newValue);
		setSubValue(1);
	};

	const [subValue, setSubValue] = useState(1);
	const handleSubChange = (event, newValue) => {
		setSubValue(newValue);
	};
	return (
		<SGrid item xs={12}>
			<TabContext value={value} sx={{ height: '100%' }}>
				<Box sx={{ borderBottom: 'divider' }}>
					<TabList onChange={handleChange} sx={{ borderBottom: 'divider' }}>
						<Tab label="봄" value={1} />
						<Tab label="여름" value={2} />
						<Tab label="가을" value={3} />
						<Tab label="겨울" value={4} />
					</TabList>
				</Box>
				<CTabPanel value={1}>
					<TabContext value={subValue} sx={{ height: '100%' }}>
						<Box sx={{ display: 'flex', padding: '0' }}>
							<CTabPanel value={1}>
								<ColorPaletteBox colorSet={spring_bright} />
							</CTabPanel>
							<CTabPanel value={2}>
								<ColorPaletteBox colorSet={spring_true} />
							</CTabPanel>
							<CTabPanel value={3}>
								<ColorPaletteBox colorSet={spring_light} />
							</CTabPanel>
							<TabList
								orientation="vertical"
								onChange={handleSubChange}
								sx={{ borderLeft: 1, borderColor: 'divider', width: '25%' }}>
								<CTab label="브라이트" value={1} />
								<CTab label="트루" value={2} />
								<CTab label="라이트" value={3} />
							</TabList>
						</Box>
					</TabContext>
				</CTabPanel>
				<CTabPanel value={2}>
					<TabContext value={subValue}>
						<Box sx={{ display: 'flex' }}>
							<CTabPanel value={1}>
								<ColorPaletteBox colorSet={summer_light} />
							</CTabPanel>
							<CTabPanel value={2}>
								<ColorPaletteBox colorSet={summer_true} />
							</CTabPanel>
							<CTabPanel value={3}>
								<ColorPaletteBox colorSet={summer_soft} />
							</CTabPanel>
							<TabList
								orientation="vertical"
								onChange={handleSubChange}
								sx={{ borderLeft: 1, borderColor: 'divider', width: '25%' }}>
								<CTab label="라이트" value={1} />
								<CTab label="트루" value={2} />
								<CTab label="소프트" value={3} />
							</TabList>
						</Box>
					</TabContext>
				</CTabPanel>
				<CTabPanel value={3}>
					<TabContext value={subValue} sx={{ height: '100%' }}>
						<Box sx={{ display: 'flex' }}>
							<CTabPanel value={1}>
								<ColorPaletteBox colorSet={autumn_soft} />
							</CTabPanel>
							<CTabPanel value={2}>
								<ColorPaletteBox colorSet={autumn_true} />
							</CTabPanel>
							<CTabPanel value={3}>
								<ColorPaletteBox colorSet={autumn_dark} />
							</CTabPanel>
							<TabList
								orientation="vertical"
								onChange={handleSubChange}
								sx={{ borderLeft: 1, borderColor: 'divider', width: '25%' }}>
								<CTab label="소프트" value={1} />
								<CTab label="트루" value={2} />
								<CTab label="다크" value={3} />
							</TabList>
						</Box>
					</TabContext>
				</CTabPanel>
				<CTabPanel value={4}>
					<TabContext value={subValue} sx={{ height: '100%' }}>
						<Box sx={{ display: 'flex' }}>
							<CTabPanel value={1}>
								<ColorPaletteBox colorSet={winter_bright} />
							</CTabPanel>
							<CTabPanel value={2}>
								<ColorPaletteBox colorSet={winter_true} />
							</CTabPanel>
							<CTabPanel value={3}>
								<ColorPaletteBox colorSet={winter_dark} />
							</CTabPanel>
							<TabList
								orientation="vertical"
								onChange={handleSubChange}
								sx={{ borderLeft: 1, borderColor: 'divider', width: '25%' }}>
								<CTab label="브라이트" value={1} />
								<CTab label="트루" value={2} />
								<CTab label="다크" value={3} />
							</TabList>
						</Box>
					</TabContext>
				</CTabPanel>
			</TabContext>
			<Drawing />
		</SGrid>

	)
}

export default MainColorSet

const SGrid = styled(Grid)({
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	alignItems: "center",
})

const CTab = styled(Tab)({
	padding: "0px",
	minHeight: "24px",
	height: "24px"
})

const CTabPanel = styled(TabPanel)({
	padding: "0px",
	marginBottom: "12px",
})