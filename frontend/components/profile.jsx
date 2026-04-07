import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { OrbitProgress } from "react-loading-indicators";
import Swal from "sweetalert2";

const Profile = ({ setData }) => {
  const [File, setFile] = useState(null);
  const [JobDescription, setJobdescription] = useState("");
  const [isLoading, setIsloading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const getProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get("http://127.0.0.1:5000/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setData(response.data);
      } catch (error) {
        console.log(error);
        Swal.fire({
          title: "You have Been LoggedOut",
          icon: "error",
          draggable: true,
        });
        navigate("/login");
      }
    };

    getProfile();
  }, []);
  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    const data = new FormData();
    data.append("job_description", JobDescription);
    data.append("file", File);
    setIsloading(false);
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/upload_resume",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );
      navigate(`/profile/upload_resume`, { state: response.data });
      setFile(null);
      setJobdescription("");
      Swal.fire({
        title: "Resume Analyzed successfully",
        icon: "success",
        draggable: true,
      });
      setIsloading(true);
    } catch (error) {
      setFile(null);
      setJobdescription("");
      alert("Cannot Fetch Data");
    }
  };
  if (isLoading) {
    return (
      <div className="profile">
        <div className="inputbox">
          <textarea
            placeholder="Enter Job Description"
            rows={20}
            cols={100}
            style={{
              borderRadius: "10px",
              marginRight: "70px",
              border: "None",
              outline: "None",
            }}
            onChange={(e) => setJobdescription(e.target.value)}
            value={JobDescription}
          />

          <br />
          <br />

          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <div className="button">
          <Button color="red" style={{ width: "100px" }} onClick={handleSubmit}>
            Get
          </Button>
        </div>
      </div>
    );
  } else {
    return (
      <div style={{ paddingTop: "50px" }}>
        <OrbitProgress color={["#32cd32", "#327fcd", "#cd32cd", "#cd8032"]} />
      </div>
    );
  }
};

export default Profile;
