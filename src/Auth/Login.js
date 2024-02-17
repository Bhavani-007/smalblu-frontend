import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import './Auth.css';
import { Properties } from '../properties';

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

  const onSubmitSignIn = () => {
    fetch('http://127.0.0.1:5000/login', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: logInEmail,
        password: logInPassword,
      })
    }).then(response => response.json())
      .then(userData => {
        //const user_notifications_count = userData.user.notification_count;
        

        if (userData.success) {
          
          Properties.user_notifications_count = userData.user.notification_count;
        Properties.username = userData.user.username;
        Properties.email = userData.user.email;

          fetch('http://127.0.0.1:5000/notifications-count',{
            method: 'get',
            headers: { 'Content-Type': 'application/json' },
          }).then(response => response.json())
          .then(data => {
            if(data.success){

              Properties.updated_notifications_count = data.count;

              if (Properties.updated_notifications_count > Properties.user_notifications_count){
                Properties.is_new_notifications = true;
                console.log("notifications count increased")
                console.log('notif count: '+Properties.updated_notifications_count)
                console.log('user count : '+Properties.user_notifications_count)
                console.log("is New Notifications: "+Properties.is_new_notifications);
                navigate('/',{state:{newNotifications: true}})
                //navigate('/',{state:{isLoggedIn:true, username:userData.user.username, email: userData.user.email, newNotifications:true, notif_count:data.count}}); // Navigate to the home page
                
              } else {
                console.log("notifications count is same")
                navigate('/',{state:{newNotifications: false}})
              //navigate('/',{state:{isLoggedIn:true, username:userData.user.username, newNotifications:false}});
              }
            } else {
              console.log("notifications count is same")
              navigate('/',{state:{newNotifications: false}})
              //navigate('/',{state:{isLoggedIn:true, username:userData.user.username, newNotifications:false}});
            }
          }) 
          Properties.on_home_page = true 
          Properties.is_logged_in = true;
          //navigate('/')
        } else {
          // Handle login failure
          //navigate('/',{state:{isLoggedIn:false}})
          
          setErrorMessage(userData.message);
          setlogInEmail('');
          setLogInPassword('');
        }
      }).catch(console.log)
  }

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