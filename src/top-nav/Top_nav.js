import React from "react";
import logo from '../quantblu-logo.png';
import './Top_nav.css'
import zero_notif from '../zero-Notifications-png.png'
import new_notifications from '../new-notifications-png.png';
import profile from '../profile.svg'
import { Link, useNavigate } from "react-router-dom";
import { Properties } from "../properties";


const Top_nav = ( { newNotifications } ) => {
    const navigate = useNavigate();

    const handleClick = async () => {
        await fetch('http://localhost:5000/update',{
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            
            body: JSON.stringify({
              email: Properties.email,
              count: Properties.updated_notifications_count,
            })
            
        }).then(response => 
            response.json())
        .then(message => console.log(message))
        .catch(error => console.error('Error: ', error))
        Properties.is_new_notifications = false;
        Properties.on_home_page = false;
        navigate('/notifications')
    }

    const navigateToNotif = () => {
        
        navigate('/notifications')
        Properties.on_home_page = false;
    }
    
    const handleLogoutClick = () => {
        Properties.is_logged_in = false
        Properties.username = 'User'
        Properties.email = '@gmail.com'
        Properties.user_notifications_count = 0
        Properties.updated_notifications_count = 0
        Properties.is_new_notifications = false
        Properties.on_home_page = true
    }

    const handlePageChange = () => {     //when moving to any other page from home page
        Properties.on_home_page = false;
    }

    const toHome= () => {
        Properties.on_home_page = true;
    }
  
    console.log(Properties.is_new_notifications)
    console.log(Properties.is_logged_in)
    return(
        <div>
            {Properties.is_logged_in == true? 
                (<div id='top-nav' style={{backgroundColor:'#F6CA5A'}}>
                    <img src={logo} height="36" width="160"/>
                    {(newNotifications)
                    ? (<img onClick = {handleClick} src={new_notifications} height="36" width="40" style={{cursor:'pointer'}}/>) 
                    : (<img onClick= {navigateToNotif} src={zero_notif} height="36" width="40" style={{cursor:'pointer'}}/>)}
                    
                    <div id='top-nav' style={{borderStyle:'solid', borderColor:'brown'}}>
                        <div><span>{`Hi ${Properties.username}`}</span></div>
                        <img src={profile} height="36" width="160"/>
                    </div>
                    {Properties.on_home_page==false && <Link onClick = {toHome} to='/'>Home</Link>}
                    <Link onClick={handleLogoutClick} to='/'>Logout</Link>
                </div>
                ) :
                (<div id='top-nav' style={{backgroundColor:'#B6F5E8'}}>
                    <img src={logo} height="36" width="160"/>
                    <Link onClick = {handlePageChange} to='/signup' id='signup-button'>Signup</Link>
                    <Link onClick = {handlePageChange}to='/login' id='login-button'>Login</Link>
                </div>
                )
            }   
        </div>
    );
}

export default Top_nav;
