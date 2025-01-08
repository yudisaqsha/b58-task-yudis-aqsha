import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/authcontext'; // Assuming you have AuthContext set up

interface PrivateRouteProps {
    element: React.ReactNode;
   
  }
// interface PrivateRouteProps extends RouteProps {
//   component: React.ComponentType<any>;
// }

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, ...rest }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="/login" /> // Redirect to login if not authenticated
  );
  };
  
export default PrivateRoute;

