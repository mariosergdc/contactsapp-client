import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { Pencil, PersonCircle, Trash } from 'react-bootstrap-icons';
import { useNavigate, useParams } from 'react-router-dom';
import ContactsContext from '../../context/ContactsContext';
import { backUrl } from '../../consts/url';

const ContactPage = () => {
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(false);
  const { contactid } = useParams();
  const { getContacts } = useContext(ContactsContext);

  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/contact/edit/${contactid}`);
  };

  const deleteContact = (contactid) => {
    let ok = window.confirm('Do you want to delete the contact');
    if (ok) {
      axios
        .post(`${backUrl}/contacts/delete`, {
          contactid,
        })
        .then((res) => {
          alert('Contact deleted successfully');
          getContacts();
          navigate('/contacts');
        })
        .catch((err) => {
          alert('Delete Failed');
        });
    }
  };

  useEffect(() => {
    setLoading(true);
    axios
      .post(`${backUrl}/contacts/getcontactbyid`, {
        contactid,
      })
      .then((res) => {
        if (res.data === null) {
          alert('The contact does not exist');
          setLoading(false);
          return;
        }
        const contactInfo = {
          imgFile: res.data.imgFile,
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          phone: res.data.phone,
          email: res.data.email,
          street: res.data.street,
          city: res.data.city,
          state: res.data.state,
        };
        setContact(contactInfo);
        setLoading(false);
      })
      .catch((err) => {
        alert('Failed to reach contact');
        setLoading(false);
      });
  }, [contactid]);

  return (
    <>
      {contact && (
        <div className="container text-center">
          <div className="row mb-2">
            <div className="col">
              <div>
                {(contact.imgFile && (
                  <img
                    className="contact-photo"
                    src={`${contact.imgFile || ''}  `}
                    alt=""
                  />
                )) || <PersonCircle className="contact-photo" />}
              </div>
            </div>
          </div>
          {contact.firstName && (
            <p className="fs-1">{`${contact.firstName}`}</p>
          )}
          {contact.lastName && <p className="fs-1">{contact.lastName}</p>}
          {contact.phone && <p className="fs-2">{contact.phone}</p>}
          {contact.email && <p className="fs-2">{contact.email}</p>}
          {contact.street && <p className="fs-2">{contact.street}</p>}
          {contact.city && <p className="fs-2">{contact.city}</p>}
          {contact.state && <p className="fs-2">{contact.state}</p>}

          <Button className="m-2" onClick={handleEdit}>
            <div className="d-flex align-items-center">
              <div className="d-none me-2 contact-view-btn d-sm-flex align-items-center">
                Edit
              </div>
              <Pencil />
            </div>
          </Button>
          <Button
            className="btn btn-danger"
            onClick={() => {
              deleteContact(contactid);
            }}
          >
            <div className="d-flex align-items-center">
              <div className="d-none me-2 contact-view-btn d-sm-flex align-items-center ">
                Delete
              </div>
              <Trash />
            </div>
          </Button>
        </div>
      )}
      {loading && (
        <div className="center-box">
          <Spinner animation="border" />
        </div>
      )}
    </>
  );
};

export default ContactPage;
