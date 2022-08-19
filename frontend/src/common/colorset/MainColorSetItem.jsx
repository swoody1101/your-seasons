import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Grid, styled, Tooltip, Typography } from '@mui/material';
import { changeSelectColor } from './colorSetSlice';

const Pallete = ({ colorset, tone, setIsBest, setIsWorst }) => {
	const {selectedColor,bestColor,worstColor } = useSelector(state => state.colorSetList)

	const dispatch = useDispatch()

  const select = () => {
    if(tone==='spring_bright'){
    return '봄 브라이트'
  }else if(tone==='spring_true'){
    return '봄 트루'
  }else if(tone==='spring_light'){
    return '봄 라이트'
  }else if(tone==='summer_light'){
    return '여름 라이트'
  }else if(tone==='summer_true'){
    return '여름 트루'
  }else if(tone==='summer_soft'){
    return '여름 소프트'
  }else if(tone==='autumn_soft'){
    return '가을 소프트'
  }else if(tone==='autumn_true'){
    return '가을 트루'
  }else if(tone==='autumn_dark'){
    return '가을 다크'
  }else if(tone==='winter_bright'){
    return '겨울 브라이트'
  }else if(tone==='winter_true'){
    return '겨울 트루'
  }else if(tone==='winter_dark'){
    return '겨울 다크'
  }}


	return <>
		{/* 한 팔레트당 색상 20개 씩 존재 */}
		<SubTypography>{select(tone)}</SubTypography>
		<Grid item sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'start' }}>
			{colorset.map((item, index) => (
                  <Tooltip title={item} key={index}  placement="top">
				<div style={{ backgroundColor: item, width: 50, height: 50, margin: 1, borderRadius:3 , cursor: 'pointer'}}
				     onClick={() => { dispatch(changeSelectColor(item)); }}></div></Tooltip> //setIsBest(false); setIsWorst(false)  ?
			))}
		</Grid>

	</>
}


const MainColorSetItem = ({ seasonObj, setIsBest, setIsWorst }) => {
	// key 값 저장
	const seasonTone = []

	const selectTone = () => {
		for (let colorset in seasonObj) {
			seasonTone.push(colorset)
		}
		return seasonTone
	}




	return (
		<Grid container sx={{ width: '100%', display: 'flex', flexDirection: 'column'}}>
			{selectTone().map((tone, index) => (
				<Pallete key={index} tone={tone} colorset={seasonObj[tone]} setIsBest={setIsBest} setIsWorst={setIsWorst} />
			))}
		</Grid>
	)
}

export default MainColorSetItem

const SubTypography = styled(Typography)({
	fontFamily: 'malgunbd !important',
	fontSize: '15px',
	letterSpacing: 'var(--font-letter-spacing)',
	color: '#00000080',
  padding: 5,
})
