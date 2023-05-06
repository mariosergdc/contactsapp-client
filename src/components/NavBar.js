import React, { useContext } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { People, PersonAdd } from 'react-bootstrap-icons';
import { NavLink, useLocation } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import NavUsername from './NavUsername';

function NavBar() {
  const { loggedIn } = useContext(AuthContext);

  let location = useLocation();
  if (location.pathname === '/login' || location.pathname === '/register')
    return;
  return (
    <div className="mb-2 container">
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand as={NavLink} to="/">
            ContacsApp
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              {loggedIn && (
                <>
                  <Nav.Link as={NavLink} to="/contacts">
                    Contacts <People style={{ marginTop: '-0.2rem' }} />
                  </Nav.Link>

                  <Nav.Link as={NavLink} to="/contact/add">
                    Add Contact
                    <PersonAdd style={{ marginTop: '-0.2rem' }} />
                  </Nav.Link>
                </>
              )}
            </Nav>

            {loggedIn && <NavUsername />}
            {loggedIn === false && (
              <>
                <Nav.Link as={NavLink} to="/login" className="me-2">
                  Login
                </Nav.Link>
                <Nav.Link as={NavLink} to="/register">
                  Register
                </Nav.Link>
              </>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavBar;
