
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import './Auth.css';

import axios from 'axios';

const Login = ({ }) => {
    const navigate = useNavigate(); 
  const [logInEmail, setlogInEmail] = useState('');
  const [logInPassword, setLogInPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const onEmailChange = (event) => {
    setlogInEmail(event.target.value);
  }

  const onPasswordChange = (event) => {
    setLogInPassword(event.target.value);
  }



const onSubmitSignIn = async () => {
  try {
    // Login request
    const loginResponse = await axios.post('http://127.0.0.1:5000/login', {
      email: logInEmail,
      password: logInPassword,
    }, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    });

    const userData = loginResponse.data;

    if (userData.success) {
      
      sessionStorage.setItem('username',userData.user.username)
      sessionStorage.setItem('isLoggedIn',true);
      
      if(localStorage.getItem('email')!==userData.user.email) {
        localStorage.clear();
        localStorage.setItem('email',userData.user.email)
        localStorage.setItem('user_notifications_count',userData.user.notification_count)
      }
        
      console.log('login resulting values are set')

    navigate('/')
      
    } else {
      setErrorMessage(userData.message);
      setlogInEmail('');
      setLogInPassword('');
    }
  } catch (error) {
    console.error(error);
  }
};


  return (
    <div>
      <div className="popup">
        <div className="popup-inner">
          <Link to='/' className='close-button'>x</Link>
          <h2 className='text'>Login</h2>
          <label>
            Email:
            <input type="text" value={logInEmail} onChange={onEmailChange} />
          </label>
          <label className='text'>
            Password:
            <input type="password" value={logInPassword} onChange={onPasswordChange} />
          </label>
          <button type="submit" className='text' onClick={onSubmitSignIn}>Login</button>
          {errorMessage && <p className="login-error-message">{errorMessage}</p>}

        </div>
      </div>

    </div>
  );
}

export default Login;