import React, { useState, useEffect } from "react";
import Top_nav from "../top-nav/Top_nav";
import { useLocation } from "react-router-dom";
import { Properties } from "../properties";

const Home = () => {
    
    const location = useLocation();

    let value = false;

    let username = 'User!';

    let newNotifications = false;

    let email = ''

    let notif_count = 0
    if(location.state){
        value = location.state.isLoggedIn;

        if(location.state.username){
            username = location.state.username + '!';
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

    }   
    //{isLoginSuccessful, username, email, newNotifications, notif_count
    //const {is_logged_in, username, email, is_new_notifications, updated_notifications_count} = Properties;
    return(
        <div>
            <Top_nav username={username} email={email} newNotifications = {newNotifications} />
            <h1>This is home page</h1>
        </div>
    );
    
}

export default Home;