import React from 'react';
import SignUp from './Auth/Signup';
import Login from './Auth/Login';
import Notifications from './Notifications/Notifications';
import SendNotification from './Notifications/Admin';
import Navbar from './Navbar/Navbar';
import { useState, useEffect } from 'react';
import {BrowserRouter as Router,
  Route,
  BrowserRouter,
  Routes
} from 'react-router-dom';

const App = () => {

  let [notificationsArray, setNotificationsArray] = useState([]);
  let [isNewNotifications, setIsNewNotifications] = useState(false);
  let [isOnNotificationsPage, setIsOnNotificationsPage] = useState(false);
 
  useEffect (() => {
    // Function to fetch notifications from the server
    const fetchNotifications = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/notifications');
        const data = await response.json();
        if(data.success) {          //if notifications fetched successfully
          setNotificationsArray(data.notifications);
          if(sessionStorage.getItem('updated_notifications_count') === null) {
            sessionStorage.setItem('updated_notifications_count',data.count)
          } else {
            if (sessionStorage.getItem('isLoggedIn') === 'true') {   
              //check if notification count increased in the current fetch
              if((parseInt(data.count) > parseInt(sessionStorage.getItem('updated_notifications_count')) ) || ( (sessionStorage.getItem('updated_notifications_count')) > parseInt(localStorage.getItem('user_notifications_count')))) {
                console.log('true');
                sessionStorage.setItem('updated_notifications_count',data.count)
                //if user is not on notfications page, set the red marked bell icon
                if (sessionStorage.getItem('on_notifications_page')===null)  {
                  setIsNewNotifications(prevIsNewNotifications => !prevIsNewNotifications)
                }
                console.log('is new notifications: ',isNewNotifications)

                //if user is already on notifications page, update the user-notifications count
                if(sessionStorage.getItem('on_notifications_page')==='true') {
                    console.log('onNotificationsPage')
                    setIsOnNotificationsPage(prevIsOnNotificationsPage => !prevIsOnNotificationsPage);
                    console.log(isOnNotificationsPage)
                      
                }
              }
            } 
          }
            
          console.log('received notifications')
        }
          
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    
      // Initial fetch
      fetchNotifications();

      // Polling interval (fetch every 30 seconds)
      const interval = setInterval(fetchNotifications, 20000);

      // Clean up interval
      return () => clearInterval(interval); 
    
  },[])

  
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Navbar isNewNotifications={isNewNotifications} />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/notifications' element={<><Navbar isNewNotifications={isNewNotifications} /><Notifications array={notificationsArray} onNotificationsPage={isOnNotificationsPage}/></>} />
          <Route path='/admin' element={<SendNotification />} />
        </Routes>
      </BrowserRouter> 
    </div>
  
  );
};

export default App;
