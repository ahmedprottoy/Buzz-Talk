import React, { useState, useEffect, useContext } from "react";
import classes from "../Styles/profile.module.css";
import Feed from "./Feed";
import Rightbar from "./Rightbar";
import Sidebar from "./Sidebar";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import Axios from "axios";
import Share from "./Share";
import UserPost from "./UserPost";

export default function Profile() {
  const [userName, setUserName] = useState("");
  const [fullName, setFullName] = useState("");
  const { user } = useContext(AuthContext);

  Axios.defaults.withCredentials = true;

  useEffect(() => {
    Axios.get("http://localhost:3003/auth/isLoggedIn").then((response) => {
      if (response.data.isloggedin) {
        console.log(response);
        setTimeout(() => {
          setUserName(response.data.user[0].userName);
          setFullName(
            response.data.user[0].firstName +
              " " +
              response.data.user[0].lastName
          );
        }, 1000);
      }
    });
  }, []);

  useEffect(() => {
    setUserName(user?.user);
  }, [user]);

  return (
    <>
      <div className={classes.profile}>
        <Sidebar />
        <div className={classes.profileRight}>
          <div className={classes.profileRightTop}>
            <div className={classes.profileCover}>
              <img
                className={classes.profileCoverImg}
                src="https://www.nestle.com/sites/default/files/styles/da_vinci_header_hero_desktop/public/2022-02/sustainability-nature-forest-river-article-header-fw.jpg?h=a612ed85&itok=1mqqgg1L"
                alt=""
              />
              <img
                className={classes.profileUserImg}
                src="https://res.cloudinary.com/demo/image/facebook/65646572251.jpg"
                alt=""
              />
            </div>
            <div className={classes.profileInfo}>
              <h4 className={classes.profileInfoName}>{fullName}</h4>
              <span className={classes.profileInfoDesc}>{userName}</span>
            </div>
            <div className={classes.profileBio}>
              <span className={classes.profileBioItem}>lorem</span>
              <span className={classes.profileBioItem}>ipsum</span>
              <span className={classes.profileBioItem}>dolor</span>
              <span className={classes.profileBioItem}>amet</span>
            </div>
          </div>
          <div className={classes.profileRightBottom}>
            <Share />
            <UserPost />
          </div>
        </div>
      </div>
    </>
  );
}
