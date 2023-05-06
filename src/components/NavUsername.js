import React, { useContext, useEffect } from 'react';
import UserContext from '../context/UserContext';
import { Nav, NavDropdown } from 'react-bootstrap';
import LogOutBtn from './auth/LogOutBtn';

const NavUsername = () => {
  const { loggedUser, getLoggedUser } = useContext(UserContext);

  useEffect(() => {
    getLoggedUser();
  }, []);

  return (
    <Nav>
      <NavDropdown title={loggedUser?.email} id="navbarScrollingDropdown2">
        <NavDropdown.Item>
          <LogOutBtn />
        </NavDropdown.Item>
      </NavDropdown>
    </Nav>
  );
};

export default NavUsername;
