import React from 'react'
import {
  Routes,
  Route,
} from 'react-router-dom'

import './app.css'


const App = () => {
  return (
    <div className='container app__container'>
      <Routes>
        <Route path='/home' element={<p>home</p>} />
        <Route path='/history' element={<p>history</p>} />
        <Route path='/login' element={<p>login</p>} />
        <Route path='/signup' element={<p>signup</p>} />
      </Routes>
    </div>
  )
}

export default App