import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const PublicRoute = ({ children }) => {
  const token = Cookies.get('tokenAdmin');
  
  if (token) {
    // Nếu có token, chuyển hướng người dùng đến trang dashboard
    return <Navigate to="/dashboard" />;
  }

  // Nếu không có token, hiển thị component con
  return children;
};

export default PublicRoute;
