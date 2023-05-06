import { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
//import { toast } from 'react-toastify'
//import useAuth from '../../../auth/useAuth';

export default function ContactPicModal({ isOpen, close, form, setForm }) {
  const [fileName, setFileName] = useState('Subir una imagen');
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const [file] = e.target.files;
    const SIZE_50MB = 50 * 1024 * 1024;
    const isValidSize = file.size < SIZE_50MB;
    // const isValidSize = file.size < 200 * 1024
    const isNameOfOneImageRegEx = /.(jpe?g|gif|png)$/i;
    const isValidType = isNameOfOneImageRegEx.test(file.name);

    if (!isValidSize) {
      alert('Imagen muy pesada, máximo 50MB');
      setSelectedFile(null);
      setFileName('');
      return;
    }
    if (!isValidType) {
      alert('Sólo puedes subir imágenes');
      setSelectedFile(null);
      setFileName('');
      return;
    }

    setFileName(file.name);

    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedFile(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleUpdateProfilePic = () => {
    if (!selectedFile) return alert('Debes seleccionar imagen');
    setForm({ ...form, imgFile: selectedFile });
    close();
  };

  return (
    <div>
      <Modal show={isOpen} onHide={close}>
        <Modal.Header closeButton>
          <Modal.Title>Elegir foto del contacto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formFile" className="mb-3">
            {/* <Form.Label>Default file input example</Form.Label> */}
            <Form.Control
              type="file"
              label={fileName}
              data-browse="Subir"
              onChange={handleFileChange}
              accept=".jpg, .jpeg, .gif, .png"
            />
          </Form.Group>
          {selectedFile && (
            <img
              className="img-fluid mt-2"
              src={selectedFile}
              alt="profile-previw"
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={close}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleUpdateProfilePic}>
            Actualizar imagen
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
