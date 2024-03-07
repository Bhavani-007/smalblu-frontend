
import React, { useEffect, useState } from "react";
import logo from '../quantblu-logo.png';
import { useLocation } from "react-router-dom";
import zero_notif from '../zero-Notifications-png.png'
import new_notifications from '../new-notifications-png.png';
import profile from '../profile.svg'
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import './Navbar.css'

const Navbar = (props) => {
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([]); 
    const [isNewNotifications, setIsNewNotifications] = useState(false);
    const [initialRender, setInitialRender] = useState(true);

    useEffect(() => {
        if (!initialRender) {
        setIsNewNotifications(true);
        console.log('navbar useEffect ran');
        } else {
            setInitialRender(false);
        }
    }, [props.isNewNotifications]);
    
    const handleNotificationsClick =  () => {
        setIsNewNotifications(false);
        sessionStorage.setItem('on_notifications_page',true)
        navigate('/notifications')
    }

    const onHomeClick = () => {
        sessionStorage.removeItem('on_notifications_page')
    }
    
    const handleLogoutClick = () => {
        
        sessionStorage.clear();
    }
  

    return(
        <div>
            {sessionStorage.getItem('isLoggedIn')? 
                (<div id='top-nav' style={{backgroundColor:'#F6CA5A'}}>
                    <img src={logo} height="36" width="160"/>

                    {isNewNotifications
                    ? (<img onClick = {handleNotificationsClick} src={new_notifications} height="36" width="40" style={{cursor:'pointer'}}/>) 
                    : (<img onClick= {handleNotificationsClick} src={zero_notif} height="36" width="40" style={{cursor:'pointer'}}/>)}
                    
                    <div id='top-nav' style={{borderStyle:'solid', borderColor:'brown'}}>
                        <div><span>{`Hi ${sessionStorage.getItem('username')}`}</span></div>
                        <img src={profile} height="36" width="160"/>
                    </div>
                    {sessionStorage.getItem('on_notifications_page') && <Link onClick={onHomeClick} to='/'>Home</Link> }
                    <Link onClick={handleLogoutClick} to='/'>Logout</Link>
                </div>
                ) :
                
                (<div id='top-nav' style={{backgroundColor:'#B6F5E8'}}>
                    <img src={logo} height="36" width="160"/>
                    <Link  to='/signup' id='signup-button'>Signup</Link>
                    <Link to='/login' id='login-button'>Login</Link>
                </div>
                )
            } 
              
        </div>
    );
}

export default Navbar;
