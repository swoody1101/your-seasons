import React from "react";
import whitestar from '../../assets/images/whitestar.png'
import filledstar from '../../assets/images/filledstar.png'
import './ConsultantProfile.css'

const StarRating = props => {
  return (
    <div className="starbox" style={{ width: props.starrating * 20 }}>
      <img
        className="pointofstar"
        alt="별"
        src={filledstar}
      />
      <img
        className="backgrdoundstar"
        alt="별"
        src={whitestar}
      />
    </div>
  )
}

export default StarRating