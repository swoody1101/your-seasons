import { Button, styled } from '@mui/material'
import React from 'react'

const PinkButton = ({ btnText, width, isClick} ) => {
	const handleClick =() => {
		isClick()
	}
	
	return (
			<IsButton wd={width} onClick={handleClick} >{btnText}</IsButton>
	)
}

export default PinkButton

const IsButton = styled(Button)((props)=>({
	backgroundColor: '#FFB471',
	color: 'black',
	'&:hover': {
		backgroundColor: '#FFB471',
		color: 'white',
		fontWeight: 'normal',
},
	fontWeight: 'bold',
	width: `${props.wd}px`,
}))