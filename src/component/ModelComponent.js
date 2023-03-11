import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Home from "./Home"
import axios from "axios";

const ModelComponent = () => {
  
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [addData, setAddData] = useState({
    FirstName: "",
    MiddleName: "",
    Surname: "",
  });
  const [status, setStatus] = useState();

  const onTextChange = (e) => {
    setAddData({
      ...addData,
      [e.target.name]: e.target.value,
    });
  };

  async function onSubmit(e) {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:3004/user`, addData);
      setStatus(true);
    } catch (error) {
      console.log("Something is Wrong");
    }
    if(status){
      <Home/>
    }
  }
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Data
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="email"
                name="FirstName"
                placeholder="Enter First Name"
                onChange={(e) => onTextChange(e)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Middle Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Middle Name"
                name="MiddleName"
                onChange={(e) => onTextChange(e)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Surname</Form.Label>
              <Form.Control
                type="test"
                placeholder="Enter Surname"
                name="Surname"
                onChange={(e) => onTextChange(e)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={(e) => onSubmit(e)}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModelComponent;
