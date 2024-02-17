import React from 'react';
import Home from './Home/Home';
import SignUp from './Auth/Signup';
import Login from './Auth/Login';
import Notifications from './Notifications/Notifications';
import SendNotification from './Notifications/Admin';
import {BrowserRouter as Router,
  Route,
  BrowserRouter,
  Routes
} from 'react-router-dom';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/notifications' element={<Notifications />} />
          <Route path='/admin' element={<SendNotification />} />
        </Routes>
      </BrowserRouter>
    </div>
  
  );
};

export default App;
