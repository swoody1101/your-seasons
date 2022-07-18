import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../authSlice'

import './login.css'

const Login = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const isLoading = false;


  const dispatch = useDispatch();

  function handleUserId(event) {
    const { value } = event.target;

    if (value.length < 17) {
      setUserId(value.replace(/\s/g, ''));
      return true;
    }
    return false;
  }

  function handlePassword(event) {
    const { value } = event.target;
    if (value.length <= 20) {
      setPassword(value.replace(/\s/g, ''));
      return true;
    }
    return false;
  }


  const form = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      userId,
      password,
    };
    dispatch(loginUser({ data }))
  }

  // template
  return (
    <div className='login__container'>
      <h2>로그인</h2>
      <form ref={form} onSubmit={handleSubmit}>
        <input
          placeholder="ID"
          onChange={handleUserId}
          name="userId"
          value={userId}
        />

        <input
          placeholder="PASSWORD"
          onChange={handlePassword}
          name="password"
          type="password"
          value={password}
        />

        <button className='btn btn-primary' type="submit">
          {isLoading ? '로그인 중입니다.' : '로그인'}
        </button>
      </form>
    </div>
  )
}

export default Login