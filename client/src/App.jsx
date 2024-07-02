import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout, Signin, Signup, Home, Info, Todos, Posts, Albums, ErrorPage } from './components';
import { useUser } from './Contexts';
import './styles.css';

const App = () => {
  const { user } = useUser();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}> 
          <Route index element={user ? <Home /> : <Navigate to="/signin" />} />
          <Route path="/signin" element={user ? <Navigate to="/" /> : <Signin />} />
          <Route path="/signup" element={user ? <Navigate to="/" /> : <Signup />} />
          <Route path="/info" element={user ? <Info /> : <Navigate to="/signin" />} />
          <Route path="/todos" element={user ? <Todos /> : <Navigate to="/signin" />} />
          <Route path="/posts" element={user ? <Posts /> : <Navigate to="/signin" />} />
          <Route path="/albums" element={user ? <Albums /> : <Navigate to="/signin" />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
