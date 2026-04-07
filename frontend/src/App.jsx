import React, { useState } from "react";
import { Home } from "../components/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Component from "../components/NavBAr";
import Login from "../components/Login";
import Profile from "../components/profile";
import Analyzer from "../components/Analyzer";
import Home2 from "../components/Home2";
import Signin from "../components/Register";

const App = () => {
  const [data,setData]=useState()
  return (
    <div className="App">
      <Router>
        <Component data={data} setData={setData}></Component>
        <Home />
        <Routes>
          <Route path="/" element={<Home2 />} />
          <Route path="/signin" element={<Signin></Signin>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile setData={setData}/>} />
          <Route path="/profile/upload_resume" element={<Analyzer />}></Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
