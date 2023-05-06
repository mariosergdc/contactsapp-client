import React, { useContext, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import ContactsList from './ContactsList';
import ContactsContext from '../../context/ContactsContext';

const Contacts = () => {
  const { loading, contacts, getContacts } = useContext(ContactsContext);
  useEffect(() => {
    if (contacts === null) {
      getContacts();
    }
  }, []);

  return (
    <>
      {loading && (
        <div className="center-box">
          <Spinner animation="border" />
        </div>
      )}
      {!loading && <ContactsList contacts={contacts} />}
    </>
  );
};

export default Contacts;
