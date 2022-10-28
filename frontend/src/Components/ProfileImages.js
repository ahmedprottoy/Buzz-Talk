import React, { useState, useEffect } from "react";
import classes from "../Styles/profile.module.css";
import axios from "axios";
import config from "../config";

export default function ProfileImages() {
  const [profileImage, setProfileImage] = useState("");
  const [coverImage, setCoverImage] = useState("");

  useEffect(() => {
    getImages();
  }, []);

  const getImages = () => {
    axios
      .get("http://localhost:3003/auth/getImages", config)
      .then((response) => {
        if (response.data[0].profileImgId !== "null") {
          setProfileImage(response.data[0].profileImgId);
        } else {
          setProfileImage("avatar.png");
        }
        if (response.data[0].coverImgId !== "null") {
          setCoverImage(response.data[0].coverImgId);
        } else {
          setCoverImage("cover.jpg");
        }
      });
  };
  return (
    <div className={classes.profileCover}>
      <img
        className={classes.profileCoverImg}
        src={`http://localhost:3003/auth/images/${coverImage}`}
        alt=""
      />
      <img
        className={classes.profileUserImg}
        src={`http://localhost:3003/auth/images/${profileImage}`}
        alt=""
      />
    </div>
  );
}
