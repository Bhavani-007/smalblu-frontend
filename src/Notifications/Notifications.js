import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Top_nav from "../top-nav/Top_nav";
import { Properties } from "../properties";
import WebSocketService from "../useWebSocket";

const Notifications = () => {
    const navigate = useNavigate();
    const location = useLocation();
    let [notificationsArray, setNotificationsArray] = useState([]);
    let [userMessage,setUserMessage] = useState('');
    
    useEffect(() => {
        // Establish WebSocket connection when component mounts
        const disconnect = useWebSocket('wss://smalblu-frontend.onrender.com:10000/ws', handleWebSocketMessage);
    
        // Cleanup: Close WebSocket connection when component unmounts
        return disconnect;
    }, []);
    
      const handleWebSocketMessage = (message) => {
        const newNotification = JSON.parse(message);
        setNotificationsArray(prevNotifications => [newNotification, ...prevNotifications]);
      };

    useEffect(() => {
    fetch('https://smalblu-frontend.onrender.com/notifications', {
      method: 'get',
      headers: { 'Content-Type': 'application/json' },
    }).then(response => response.json())
      .then(notifications => {
        if(notifications.success){
            setNotificationsArray(notifications.notifications);
        }
        setUserMessage(notifications.message);
        
      }).catch(console.log)
    }, []); 

    /*if(location.state){
      isLoginSuccessful = location.state.isLoggedIn;

      if(location.state.username){
          username = location.state.username + '!';
          console.log(username)
      }

      if(location.state.newNotifications == true){
          newNotifications = true;
      }

      if(location.state.email){
          email = location.state.email;
      }

      if(location.state.notif_count){
          notif_count = location.state.notif_count;
      }

  }*/
      
    const {is_logged_in, username, email, is_new_notifications, updated_notifications_count} = Properties;
    return(
        <div>
            
            <Top_nav isLoginSuccessful={is_logged_in} username={username} email={email} newNotifications = {is_new_notifications} notif_count={updated_notifications_count}/>
            <h1>Notifications</h1>
            <div style={{display:'flex', flexDirection:'column'}}>
            {notificationsArray.slice().reverse().map (notification => 
                (
                    <div key={notification.id} style={{display: 'flex', flexDirection:'column',margin: '20px', borderStyle: 'solid', borderWidth: '2px'}}>
                    <div>{notification.text}</div>
                    <div>{notification.createdDate.slice(0,10)}</div>
                    </div>
                )
            )}
            </div>
        </div>
    );
}

export default Notifications;


/*import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Top_nav from "../top-nav/Top_nav";
import { Properties } from "../properties";

const Notifications = () => {
    const navigate = useNavigate();
    const location = useLocation();
    let [notificationsArray, setNotificationsArray] = useState([]);
    let [userMessage,setUserMessage] = useState('');
  
    useEffect(() => {
    fetch('https://smalblu-frontend.onrender.com/notifications', {
      method: 'get',
      headers: { 'Content-Type': 'application/json' },
    }).then(response => response.json())
      .then(notifications => {
        if(notifications.success){
            setNotificationsArray(notifications.notifications);
        }
        setUserMessage(notifications.message);
        
      }).catch(console.log)
    }, []); 

  
      
    const {is_logged_in, username, email, is_new_notifications, updated_notifications_count} = Properties;
    return(
        <div>
            
            <Top_nav isLoginSuccessful={is_logged_in} username={username} email={email} newNotifications = {is_new_notifications} notif_count={updated_notifications_count}/>
            <h1>Notifications</h1>
            <div style={{display:'flex', flexDirection:'column'}}>
            {notificationsArray.slice().reverse().map (notification => 
                (
                    <div key={notification.id} style={{display: 'flex', flexDirection:'column',margin: '20px', borderStyle: 'solid', borderWidth: '2px'}}>
                    <div>{notification.text}</div>
                    <div>{notification.createdDate.slice(0,10)}</div>
                    </div>
                )
            )}
            </div>
        </div>
    );
}

export default Notifications;*/