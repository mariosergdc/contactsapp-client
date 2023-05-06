import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Accordion from 'react-bootstrap/Accordion';
import {
  Person,
  Telephone,
  EnvelopeAt,
  GeoAlt,
  PersonCircle,
  Camera,
} from 'react-bootstrap-icons';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import ContactPicModal from '../ContactPicModal';
import useModal from '../../hooks/useModal';
import ContactsContext from '../../context/ContactsContext';
import { Alert } from 'react-bootstrap';
import { backUrl } from '../../consts/url';

const initialForm = {
  imgFile: '',
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  street: '',
  city: '',
  state: '',
};
const ContactFormEdit = () => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const { contactid } = useParams();
  const [isOpenContactPicModal, openContactPicModal, closeContactPicModal] =
    useModal();
  const { getContacts } = useContext(ContactsContext);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .post(`${backUrl}/contacts/getcontactbyid`, {
        contactid,
      })
      .then((res) => {
        if (res.data === null) {
          alert('the contact does not exist');
          return;
        }
        const contactToEdit = {
          imgFile: res.data.imgFile,
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          phone: res.data.phone,
          email: res.data.email,
          street: res.data.street,
          city: res.data.city,
          state: res.data.state,
        };
        setForm(contactToEdit);
      })
      .catch((err) => {
        alert('Error reaching contact');
      });
  }, [contactid]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const validations = () => {
    let validationErrors = {};
    let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]*$/;
    let regexPhone = /^\+?[\d\s-]{0,15}$/;
    let regexEmail = /^((\w+[.-]?){1,}@[a-z]+[.]\w{2,}){0,1}$/;
    let regexMaxChars255 = /^.{0,255}$/;

    if (!form.firstName.trim()) {
      validationErrors.firstName = 'El nombre del contacto es requerido';
    } else if (!regexName.test(form.firstName.trim())) {
      validationErrors.firstName =
        "El campo 'Nombre' sólo acepta letras y espacios en blanco";
    }

    if (!regexName.test(form.lastName.trim())) {
      validationErrors.lastName =
        "El campo 'Apellido' sólo acepta letras y espacios en blanco";
    }

    if (!regexPhone.test(form.phone.trim())) {
      validationErrors.phone = 'Formato de numero telefonico incorrecto';
    }

    if (!regexEmail.test(form.email.trim())) {
      validationErrors.email = 'Formato de correo incorrecto';
    }

    if (!regexMaxChars255.test(form.street.trim())) {
      validationErrors.street = 'No debe exceder los 255 caracteres';
    }

    if (!regexMaxChars255.test(form.city.trim())) {
      validationErrors.city = 'No debe exceder los 255 caracteres';
    }

    if (!regexMaxChars255.test(form.state.trim())) {
      validationErrors.state = 'No debe exceder los 255 caracteres';
    }
    setErrors(validationErrors);
    if (Object.entries(validationErrors).length === 0) {
      return true;
    } else {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validations()) return;
    const contactToEdit = {
      _id: contactid,
      imgFile: form.imgFile,
      firstName: form.firstName,
      lastName: form.lastName,
      phone: form.phone,
      email: form.email,
      street: form.street,
      city: form.city,
      state: form.state,
    };
    try {
      await axios.post(`${backUrl}/contacts/edit`, contactToEdit);
      alert('Contact edited successfully');
      getContacts();
      navigate(`/contacts/${contactid}`);
    } catch (err) {
      alert('Error editing contact');
    }
  };

  return (
    <div className="container mt-1 text-center">
      <div className="row">
        <div className="col-md-8 offset-md-2 col-lg-6 offset-lg-3">
          <div className="row mb-3 g-0">
            <div className="col d-flex justify-content-center align-items-center">
              <div className="d-flex flex-column align-items-center position-relative">
                {(form.imgFile && (
                  <img
                    className="contact-photo"
                    src={`${form.imgFile || ''}  `}
                    alt=""
                  />
                )) || (
                  <PersonCircle
                    /* onClick={openContactPicModal} */
                    className="contact-photo"
                  />
                )}

                <Camera
                  onClick={openContactPicModal}
                  className="contact-form-camera"
                />
              </div>
            </div>
          </div>

          <Form onSubmit={handleSubmit}>
            <div className="row mb-3 g-0">
              <div className="col-1 d-flex justify-content-center align-items-center">
                <Person />
              </div>
              <div className="col-11 d-flex justify-content-center">
                <Form.Control
                  name="firstName"
                  onChange={handleChange}
                  onBlur={() => validations()}
                  type="text"
                  placeholder="First name"
                  value={form.firstName}
                />
              </div>
            </div>
            {errors.firstName && (
              <div className="row m-0 g-0">
                <div className="offset-1 col-11 d-flex justify-content-center">
                  <Alert variant="danger">{errors.firstName}</Alert>
                </div>
              </div>
            )}

            <div className="row mb-3 g-0">
              <div className="offset-1 col-11 d-flex justify-content-center">
                <Form.Control
                  name="lastName"
                  onChange={handleChange}
                  onBlur={() => validations()}
                  type="text"
                  placeholder="Last name"
                  value={form.lastName}
                />
              </div>
            </div>
            {errors.lastName && (
              <div className="row m-0 g-0">
                <div className="offset-1 col-11 d-flex justify-content-center">
                  <Alert variant="danger">{errors.lastName}</Alert>
                </div>
              </div>
            )}
            <div className="row mb-3 g-0">
              <div className="col-1 d-flex justify-content-center align-items-center">
                <Telephone />
              </div>
              <div className="col-11 d-flex justify-content-center">
                <Form.Control
                  name="phone"
                  onChange={handleChange}
                  onBlur={() => validations()}
                  type="text"
                  placeholder="Phone"
                  value={form.phone}
                />
              </div>
            </div>
            {errors.phone && (
              <div className="row m-0 g-0">
                <div className="offset-1 col-11 d-flex justify-content-center">
                  <Alert variant="danger">{errors.phone}</Alert>
                </div>
              </div>
            )}
            <div className="row mb-3 g-0">
              <div className="col-1 d-flex justify-content-center align-items-center">
                <EnvelopeAt />
              </div>
              <div className="col-11 d-flex justify-content-center">
                <Form.Control
                  name="email"
                  onChange={handleChange}
                  onBlur={() => validations()}
                  type="email"
                  placeholder="Email"
                  value={form.email}
                />
              </div>
            </div>
            {errors.email && (
              <div className="row m-0 g-0">
                <div className="offset-1 col-11 d-flex justify-content-center">
                  <Alert variant="danger">{errors.email}</Alert>
                </div>
              </div>
            )}

            <Accordion className="p-0">
              <Accordion.Item eventKey="0">
                <Accordion.Header></Accordion.Header>
                <Accordion.Body>
                  <div className="row mb-3 g-0">
                    <div className="col-1 d-flex justify-content-center align-items-center">
                      <GeoAlt />
                    </div>
                    <div className="col-11 d-flex justify-content-center">
                      <Form.Control
                        name="street"
                        onChange={handleChange}
                        onBlur={() => validations()}
                        type="text"
                        placeholder="Street"
                        value={form.street}
                      />
                    </div>
                  </div>
                  {errors.street && (
                    <div className="row m-0 g-0">
                      <div className="offset-1 col-11 d-flex justify-content-center">
                        <Alert variant="danger">{errors.street}</Alert>
                      </div>
                    </div>
                  )}
                  <div className="row mb-3 g-0">
                    <div className="offset-1 col-11 d-flex justify-content-center">
                      <Form.Control
                        name="city"
                        onChange={handleChange}
                        onBlur={() => validations()}
                        type="text"
                        placeholder="City"
                        value={form.city}
                      />
                    </div>
                  </div>
                  {errors.city && (
                    <div className="row m-0 g-0">
                      <div className="offset-1 col-11 d-flex justify-content-center">
                        <Alert variant="danger">{errors.city}</Alert>
                      </div>
                    </div>
                  )}
                  <div className="row mb-3 g-0">
                    <div className="offset-1 col-11 d-flex justify-content-center">
                      <Form.Control
                        name="state"
                        onChange={handleChange}
                        onBlur={() => validations()}
                        type="text"
                        placeholder="State"
                        value={form.state}
                      />
                    </div>
                  </div>
                  {errors.state && (
                    <div className="row m-0 g-0">
                      <div className="offset-1 col-11 d-flex justify-content-center">
                        <Alert variant="danger">{errors.state}</Alert>
                      </div>
                    </div>
                  )}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>

            <Button className="my-3" variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </div>
      <ContactPicModal
        isOpen={isOpenContactPicModal}
        close={closeContactPicModal}
        form={form}
        setForm={setForm}
      />
    </div>
  );
};

export default ContactFormEdit;
