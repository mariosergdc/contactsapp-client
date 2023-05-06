import React from 'react';
import ContactItem from './ContactItem';

const ContactsList = ({ contacts }) => {
  if (contacts?.length === 0) {
    return (
      <div className="d-flex justify-content-center">
        <h1>Aún no tienes contactos</h1>
      </div>
    );
  }
  contacts.sort((x, y) => x.firstName.localeCompare(y.firstName));

  return (
    <div className="row ">
      <div className="col-10 offset-1 col-md-8 offset-md-2">
        <div className="row ">
          {contacts.map((c, index) => {
            return <ContactItem key={index} c={c} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default ContactsList;
