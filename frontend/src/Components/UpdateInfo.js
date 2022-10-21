import React, { useState, useEffect } from "react";
import classes from "../Styles/settings.module.css";
// import Sidebar from "./Sidebar";
// import { CameraAlt } from "@material-ui/icons";
import TextInput from "./TextInput";
import axios from "axios";
import config from "../config";

export default function UpdateInfo() {
  const [userInfo, setUserInfo] = useState([]);

  const [updatedInfo, setUpdatedInfo] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    location: "",
    religion: "",
    profession: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const handleChange = (e) => {
    setUpdatedInfo((prevData) => {
      return {
        ...prevData,
        [e.target.name]: e.target.value,
      };
    });
  };

  const getData = () => {
    axios
      .get("http://localhost:3003/auth/user/profile", config)
      .then((response) => {
        setUserInfo(response.data);
      });
  };

  const updateProfile = (e) => {
    e.preventDefault();

    if (updatedInfo.password !== updatedInfo.confirmPassword) {
      setError("Password Didn't match...");
    } else {
      axios
        .put("http://localhost:3003/auth/profileUpdate", updatedInfo, config)
        .then((response) => {
          setStatus(response.data.msg);
        });
    }
  };

  if (userInfo) {
    return userInfo.map((user) => {
      return (
        <>
          {/* <Sidebar/> */}
          <div className={classes.settings}>
            <div className={classes.settingsWrapper}>
              <div className={classes.settingsTitle}>
                <span className={classes.settingsTitleUpdate}>
                  Update Your Account
                </span>
              </div>

              <div classname={classes.infoForm}>
              <form className={classes.settingsForm} onSubmit={updateProfile}>
                <label>Username</label>
                <TextInput
                  type="text"
                  defaultValue={user.userName}
                  name="userName"
                  onChange={handleChange}
                />

                <label>First Name</label>
                <TextInput
                  type="text"
                  defaultValue={user.firstName}
                  name="firstName"
                  onChange={handleChange}
                />

                <label>Last Name</label>
                <TextInput
                  type="text"
                  defaultValue={user.lastName}
                  name="lastName"
                  onChange={handleChange}
                />

                <label>Email</label>
                <TextInput
                  type="email"
                  defaultValue={user.email}
                  name="email"
                  onChange={handleChange}
                />

                <label>Location</label>
                <TextInput
                  type="text"
                  defaultValue={user.location}
                  name="location"
                  onChange={handleChange}
                />

                <label>Profession</label>
                <TextInput
                  type="text"
                  defaultValue={user.profession}
                  name="profession"
                  onChange={handleChange}
                />
                <label>Religion</label>
                <TextInput
                  type="text"
                  defaultValue={user.religion}
                  name="religion"
                  onChange={handleChange}
                />

                <label>Password</label>
                <TextInput
                  type="password"
                  placeholder="New Password...."
                  name="password"
                  onChange={handleChange}
                />
                <TextInput
                  type="password"
                  placeholder="Confirm New Password...."
                  name="confirmPassword"
                  onChange={handleChange}
                />
                <button className={classes.settingsSubmitButton} type="submit">
                  Update Profile
                </button>
              </form>

              </div>

              {error && <p className={classes.error}>{error}</p>}
              {status && <p className={classes.error}>{status}</p>}
            </div>
            {/* <Sidebar /> */}
          </div>
        </>
      );
    });
  }
}
