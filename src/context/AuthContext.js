import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { backUrl } from '../consts/url';

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const getLoggedIn = async () => {
    try {
      const res = await axios.get(`${backUrl}/auth/loggedin`);
      setLoggedIn(res.data);
    } catch (err) {
      alert('Sesion error');
    }
  };
  useEffect(() => {
    getLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ loggedIn, getLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContextProvider };
export default AuthContext;
