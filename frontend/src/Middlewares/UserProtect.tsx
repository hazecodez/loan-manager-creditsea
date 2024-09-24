import React from "react";
import { Navigate } from "react-router-dom";

interface MiddlewareProps {
  children: React.ReactNode;
}

const UserProtect: React.FC<MiddlewareProps> = ({ children }) => {
  const logged = localStorage.getItem("userToken")

  if (logged) {
    return <>{children}</>;
  } else {
    return <Navigate to="/login" />;
  }
};

export default UserProtect;