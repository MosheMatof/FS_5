import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../Contexts';
import '../styles.css';

export const Home = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleLogout = () => {
    setUser(null); 
    localStorage.removeItem('user');
    navigate('/signin');
  };

  return (
    <div className="home-container">
      <h2>Home</h2>
      <nav>
        <Link to="/info">Info</Link>
        <Link to="/todos">Todos</Link>
        <Link to="/posts">Posts</Link>
        <Link to="/albums">Albums</Link>
      </nav>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};
