import React from 'react'
import { Grid, Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import MainColorSet from './MainColorSet'
import BestColorSet from './BestColorSet'
import WorstColorSet from './WorstColorSet'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import { removeSelectColor, addBestColor, removeBestColor, addWorstColor, removeWorstColor} from './colorSetSlice'
import { useState } from 'react'


const TemporaryRoom = () => {
	const selectedColor = useSelector(state=>state.colorSetList.selectedColor)
	const bestColor = useSelector(state=>state.colorSetList.bestColor)
	const dispatch = useDispatch()
	const [isBest, setIsBest] = useState(false)
	const [isWorst, setIsWorst] = useState(false)

	
	return (<>
	<Grid container>
		{/* 가상배경에 컬러 적용하는 부분 */}
		<Grid item 
			style={{border: '1px solid black', width: 100, height: 100}}>
			<p>선택한 색상</p>
			<div style={{backgroundColor: selectedColor, width: 100, height:100}}>
				{selectedColor}
			</div>

			{/* 선택된 색상 지우기 */}
			<Button onClick={() => dispatch(removeSelectColor(selectedColor))}>현재 배경 제거</Button>

			{/* Best color add remove*/}
			<div>
				{/* 색칠된거 누르면 저장*/}
				<FavoriteRoundedIcon sx={{color: selectedColor }}></FavoriteRoundedIcon>
				<Button sx={{ display: isBest ? 'none' : '' }}
					onClick={()=> {dispatch(addBestColor(selectedColor)); }}>Add Best</Button>
				<Button sx={{ display: isBest ? '' : 'none' }} 
					onClick={()=>{ dispatch(removeBestColor(selectedColor)); }}>Remove Best</Button>
			</div>


			{/* worst color add remove*/}
			<div>
				{/* 색칠된거 누르면 저장*/}
				<FavoriteRoundedIcon sx={{color: selectedColor }}></FavoriteRoundedIcon>
				<Button sx={{ display: isWorst ? 'none' : '' }}
					onClick={()=> {dispatch(addWorstColor(selectedColor)); }}>Add Worst</Button>
				<Button sx={{ display: isWorst ? '' : 'none' }} 
					onClick={()=>{ dispatch(removeWorstColor(selectedColor)); }}>Remove Worst</Button>
			</div>

		</Grid>


		{/* 컬러셋 들어가는 부분 */}
		<Grid item>
			<MainColorSet setIsBest={setIsBest} setIsWorst={setIsWorst}/>
		</Grid>

		<Grid item>
			<BestColorSet setIsBest={setIsBest}/>
			<WorstColorSet setIsWorst={setIsWorst} />
		</Grid>


	</Grid>

</>)
}

export default TemporaryRoom