import React, { useState, useEffect } from "react";
import classes from "../Styles/settings.module.css";
import axios from "axios";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import CloudDoneOutlinedIcon from "@mui/icons-material/CloudDoneOutlined";

export default function UpdateProfileImage() {
  const [coverImage, setCoverImage] = useState("");
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
        setCoverImage(response.data[0].coverImgId);
      });
  };

  const [updatedImage, setUpdatedImage] = useState({
    file: [],
  });

  const handleInputChange = (event) => {
    setUpdatedImage({
      ...updatedImage,
      file: event.target.files[0],
    });
  };

  const updateImages = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("cover", updatedImage.file);
    console.log(formData);
    axios
      .put("http://localhost:3003/auth/coverImg", formData, configure)
      .then((response) => {
        // console.log(response);
        setCount(response.data.message);
      });
  };

  return (
    <>
      <div className={classes.settingsPP}>
        <img
          src={`http://localhost:3003/auth/images/${coverImage}`}
          alt=""
          className={classes.settingsCoverImg}
        />

        <div className={classes.cameraIconCover}>
          <label htmlFor="file1">
            <AddAPhotoOutlinedIcon sx={{ fontSize: 30, cursor: "pointer" }} />
          </label>

          <input
            id="file1"
            type="file"
            name="file"
            accepts="image/*"
            style={{ display: "none" }}
            onChange={handleInputChange}
          />
        </div>

        <button
          className={classes.settingsSubmitButtonCover}
          onClick={updateImages}
        >
          <CloudDoneOutlinedIcon sx={{ fontSize: 30 }} />
        </button>
      </div>
    </>
  );
}
