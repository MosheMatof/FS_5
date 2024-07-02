import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../Contexts/UserContext';
import '../styles.css';

export const Signup = () => {
  const { setUser } = useUser();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (username !== '' && password !== '' && confirmPassword !== '') {
      if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
      }
      try {
        const response = await axios.post('http://localhost:3000/users', {
          username,
          password,
        });
        if (response.data) {
          const { id, username } = response.data;
          setUser({ id: id, username: username });
          navigate('/');
        } else {
          alert('Failed to create account');
        }
      } catch (error) {
        alert(error.response ? error.response.data.message : 'Error while signing up');
      }
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSignup}>
        <h2>Sign Up</h2>
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
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <p>Already have an account? <a href="/signin">Sign In</a></p>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};
