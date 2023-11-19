// Login.js
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ handleLogin }) => {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const navigate =useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const usernameValue = usernameRef.current.value;
    const passwordValue = passwordRef.current.value;

    // Retrieve user data from local storage
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    
    // Find the user in the local storage
    const user = storedUsers.find(u => u.username === usernameValue && u.password === passwordValue);

    if (user) {
      // Successfully logged in
      handleLogin(user);
      navigate('/react-ecommerce-store/browse');

    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <div>
      <h2 className="h">Login</h2>
      <br />
      <form onSubmit={handleSubmit} className="forme">
        <div>
          <label className="lab">
            Username:
            <input type="text" ref={usernameRef} className="inp" required />
          </label>
        </div>

        <div>
          <label className="lab">
            Password:
            <input type="password" ref={passwordRef} className="inp" required />
          </label>
        </div>
        <div>
          <button type="submit" className="but">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
