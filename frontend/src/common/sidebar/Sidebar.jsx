import React from 'react'
import { Link } from 'react-router-dom'
import './sidebar.css'

const Sidebar = () => {
  return (
    <div className='sidebar__container'>
      <ul>
        <Link to="home"><li>홈</li></Link>
        <Link to="history"><li>지난회의이력</li></Link>
      </ul>

    </div>
  )
}

export default Sidebar