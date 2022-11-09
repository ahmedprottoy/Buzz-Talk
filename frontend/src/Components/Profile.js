import React, { useState, useEffect } from "react";
import classes from "../Styles/profile.module.css";
import UserAbout from "./UserAbout";
import Sidebar from "./Sidebar";
import config from "../config";
import Axios from "axios";
import Share from "./Share";
import UserPost from "./UserPost";
import ProfileImages from "./ProfileImages";

export default function Profile() {
  const [info, setInfo] = useState([]);
  Axios.defaults.withCredentials = true;

  useEffect(() => {
    Axios.get("http://localhost:3003/auth//user/profile", config()).then(
      (response) => {
        setInfo(response.data[0]);
      }
    );
  }, []);

  return (
    <div className={classes.profile}>
      <div className={classes.side}>
        <Sidebar />
      </div>
      <div className={classes.profileRight}>
        <div className={classes.profileRightTop}>
          <ProfileImages />
          <div className={classes.profileInfo}>
            <h4 className={classes.profileInfoName}>
              {info.firstName} {info.lastName}
            </h4>
            <span className={classes.profileInfoDesc}>{info.userName}</span>
          </div>
        </div>
        <div className={classes.profileRightBottom}>
          <div className={classes.content}>
            <Share />
            <UserPost />
          </div>

          <UserAbout className={classes.aboutWrapper} />
        </div>
      </div>
    </div>
  );
}
