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
import Chat from "./Chat";
import "../Styles/app.module.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import ForgotPassword from "./ForgotPassword";
import CheckCode from "./CheckCode";
import ResetPassword from "./ResetPassword";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/LogIn" element={<LogIn />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/ChechkCode" element={<CheckCode />} />
        <Route path="/resetpassword" element={<ResetPassword />} />

        <Route path="/*" element={<Layout />}>
          <Route path="home" element={<Home />} />
          <Route path="Profile" element={<Profile />} />
          <Route path="Settings" element={<Settings />} />
          <Route path="FollowerProfile" element={<FollowerProfile />} />
          <Route path="EditPost" element={<EditPost />} />
          <Route path="Modals" element={<Modal />} />
          <Route path="SearchResult" element={<SearchResult />} />
          <Route path="Chat" element={<Chat />} />
        </Route>
      </Routes>
    </>
  );
}
