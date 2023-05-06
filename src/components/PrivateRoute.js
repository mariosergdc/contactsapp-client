import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { loggedIn } = useContext(AuthContext);
  if (loggedIn) return children;
  return <Navigate to="/login" />;
};

export default PrivateRoute;
