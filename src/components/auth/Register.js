import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Alert, Button, Spinner } from 'react-bootstrap';
import { HouseFill } from 'react-bootstrap-icons';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import { backUrl } from '../../consts/url';
const initialForm = {
  email: '',
  password: '',
  passwordVerify: '',
};
const Register = () => {
  const [form, setForm] = useState(initialForm);
  const { getLoggedIn } = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validations()) return;
    try {
      setLoading(true);
      await axios.post(`${backUrl}/auth`, form);
      await getLoggedIn();
      alert('Successful registration');
      setLoading(false);
      navigate('/');
    } catch (err) {
      if (err.response.status === 400) {
        alert(`Error: ${err.response.data.errorMessage}`);
      } else {
        alert('Failed to register');
      }
      setLoading(false);
    }
  };

  const validations = () => {
    let validationErrors = {};

    let regexEmail = /^(\w+[.-]?){1,}@[a-z]+[.]\w{2,}$/;
    let regexMinChars6 = /^.{6,}$/;

    if (!form.email.trim()) {
      validationErrors.email = 'Email is required';
    } else if (!regexEmail.test(form.email.trim())) {
      validationErrors.email = 'Wrong email format';
    }

    if (!form.password.trim()) {
      validationErrors.password = 'Password is required';
    } else if (!regexMinChars6.test(form.password.trim())) {
      validationErrors.password = 'Password must be at least 6 characters';
    }

    if (!form.passwordVerify.trim()) {
      validationErrors.passwordVerify = 'Password verification is required';
    } else if (!regexMinChars6.test(form.passwordVerify.trim())) {
      validationErrors.passwordVerify =
        'Password verification must be at least 6 characters';
    }

    if (form.password !== form.passwordVerify) {
      validationErrors.passwordMatch = 'Passwords must match';
    }

    setErrors(validationErrors);
    if (Object.entries(validationErrors).length === 0) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center cover">
      <div className="row container">
        {!loading && (
          <div className="col-12 col-md-6 offset-md-3 form-box p-3">
            <div className="mb-3 d-flex justify-content-between align-items-top">
              <h2>Register</h2>
              <div>
                <Link to="/">
                  <HouseFill className="m-2" />
                </Link>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <input
                className="form-control mb-3"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                onBlur={() => validations()}
                placeholder="Enter your email"
              />
              {errors.email && (
                <Alert className="validations-alert" variant="danger">
                  {errors.email}
                </Alert>
              )}
              <input
                className="form-control mb-3"
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                onBlur={() => validations()}
                placeholder="Enter your password"
              />
              {errors.password && (
                <Alert className="validations-alert" variant="danger">
                  {errors.password}
                </Alert>
              )}
              <input
                className="form-control mb-3"
                type="password"
                name="passwordVerify"
                value={form.passwordVerify}
                onChange={handleChange}
                onBlur={() => validations()}
                placeholder="Enter your password again"
              />
              {errors.passwordVerify && (
                <Alert className="validations-alert" variant="danger">
                  {errors.passwordVerify}
                </Alert>
              )}
              {errors.passwordMatch && (
                <Alert className="validations-alert" variant="danger">
                  {errors.passwordMatch}
                </Alert>
              )}

              <div className="d-flex justify-content-end">
                <Button className="btn btn-primary mb-1" type="submit">
                  Register
                </Button>
              </div>
            </form>
            <div>
              <p className="mb-0 text-center">
                <Link to="/login">Back to login?</Link>
              </p>
            </div>
          </div>
        )}
        <div className="container d-flex justify-content-center">
          {loading && <Spinner animation="border" />}
        </div>
      </div>
    </div>
  );
};

export default Register;
