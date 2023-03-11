import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const View = () => {
  const [user, setuser] = useState([]);
  const { id } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    async function getStudent() {
      try {
        const student = await axios.get(`http://localhost:3004/user/${id}`);
        setuser(student.data);
      } catch (error) {
        console.log("Something is Wrong");
      }
    }
    getStudent();
  }, [id]);

  const backbtn = () => {
    navigate("/");
  };
  return (
    <>
      <h1>firstname:{user.FirstName}</h1>
      <p>lastname: {user.MiddleName}</p>
      <p>surname: {user.Surname}</p>
      <button onClick={backbtn}>Back</button>
    </>
  );
};

export default View;
