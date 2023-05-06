import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import Login from './auth/Login';
import Register from './auth/Register';
import ContactForm from './contacts/ContactForm';
import ContactFormEdit from './contacts/ContactFormEdit';
import ContactPage from './contacts/ContactPage';
import Contacts from './contacts/Contacts';
import NavBar from './NavBar';
import PrivateRoute from './PrivateRoute';
import PublicRouteOnlyUnlogged from './PublicRouteOnlyUnlogged';
import Error404 from '../pages/Error404';

function Ruta() {
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route
            path="/contact/add"
            element={
              <PrivateRoute>
                <ContactForm />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/contact/edit/:contactid"
            element={
              <PrivateRoute>
                <ContactFormEdit />
              </PrivateRoute>
            }
          ></Route>

          <Route
            path="/register"
            element={
              <PublicRouteOnlyUnlogged>
                <Register />
              </PublicRouteOnlyUnlogged>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRouteOnlyUnlogged>
                <Login />
              </PublicRouteOnlyUnlogged>
            }
          ></Route>
          <Route
            path="/contacts"
            element={
              <PrivateRoute>
                <Contacts />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/contacts/:contactid"
            element={
              <PrivateRoute>
                <ContactPage />
              </PrivateRoute>
            }
          ></Route>
          <Route path="*" element={<Error404 />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Ruta;
