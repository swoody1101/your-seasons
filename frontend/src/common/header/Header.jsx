import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import LOGO from '../../assets/images/ssafy-logo.png'

import './header.css'

const Header = () => {
  const [searchKey, setSearchKey] = useState('');
  const searchKeyOnChange = (e) => {
    e.preventDefault();
    setSearchKey(e.target.value);
  }

  return (
    <div className='container header__container'>
      <div className="header__logo"><Link to="home"><img src={LOGO} alt='logo' /></Link></div>

      <div className="container header__wrapper">
        <div className="input__wrapper">
          <input
            className='search__input'
            type="text"
            name={searchKey}
            onChange={searchKeyOnChange} />
          <button className='btn'>검색</button>
        </div>
        <div className="btn__wrapper">
          <Link to="signup"><button className="btn">회원가입</button></Link>
          <Link to="login"><button className="btn">로그인</button></Link>
        </div>
      </div>

    </div >
  )
}

export default Header