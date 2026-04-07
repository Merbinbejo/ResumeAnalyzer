import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import TextField from "@mui/material/TextField";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const Login = ({ setData }) => {
  const [formData, setFormdata] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const HandleChange = (e) => {
    setFormdata({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const HandleSubmit = async () => {
    try {
      const data = new URLSearchParams();
      data.append("username", formData.username);
      data.append("password", formData.password);
      data.append("grand_type", "password");
      const response = await axios.post(
        "http://127.0.0.1:5000/auth/token",
        data,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      );
      localStorage.setItem("token", response.data.access_token);

      Swal.fire({
        title: "Log In SuccessFul",
        icon: "success",
        draggable: true,
      });
      setFormdata({
        username: "",
        password: "",
      });
      navigate(`/profile`);
    } catch (error) {
      if (error.response && error.response.data) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.detail || "Invalid Username And Password",
        });
      } else {
        Swal.fire({
          title: "Server Error",
          text: "Try again later",
          icon: "question",
        });
      }

      setFormdata({
        username: "",
        password: "",
      });
    }
  };
  return (
    <div className="login">
      <h1
        style={{
          display: "flex",
          fontSize: "20px",
          backgroundColor: "darkblue",
          width: "70%",
          height: "50px",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "10px",
          marginTop: "70px",
          fontFamily: "'Times New Roman', Times, serif",
        }}
      >
        Enter Username And Password
      </h1>
      <div className="inputfield">
        <TextField
          style={{ backgroundColor: "white", borderRadius: "10px" }}
          name="username"
          label="Username"
          variant="outlined"
          type="text"
          value={formData.username}
          onChange={HandleChange}
        />
        <TextField
          style={{ backgroundColor: "white", borderRadius: "10px" }}
          name="password"
          type="password"
          id="outlined-basic"
          label="Password"
          variant="outlined"
          value={formData.password}
          onChange={HandleChange}
        />
      </div>
      <Button style={{ backgroundColor: "Black" }} onClick={HandleSubmit}>
        Login
      </Button>
    </div>
  );
};

export default Login;
