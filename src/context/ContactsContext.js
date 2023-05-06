import axios from 'axios';
import React, { createContext, useState } from 'react';
import { backUrl } from '../consts/url';

const ContactsContext = createContext();

const ContactsContextProvider = ({ children }) => {
  const [contacts, setContacts] = useState(null);
  const [loading, setLoading] = useState(true);

  const getContacts = async () => {
    try {
      setLoading(true);
      const contactsRes = await axios.get(`${backUrl}/contacts`);
      setContacts(contactsRes.data);
      setLoading(false);
    } catch (err) {
      if (err.response.status === 401) {
        alert(`Error: ${err.response.data.errorMessage}`);
      } else {
        alert('Error reaching contacts ');
      }
      setLoading(false);
    }
  };

  return (
    <ContactsContext.Provider
      value={{
        contacts,
        setContacts,
        getContacts,
        loading,
      }}
    >
      {children}
    </ContactsContext.Provider>
  );
};

export { ContactsContextProvider };
export default ContactsContext;
