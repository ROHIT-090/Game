import React, { useState } from 'react';

const Signup = ({ onSignup, onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    // Perform signup logic (you may want to replace this with an API call)
    // For simplicity, just alert the new user information
    alert(`Signup successful!\nUsername: ${username}\nPassword: ${password}`);
    onSignup(username);
    onClose(); // Close the signup modal or do any other necessary actions
  };

  return (
    <div>
      <h2>Signup</h2>
      <form>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="button" onClick={handleSignup}>
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
