import React from "react";
import Layout from "./Layout";
import Home from "./Home";
import SignUp from "./SignUp";
import LogIn from "./LogIn";
import "../Styles/app.module.css";
import { Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/LogIn" element={<LogIn />} />
      </Routes>
    </Layout>
  );
}
