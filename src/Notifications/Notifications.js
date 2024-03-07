

import React, { useState, useEffect } from "react";


const Notifications = ({array, onNotificationsPage}) => {
   
  
    useEffect(() => {
      
        fetch('http://127.0.0.1:5000/update',{
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            
            body: JSON.stringify({
              email: localStorage.getItem('email'),
              count: sessionStorage.getItem('updated_notifications_count')
            })
            
            }).then(response => 
            response.json())
            .then(data => {
                if(data.success)
                localStorage.setItem('user_notifications_count',sessionStorage.getItem('updated_notifications_count'))
                console.log('user notification count updated!')
            })
            .catch(error => console.error('Error: ', error))
        
    },[onNotificationsPage])
      
   
    return(
        <div>
            <h1>Notifications</h1>
            <div style={{display:'flex', flexDirection:'column'}}>
            {array.slice().reverse().map (notification => 
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