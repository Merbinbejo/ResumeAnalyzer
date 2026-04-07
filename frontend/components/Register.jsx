import { TextField } from "@mui/material";
import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const navigate=useNavigate()

  const HandleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const HandleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/auth/register",
        formData,
      );
      console.log(response.data)
      alert("Sign In Successful");
      setFormData({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
      });
      navigate("/login")
    } catch (error) {
      alert(error.response.data.detail);
      setFormData({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
      });
    }
  };
  return (
    <div style={{ paddingTop: "40px" }}>
      <Container
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "70vh",
          backgroundColor: "white",
          height: "50vh",
          padding: "50px",
          borderRadius: "10px",
          color: "black",
          gap: "20px",
        }}
      >
        <h1>Sign In Account</h1>
        <div className="registerInput">
          <TextField
            variant="outlined"
            id="outlined-basic"
            type="text"
            label="FirstName"
            name="firstname"
            onChange={HandleChange}
            value={formData.firstname}
          ></TextField>
          <TextField
            variant="outlined"
            id="outlined-basic"
            type="text"
            label="LastName"
            name="lastname"
            onChange={HandleChange}
            value={formData.lastname}
          ></TextField>
        </div>
        <div className="registerInput2">
          <TextField
            variant="outlined"
            id="outlined-basic"
            type="text"
            label="email"
            name="email"
            onChange={HandleChange}
            value={formData.email}
          ></TextField>
          <TextField
            variant="outlined"
            id="outlined-basic"
            type="password"
            label="Password"
            name="password"
            onChange={HandleChange}
            value={formData.password}
          ></TextField>
        </div>
        <Button onClick={HandleSubmit}>Sign In</Button>
      </Container>
    </div>
  );
};

export default Signin;
