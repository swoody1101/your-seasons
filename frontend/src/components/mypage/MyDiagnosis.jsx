import React from 'react'
import ConsultantDiagnosis from './ConsultantDiagnosis'

// Mydiagnosis(자가진단도 넣게되면, 컴포넌트 분리 필요함)
// 따라서, 내 진단(mydiagnosis) -> (컨설턴트진단, 셀프진단 컴포넌트 있음)
const MyDiagnosis = () => {
	return (<>
	<ConsultantDiagnosis />	
	</>
	)
}

export default MyDiagnosis