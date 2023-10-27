import { Children, useEffect, useState } from 'react';
import Button from '../boton/Button';
import  Modal  from "react-bootstrap/modal";


function Modales(props) {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <Button onClick={handleShow}>
        <i className='fa-solid fa-list-check'></i>
        </Button>
  
        <Modal show={show} onHide={handleClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>{props.titu}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  
  export default Modales;