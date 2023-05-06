import axios from 'axios';
import React, { createContext, useState } from 'react';
import { backUrl } from '../consts/url';

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [loggedUser, setLoggedUser] = useState(null);

  const getLoggedUser = async () => {
    try {
      const res = await axios.get(`${backUrl}/auth/loggeduser`);
      setLoggedUser(res.data);
    } catch (err) {
      alert('error');
    }
  };

  return (
    <UserContext.Provider value={{ loggedUser, getLoggedUser, setLoggedUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContextProvider };
export default UserContext;
