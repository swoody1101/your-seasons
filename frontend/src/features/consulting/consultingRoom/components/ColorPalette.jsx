import React, { useState } from 'react'
import { useSelector } from 'react-redux';

import { Box, Grid, styled, StepLabel, Tab } from '@mui/material'

import { TabContext, TabList, TabPanel } from '@mui/lab';
import ColorPaletteBox from './ColorPaletteBox'

const ColorPalette = () => {
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
    <SGrid item xs={12} sm={4}>
      <TabContext value={value} sx={{ height: '100%' }}>
        <Box sx={{ border: 'none' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="봄" value={1} />
            <Tab label="여름" value={2} />
            <Tab label="가을" value={3} />
            <Tab label="겨울" value={4} />
            <Tab label="진단표" value={5} />
          </TabList>
        </Box>
        <TabPanel value={1}>
          <TabContext value={subValue} sx={{ height: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleSubChange} aria-label="lab API tabs example">
                <Tab label="브라이트" value={1} />
                <Tab label="트루" value={2} />
                <Tab label="라이트" value={3} />
              </TabList>
            </Box>
            <TabPanel value={1}>
              <ColorPaletteBox colorSet={spring_bright} />
            </TabPanel>
            <TabPanel value={2}>
              <ColorPaletteBox colorSet={spring_true} />
            </TabPanel>
            <TabPanel value={3}>
              <ColorPaletteBox colorSet={spring_light} />
            </TabPanel>
          </TabContext>
        </TabPanel>
        <TabPanel value={2}>
          <TabContext value={subValue} sx={{ height: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleSubChange} aria-label="lab API tabs example">
                <Tab label="라이트" value={1} />
                <Tab label="트루" value={2} />
                <Tab label="소프트" value={3} />
              </TabList>
            </Box>
            <TabPanel value={1}>
              <ColorPaletteBox colorSet={summer_light} />
            </TabPanel>
            <TabPanel value={2}>
              <ColorPaletteBox colorSet={summer_true} />
            </TabPanel>
            <TabPanel value={3}>
              <ColorPaletteBox colorSet={summer_soft} />
            </TabPanel>
          </TabContext>
        </TabPanel>
        <TabPanel value={3}>
          <TabContext value={subValue} sx={{ height: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleSubChange} aria-label="lab API tabs example">
                <Tab label="소프트" value={1} />
                <Tab label="트루" value={2} />
                <Tab label="다크" value={3} />
              </TabList>
            </Box>
            <TabPanel value={1}>
              <ColorPaletteBox colorSet={autumn_soft} />
            </TabPanel>
            <TabPanel value={2}>
              <ColorPaletteBox colorSet={autumn_true} />
            </TabPanel>
            <TabPanel value={3}>
              <ColorPaletteBox colorSet={autumn_dark} />
            </TabPanel>
          </TabContext>
        </TabPanel>
        <TabPanel value={4}>
          <TabContext value={subValue} sx={{ height: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleSubChange} aria-label="lab API tabs example">
                <Tab label="브라이트" value={1} />
                <Tab label="트루" value={2} />
                <Tab label="다크" value={3} />
              </TabList>
            </Box>
            <TabPanel value={1}>
              <ColorPaletteBox colorSet={winter_bright} />
            </TabPanel>
            <TabPanel value={2}>
              <ColorPaletteBox colorSet={winter_true} />
            </TabPanel>
            <TabPanel value={3}>
              <ColorPaletteBox colorSet={winter_dark} />
            </TabPanel>
          </TabContext>
        </TabPanel>
        <TabPanel value={5}>
          <p>준비중</p>
        </TabPanel>
      </TabContext>
    </SGrid>
  )
}

export default ColorPalette

const SGrid = styled(Grid)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
})

const STabPanel = styled(TabPanel)({
  height: '60%',
  overflow: 'auto'
})