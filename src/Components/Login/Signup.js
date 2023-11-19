// Signup.js
import React, { useRef } from 'react';

const Signup = ({ handleSignup }) => {
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    const usernameValue = usernameRef.current.value;
    const emailValue = emailRef.current.value;
    const passwordValue = passwordRef.current.value;

    // Retrieve user data from local storage
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

    // Check if the username is already taken
    if (storedUsers.some(u => u.username === usernameValue)) {
      alert("Username already exists. Please choose a different username.");
      return;
    }

    // Add the new user to the local storage
    const newUser = { username: usernameValue, email: emailValue, password: passwordValue };
    storedUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(storedUsers));

    // Successfully signed up
    handleSignup(newUser);
  };

  return (
    <div>
      <h2 className='h'>Signup</h2>
      <br />
      <form onSubmit={handleSubmit} className='forme'>
        <div>
          <label className='lab'>
            Username:
            <input type="text" ref={usernameRef} className='inp' required />
          </label>
        </div>

        <div>
          <label className='lab'>
            Email:
            <input type="email" ref={emailRef} className='inp' required />
          </label>
        </div>

        <div>
          <label className='lab'>
            Password:
            <input type="password" ref={passwordRef} className='inp' required />
          </label>
        </div>
        <div>
          <button type="submit">Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
