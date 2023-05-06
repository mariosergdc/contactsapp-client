import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const PublicRouteOnlyUnlogged = ({ children }) => {
  const { loggedIn } = useContext(AuthContext);
  if (!loggedIn) return children;
  return <Navigate to="/" />;
};

export default PublicRouteOnlyUnlogged;
