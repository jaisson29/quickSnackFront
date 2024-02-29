import { Children, useEffect, useState } from 'react';
import Button from '../boton/Button';
import  Modal  from "react-bootstrap/modal";


function Modales(props) {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  console.log(props.children)
    return (
      <>
        <Button onClick={handleShow}>
        <i className='fa-solid fa-list-check'></i>
        </Button>
  
        <Modal show={show} onHide={handleClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>{props.titu}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{props.children}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cerrar
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Guardar
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  
  export default Modales;