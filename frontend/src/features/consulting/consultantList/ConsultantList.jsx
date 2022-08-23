import React, { useEffect, useState } from 'react'
import ConsultantListItem from './ConsultantListItem'
import { useDispatch, useSelector } from 'react-redux'
import { ConsultantListFetch,  } from './../consultantListSlice'
import { setConValue, ConsultantSearchFetch } from 'features/consulting/consultantListSlice';
import { isEmpty } from 'lodash'
import EB8F90 from 'assets/images/EB8F90.jpg'

import { Grid, MenuItem, FormControl, Select, styled, Paper, InputBase } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';

const ConsultantList = () => {
	const value = useSelector(state => state.consultantList.conValue)
	const consultants = useSelector(state => state.consultantList.consultants)
	const [formValue, setFormValue] = useState('')
	const dispatch = useDispatch()

	useEffect(()=>{
    dispatch(setConValue('popular'))
		dispatch(ConsultantListFetch('popular'))
	}, [])

	useEffect(()=>{
		dispatch(ConsultantListFetch(value))
	}, [value])
	
	const handleChange = (event) => {
		dispatch(setConValue(event.target.value))
		setFormValue('')
	};


	return (
		<BackDiv>
			<Div>
				<TopDiv>
					{/* search bar */}
					<SearchForm
						component="form"
						sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 300 }}
						name="keyword"
						onSubmit={(e)=>{
							e.preventDefault();
							dispatch(ConsultantSearchFetch(formValue))
						}}
					>
						<InputBase
							sx={{ ml: 1, flex: 1 }}
							placeholder="컨설턴트 검색하기"
							inputProps={{ 'aria-label': 'search' }}
							value={formValue}
							onChange={(e)=>{
								setFormValue(e.target.value)}}
						/>
						<IconButton type="submit" aria-label="search">
							<SearchIcon />
						</IconButton>
					</SearchForm>
					{/* select-toggle */}
					<Toggle>
						<FormControl>
							<Select
								labelId='select-demo'
								id='select'
								value={value}
								onChange={handleChange}
								sx={{backgroundColor: 'white'}}
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
					{!isEmpty(consultants) ? consultants.map((consultant, index) => (
						<SmallGrid item xs={12} sm={6} md={3} key={index}>
							<ConsultantListItem {...consultant} />
						</SmallGrid>
					))
				: <h2>검색결과가 없습니다.</h2>
				}
				</BigGrid>
			</Div>
		</BackDiv>
)}

export default ConsultantList

const BackDiv = styled('div')({
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'center',
	alignItems: 'start',
	marginTop: -70,
	backgroundColor: '#eeee',
  minHeight: '100vh',
})

const Div = styled('div')({
	width: 1200,
	display: 'flex',
	marginTop: 130,
	marginBottom: 130,
	flexDirection: 'column',
	justifyContent: 'center',
	alignContent: 'center',
})

const TopDiv = styled('div')({
	display: 'flex', 
	justifyContent: 'flex-end', 
	marginBottom: '2rem',
})

const SearchForm = styled(Paper)({
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'center',
})

const Toggle = styled('div')({
	minWidth: 120, 
	display: 'flex', 
	justifyContent: 'flex-end', 
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
	justifyContent: 'center',
	boxSizing: 'border-box',
	flexDirection: 'row', 
	marginBottom: 20,
})