import { Outlet, Link } from 'react-router-dom';
import '../styles.css';

export const Layout = () => {
  return (
    <div>
      <nav>
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/info" className="nav-link">Info</Link>
          </li>
          <li className="nav-item">
            <Link to="/todos" className="nav-link">Todos</Link>
          </li>
          <li className="nav-item">
            <Link to="/posts" className="nav-link">Posts</Link>
          </li>
          <li className="nav-item">
            <Link to="/albums" className="nav-link">Albums</Link>
          </li>
        </ul>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
};