import React, { useState, useEffect } from "react";
import classes from "../Styles/settings.module.css";
import axios from "axios";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import CloudDoneOutlinedIcon from "@mui/icons-material/CloudDoneOutlined";

export default function UpdateProfileImage() {
  const [profileImage, setProfileImage] = useState("");
  const [count, setCount] = useState();

  const configure = {
    headers: {
      "Content-Type": "multipart/form-data",
      authorization: localStorage.getItem("accessToken"),
    },
  };

  useEffect(() => {
    getImages();
  }, [count]);

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
    console.log("handle");
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
        // console.log(response);
        setCount(response.data.message);
      });
  };

  return (
    <div className={classes.settingsPP}>
      <img
        src={`http://localhost:3003/auth/images/${profileImage}`}
        alt=""
        className={classes.settingsProfileImg}
      />
      <div className={classes.cameraIconProfile}>
        <label htmlFor="file">
          <AddAPhotoOutlinedIcon sx={{ fontSize: 30, cursor: "pointer" }} />
        </label>
        <input
          id="file"
          type="file"
          name="file"
          accepts="image/*"
          multiple
          style={{ display: "none" }}
          onChange={handleInputChange}
        />
      </div>
      <button className={classes.settingsSubmitButton} onClick={updateImages}>
        <CloudDoneOutlinedIcon sx={{ fontSize: 30 }} />
      </button>
    </div>
  );
}
