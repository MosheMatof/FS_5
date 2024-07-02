import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../Contexts';
import '../styles.css';

export const Signin = () => {
  const { setUser } = useUser();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignin = (e) => {
    e.preventDefault();
    if(username !== '' && password !== ''){
      setUser({ username });
      localStorage.setItem('user', JSON.stringify({ username }));
      navigate('/');
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

        <p>Don&apos;t have an account? <a href="/signup">Sign Up</a></p>      </form>
    </div>
  );
};
