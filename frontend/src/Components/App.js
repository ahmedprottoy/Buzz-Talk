import React from "react";
import Layout from "./Layout";
import Home from "./Home";
import Profile from "./Profile";
import SignUp from "./SignUp";
import LogIn from "./LogIn";
import Settings from "./Settings";
import FollowerProfile from "./FollowerProfile";
import EditPost from "./EditPost";
import Modal from "./modal";
import SearchResult from "./SearchResult";
// import Profile from "./Profile";

import "../Styles/app.module.css";
import { Routes, Route } from "react-router-dom";


export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/LogIn" element={<LogIn />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Settings" element={<Settings />} />
        <Route path="/FollowerProfile" element={<FollowerProfile />} />
        <Route path="/EditPost" element={<EditPost />} />
        <Route path="/Modals" element={<Modal />} />
        <Route path="/SearchResult" element={<SearchResult />} />
        <Route path="/Chat" element={<Chat />} />
      </Routes>
    </Layout>
  );
}
