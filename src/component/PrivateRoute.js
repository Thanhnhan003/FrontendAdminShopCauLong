import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const PrivateRoute = ({ children }) => {
  const token = Cookies.get('tokenAdmin');
  return token ? children : <Navigate to="/dang-nhap" />;
};

export default PrivateRoute;
