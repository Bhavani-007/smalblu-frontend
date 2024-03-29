import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './Auth.css';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import Axios library

const SignUp = () => {
  const navigate = useNavigate(); 
  const [signupUsername, setSignupUsername] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('')

  const onNameChange = (event) => {
    setSignupUsername(event.target.value);
  }

  const onEmailChange = (event) => {
    setSignupEmail(event.target.value);
  }

  const onPasswordChange = (event) => {
    setSignupPassword(event.target.value);
  }
 

const onSubmitRegister = async () => { // Define onSubmitRegister as an async function
  try {
    const response = await axios.post('http://127.0.0.1:5000/signup', {
      email: signupEmail,
      username: signupUsername,
      password: signupPassword,
    }, {
      headers: { 'Content-Type': 'application/json' }, // Set request headers
      withCredentials: true,
    });

    const userData = response.data; // Extract data from response

    if (userData.success) {
      setSuccessMessage(userData.message);
      setTimeout(() => {
        navigate('/'); // Navigate to the home page after 1.5 seconds
      }, 1500);
    } else {
      setSignupUsername('');
      setSignupEmail('');
      setSignupPassword('');
      setErrorMessage(userData.message);
    }
  } catch (error) {
    console.error(error); // Log any errors to the console
  }
};


  return (
    <div>
      <div className="popup">
        <div className="popup-inner">
        <Link to='/' className='close-button'>x</Link>
          <h2 className='text'>Signup</h2>
            <label>
                Username:
                <input type="text" value={signupUsername} onChange={onNameChange}/>
            </label>
            <label>
                Email:
                <input type="text" value={signupEmail} onChange={onEmailChange} />
            </label>
            <label className='text'>
                Password:
                <input type="password" value={signupPassword} onChange={onPasswordChange} />
            </label>
            <button type="submit" className='text' onClick={onSubmitRegister}>Signup</button>
            {errorMessage && <p className="login-error-message">{errorMessage}</p>}
            {successMessage && <p className="login-error-message">{successMessage}</p>}
        </div>
      </div>

    </div>
  );
}

export default SignUp;

