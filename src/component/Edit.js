import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";

import axios from "axios";

const Edit = () => {
  const { id } = useParams();
  let navigate = useNavigate();
  const [user, setUser] = useState({
    FirstName: "",
    MiddleName: "",
    Surname: "",
  });

  useEffect(() => {
    async function getStudent() {
      try {
        const user = await axios.get(`http://localhost:3004/user/${id}`);
        setUser(user.data);
      } catch (error) {
        console.log("Something is Wrong");
      }
    }
    getStudent();
  }, [id]);

  const onTextFieldChange=(e)=> {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  }

  async function onFormSubmit(e) {
    e.preventDefault()
    try {
     await axios.put(`http://localhost:3004/user/${id}`,user)
     navigate("/");
    } catch (error) {
     console.log("Something is Wrong");
    }
   }

  const backbtn = () => {
    navigate("/");
  };
  return (
    <>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="email"
            name="FirstName"
            placeholder="Enter First Name"
            onChange={(e) => onTextFieldChange(e)}
            value={user.FirstName}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Middle Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Middle Name"
            name="MiddleName"
            onChange={(e) => onTextFieldChange(e)}
            value={user.MiddleName}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Surname</Form.Label>
          <Form.Control
            type="test"
            placeholder="Enter Surname"
            name="Surname"
            onChange={(e) => onTextFieldChange(e)}
            value={user.Surname}
          />
        </Form.Group>
        <button onClick={e => onFormSubmit(e)}>Update</button>
        <button onClick={backbtn}>Back</button>
      </Form>
    </>
  );
};

export default Edit;
