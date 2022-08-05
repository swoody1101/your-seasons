import React, { useState } from 'react'
import ConsultantListItem from './ConsultantListItem'
import { useSelector } from 'react-redux'
import { Grid, Box, MenuItem, FormControl, Select, styled } from '@mui/material'

const ConsultantList = () => {
	const consultants = useSelector(state => state.consultantList.consultants)
	const copyConsultants = [...consultants]
	const [value, setValue] = useState('popular')

	const handleChange = (event) => {
		setValue(event.target.value);
	};

	return (
<BackDiv>
	<Div>
		{/* select-toggle */}
		<Toggle>
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
		</Toggle>

		{/* 컨설턴트 리스트 아이템 */}
		<BigGrid container spacing={3}>
			{copyConsultants.map((consultant, index) => (
				<SmallGrid item xs={12} sm={6} md={3} key={index}>
					<ConsultantListItem {...consultant} />
				</SmallGrid>
			))}
		</BigGrid>
	</Div>
</BackDiv>
)}

export default ConsultantList

const BackDiv = styled('div')({
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'center',
	backgroundColor: '#eeeeee',
	marginTop: -70,
})

const Div = styled('div')({
	width: 1200,
	display: 'flex',
	marginTop: 130,
	marginBottom: 130,
	flexDirection: 'column',
	justifyContent: 'center',
})

const Toggle = styled('div')({
	minWidth: 120, 
	display: 'flex', 
	justifyContent: 'flex-end', 
	marginBottom: '2rem',
	marginRight: 30,
})

const BigGrid = styled(Grid)({
	display: 'flex',
	flexDirection: 'row', 
	flexWrap: 'wrap', 
	justifyContent: "start",
})

const SmallGrid = styled(Grid)({
	display: 'flex',
	flexDirection: 'row', 
	marginBottom: 20,
})