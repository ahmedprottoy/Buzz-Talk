import React, { useState, useEffect } from "react";
import classes from "../Styles/settings.module.css";
import { CameraAlt } from "@material-ui/icons";
import axios from "axios";

export default function UpdateProfileImage() {
  const [profileImage, setProfileImage] = useState("");

  const configure = {
    headers: {
      "Content-Type": "multipart/form-data",
      authorization: localStorage.getItem("accessToken"),
    },
  };

  useEffect(() => {
    getImages();
  }, []);

  const getImages = () => {
    axios
      .get("http://localhost:3003/auth/getImages", configure)
      .then((response) => {
        setProfileImage(response.data[0].profileImgId);
      });
  };

  const [updatedImage, setUpdatedImage] = useState({
    file: [],
  });

  const handleInputChange = (event) => {
    console.log("handleInputChange");
    setUpdatedImage({
      ...updatedImage,
      file: event.target.files[0],
    });
  };

  const updateImages = (e) => {
    e.preventDefault();
    console.log("updateImages");
    const formData = new FormData();

    formData.append("profile", updatedImage.file);

    axios
      .post("http://localhost:3003/auth/profileimg", formData, configure)
      .then((response) => {
        console.log(response);
      });
  };

  return (
    // <form
    //   className={classes.settingsForm}
    //   onSubmit={() => {
    //     updateImages();
    //   }}
    // >
    <div className={classes.settingsPP}>
      <img
        src={`http://localhost:3003/auth/images/${profileImage}`}
        alt=""
        className={classes.settingsProfileImg}
      />
      <div>
        <label htmlFor="fileInput" className={classes.cameraIconProfile}>
          <CameraAlt className={classes.settingsPPIconProfile} />
          <input
            id="file"
            type="file"
            name="file"
            accepts="image/*"
            // style={{ display: "none" }}
            className={classes.settingsPPInput}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <button className={classes.settingsSubmitButton} onClick={updateImages}>
        Update Profile Picture
      </button>
    </div>
    // </form>
  );
}
