import React from 'react'
import { Grid, styled } from '@mui/material'
import MainColorSet from './MainColorSet'

const ColorPalette = ({
	setIsBest,
	setIsWorst
}) => {
	return (
		<SGrid>
			<MainColorSet setIsBest={setIsBest} setIsWorst={setIsWorst} />
		</SGrid>
	)
}

export default ColorPalette

ColorPalette.defaultProps = {
	setIsBest: () => { },
	setIsWorst: () => { }
}

const SGrid = styled(Grid)({
	display: "flex",
	justifyContent: "center",
	// width: '100%',
	// height: '100%',
	// flexDirection: "row",
})