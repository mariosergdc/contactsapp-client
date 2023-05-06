import axios from 'axios';
import React, { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import ContactsContext from '../../context/ContactsContext';
import UserContext from '../../context/UserContext';
import { backUrl } from '../../consts/url';

const LogOutBtn = () => {
  const { getLoggedIn } = useContext(AuthContext);
  const { setContacts } = useContext(ContactsContext);
  const { setLoggedUser } = useContext(UserContext);
  const navigate = useNavigate();
  async function logOut() {
    try {
      await axios.get(`${backUrl}/auth/logout`);
      await getLoggedIn();
      setContacts(null);
      setLoggedUser(null);
      navigate('/');
    } catch (error) {
      alert('Error al cerrar sesión');
    }
  }

  return (
    <button className="btn btn-danger btn-sm m-1" onClick={logOut}>
      Log out
    </button>
  );
};

export default LogOutBtn;
