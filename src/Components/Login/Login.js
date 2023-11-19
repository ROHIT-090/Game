// App.js
import React, { useState } from 'react';
import './Login.css';
import Login from './Login1';
import Signup from './Signup';
import NavBar from '../NavBar/NavBar';

function App() {
  const [activeView, setActiveView] = useState('login');
  const [currentUser, setCurrentUser] = useState(null);

  const handleViewChange = (view) => {
    setActiveView(view);
  };

  const handleLogin = (user) => {
    setCurrentUser(user);
  };

  const handleSignup = (user) => {
    setCurrentUser(user);
  };
  const handleLogout=()=>
  {
    setCurrentUser(null);
  }

  return (
    <>
      <div className="App">
        <div className="view-switcher">
          {currentUser ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <>
          <button onClick={() => handleViewChange('login')}>Login</button>
          <button onClick={() => handleViewChange('signup')}>Sign Up</button>
          </>
          )}
        </div>
       
        {activeView === 'login' ? <Login handleLogin={handleLogin} /> : <Signup handleSignup={handleSignup} />}
      </div>
      {currentUser && (
        <div>
          <p>Welcome, {currentUser.username}!</p>
          
        </div>
      )}
    </>
  );
}

export default App;
