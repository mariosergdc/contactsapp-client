import React from 'react';
import { PersonCircle, Telephone } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';

const ContactItem = ({ c }) => {
  const navigate = useNavigate();
  return (
    <div className="contact-item container p-2 my-2">
      <div
        onClick={() => {
          navigate(`${c._id}`);
        }}
      >
        <div className="row ">
          <div className="col-3 d-flex align-items-center justify-content-center">
            {(c.imgFile && (
              <img
                className="contact-item-photo"
                src={`${c.imgFile || ''}  `}
                alt=""
              />
            )) || (
              <PersonCircle
                /* onClick={openContactPicModal} */
                className="contact-item-photo"
              />
            )}
          </div>

          <div className="col-7 d-flex contact-item-text align-items-center fs-2">
            {c.firstName + ' ' + c.lastName}
          </div>
          <div className="col-2 d-flex align-items-center fs-4 justify-content-center">
            {c.phone ? <Telephone /> : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactItem;
