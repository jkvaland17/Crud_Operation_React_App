import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { NavLink } from "react-router-dom";
import axios from "axios";

const TableComponent = () => {
  const [userData, setuserData] = useState([]);

  useEffect(() => {
    async function getAlluserData() {
      try {
        const userData = await axios.get("http://localhost:3004/user");
        setuserData(userData.data);
      } catch (error) {
        console.log("Something wrong");
      }
    }
    getAlluserData();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3004/user/${id}`);
    var newuser = userData.filter((item) => {
      return item.id !== id;
    });
    setuserData(newuser);
  };
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Surname</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {userData && userData.length > 0 ? (
            userData.map((val, index) => {
              return (
                <tr key={index}>
                  <td>{val.id}</td>
                  <td>{val.FirstName}</td>
                  <td>{val.MiddleName}</td>
                  <td>{val.Surname}</td>
                  <td>
                    <NavLink to={`/view/${val.id}`}>
                      <button>show</button>
                    </NavLink>
                    <NavLink to={`/edit/${val.id}`}>
                      <button>Edit</button>
                    </NavLink>
                    <button onClick={() => handleDelete(val.id)}>Del</button>
                  </td>
                </tr>
              );
            })
          ) : (
            <h1>data not</h1>
          )}
        </tbody>
      </Table>
    </>
  );
};

export default TableComponent;