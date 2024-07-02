import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../Contexts/UserContext';
import '../styles.css';

export const Signup = () => {
  const { setUser } = useUser();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    if(username !== '' && password !== '' && confirmPassword !== ''){
      if(password !== confirmPassword){
        alert('Passwords do not match');
        return;
      }
      setUser({ username });
      localStorage.setItem('user', JSON.stringify({ username }));
      navigate('/');
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
