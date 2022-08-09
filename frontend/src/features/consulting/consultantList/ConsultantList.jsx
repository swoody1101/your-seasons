import React, { useEffect, useState } from 'react'
import ConsultantListItem from './ConsultantListItem'
import { useDispatch, useSelector } from 'react-redux'
import { Grid, MenuItem, FormControl, Select, styled, TextField } from '@mui/material'
import { PopularListFetch,  } from './../consultantListSlice'

const ConsultantList = () => {
	const popularConsultants = useSelector(state => state.consultantList.popularConsultants)
	const latestConsultants = useSelector(state => state.consultantList.latestConsultants)
	const highStarConsultants = useSelector(state => state.consultantList.highStarConsultants)
	const highReviewConsultants = useSelector(state => state.consultantList.highReviewConsultants)
	const highCostConsultants = useSelector(state => state.consultantList.highCostConsultants)
	const lowCostConsultants = useSelector(state => state.consultantList.lowCostConsultants)
	const dispatch = useDispatch()

	const [value, setValue] = useState('popular')

	const sorter = () => {
		if(value==='popular') return popularConsultants
    else if (value === 'star') return highStarConsultants
		else if (value === 'latest') return latestConsultants
    else if (value === 'manyReviews') return highReviewConsultants
    else if (value === 'highCost') return highCostConsultants
    else if (value === 'lowCost') return lowCostConsultants
	}

	useEffect(()=>{
		dispatch(PopularListFetch(value))
	}, [])

	const handleChange = (event) => {
		setValue(event.target.value);
	};

	return (
		<BackDiv>
			<Div>
				<TopDiv>
					{/* search bar */}
					<TextField id="standard-basic" label="컨설턴트 검색하기" variant="standard" />
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
								<MenuItem value={'star'}>평점 높은순</MenuItem>
								<MenuItem value={'latest'}>신규 가입순</MenuItem>
								<MenuItem value={'manyReviews'}>리뷰 많은순</MenuItem>
								<MenuItem value={'highCost'}>높은 가격순</MenuItem>
								<MenuItem value={'lowCost'}>낮은 가격순</MenuItem>
							</Select>
						</FormControl>
					</Toggle>
				</TopDiv>

				{/* 컨설턴트 리스트 아이템 */}
				<BigGrid container spacing={3}>
					{sorter().map((consultant, index) => (
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

const TopDiv = styled('div')({
	minWidth: 120, 
	display: 'flex', 
	justifyContent: 'flex-end', 
	// marginBottom: '2rem',
	// marginRight: 30,
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