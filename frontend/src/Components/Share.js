import React, { useState, useEffect } from "react";
import classes from "../Styles/share.module.css";
import { PermMedia, Label, Room, EmojiEmotions } from "@material-ui/icons";
import axios from "axios";

// import config from "../config";

export default function Share() {
  const [postDet, setPostDet] = useState("");
  const [image, setImage] = useState({
    file: [],
  });
  const [profileImage, setProfileImage] = useState("");

  useEffect(() => {
    getImages();
  }, []);

  const configure = {
    headers: {
      "Content-Type": "multipart/form-data",
      authorization: localStorage.getItem("accessToken"),
    },
  };

  const getImages = () => {
    axios
      .get("http://localhost:3003/auth/getImages", configure)
      .then((response) => {
        setProfileImage(response.data[0].profileImgId);
      });
  };
  function handleChange(event) {
    event.preventDefault();
    setPostDet(event.target.value);
  }
  const handleInputChange = (event) => {
    setImage({
      ...image,
      file: event.target.files[0],
    });
  };

  const CreatePost = () => {
    const formData = new FormData();
    formData.append("image", image.file);
    formData.append("postDet", postDet);
    console.log(formData);
    axios
      .post("http://localhost:3003/auth/createPost", formData, configure)
      .then((response) => {
        console.log(response);
      });
  };

  return (
    <div className={classes.share}>
      <div className={classes.shareTop}>
        <img
          className={classes.shareProfileImg}
          src={`http://localhost:3003/auth/images/${profileImage}`}
          alt=""
        />
        <textarea
          type="text"
          placeholder="What's in your mind?"
          className={classes.shareInput}
          autoComplete="off"
          name="postDet"
          onChange={handleChange}
        />
      </div>
      <hr className={classes.shareHr} />
      <div className={classes.shareBottom}>
        <div className={classes.shareOptions}>
          <div className={classes.shareOption}>
            <PermMedia className={classes.shareIcon} />
            <label htmlFor="file">Photos</label>
            <input
              type="file"
              id="file"
              name="file"
              accepts="image/*"
              onChange={handleInputChange}
            />
          </div>
          <div className={classes.shareOption}>
            <Label className={classes.shareIcon} />
            <span className={classes.shareOptionText}>Tag</span>
          </div>
          <div className={classes.shareOption}>
            <Room className={classes.shareIcon} />
            <span className={classes.shareOptionText}>Location</span>
          </div>
          <div className={classes.shareOption}>
            <EmojiEmotions className={classes.shareIcon} />
            <span className={classes.shareOptionText}>Feeling</span>
          </div>
        </div>
        <button className={classes.shareButton} onClick={CreatePost}>
          Post
        </button>
      </div>
    </div>
  );
}
