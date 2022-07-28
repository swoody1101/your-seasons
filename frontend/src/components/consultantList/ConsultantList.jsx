import React, { useState } from 'react'
import ConsultantListItem from './ConsultantListItem'
import { useSelector } from 'react-redux'
import { Grid, Box, MenuItem, FormControl, Select, Button, TextField } from '@mui/material'

import tmpImg from '../../assets/images/ancun.png'
const ConsultantList = () => {
	const consultants = useSelector(state=>state.consultantList.consultantsData)
	// 셀렉트폼 
	const [value, setValue] = useState('popular')


	const handleChange = (event) => {
		setValue(event.target.value);
	};


	// // 오름차순 정렬, 원본 배열 수정
	// numbers.sort((a, b) => a - b);
	// console.log(numbers); // [9, 11, 15, 23, 52]
	
	// // 내림차순 정렬, 원본 배열이 다시 수정
	// numbers.sort((a, b) => b - a);
	// console.log(numbers); // [52, 23, 15, 11, 9]




	const sorter = function (a, b) {
		if (value === 'popular') return b.starAverage - a.starAverage
    else if (value === 'latest') return b.consultantId -a.consultantId
    else if (value === 'highReview') return b.reviewCount -a.reviewCount
    else if (value === 'lowCost') return Number(a.cost.replace(/\,/g, '')) - Number(b.cost.replace(/\,/g, ''))
    else if (value === 'highCost') return Number(b.cost.replace(/\,/g, '')) - Number(a.cost.replace(/\,/g, ''))
  }

	
	return (<div style={{marginTop:20}}>
	{/* select */}
		<Box sx={{ minWidth: 120 }}>
			<FormControl>
				<Select
					labelId='select-demo'
					id='select'
					value={value}
					onChange={handleChange}
				>
					<MenuItem value={'popular'}>인기순</MenuItem>
					<MenuItem value={'latest'}>신규 가입순</MenuItem>
					<MenuItem value={'highReview'}>리뷰 많은순</MenuItem>
					<MenuItem value={'lowCost'}>낮은 가격순</MenuItem>
					<MenuItem value={'highCost'}>높은 가격순</MenuItem>
				</Select>
			</FormControl>
		</Box>
		<img src={tmpImg} ></img>
	{/* 컨설턴트 리스트 아이템 */}
	<Grid container spacing={2}>
		{consultants.sort(sorter).map((consultant, index)=>(
			<Grid item xs={6} md={3} key={index}>
				<ConsultantListItem {...consultant} /> 	
			</Grid>	
		))}
	</Grid>
	</div>)
}

export default ConsultantList