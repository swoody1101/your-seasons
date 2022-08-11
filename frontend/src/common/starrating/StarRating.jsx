import React from "react";
import whitestar from 'assets/images/whitestar.png'
import filledstar from 'assets/images/filledstar.png'
import './starrating.css'

const StarRating = props => {
  const starwidth = props.starrating
  return (
    <div className="starbox" style={{ display:starwidth ? '' : 'none',  width: starwidth ? starwidth * 20 : '' }}>
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