import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../Contexts';
import '../styles.css';

export const Signin = () => {
  const { setUser } = useUser();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


const handleSignin = async (e) => {
  e.preventDefault();
  if (username !== '' && password !== '') {
    try {
      const response = await axios.get('http://localhost:3000/users?username=' + username + '&website=' + password);
      if (response.data && response.data.length > 0) {
        const { id, username } = response.data[0];
        setUser({ id: id, username: username });
        navigate('/');
      } else {
        alert('Invalid username or password');
      }
    } catch (error) {
      alert(error.response ? error.response.data.message : 'An error occurred while signing in');
    }
  }
};

  return (
    <div className="auth-container">
      <form onSubmit={handleSignin}>
        <h2>Sign In</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign In</button>

        <p>Don&apos;t have an account? <a href="/signup">Sign Up</a></p>      
        </form>
    </div>
  );
};
