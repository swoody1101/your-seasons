import React from 'react'
import { Grid, styled } from '@mui/material'
import SelfMainColorSet from './SelfMainColorSet'

const SelfColorPalette = ({
	setIsBest,
	setIsWorst
}) => {
	return (
		<SGrid>
			<SelfMainColorSet setIsBest={setIsBest} setIsWorst={setIsWorst} />
		</SGrid>
	)
}

export default SelfColorPalette

SelfColorPalette.defaultProps = {
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