import axios from "axios";
import Sidebar from "./Sidebar";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import config from "../config";
import classes from "../Styles/editPost.module.css";
import { EditorContent, useEditor } from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";
import { PermMedia } from "@material-ui/icons";

function EditPost() {
  const location = useLocation();
  const navigate = useNavigate();
  const postID = location.state.id;
  const prevPost = location.state.postDet;

  // console.log(postID);
  // console.log(prevPost);

  const [post, setPost] = useState();
  const [profileImage, setProfileImage] = useState("");

  const [updatedPost, setUpdatedPost] = useState("");
  const [updatedImage, setUpdatedImage] = useState({
    file: [],
  });

  const editor = useEditor({
    extensions: [StarterKit],
    content: `${prevPost}`,

    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      // console.log(html);
      setUpdatedPost(html);
    },
  });

  useEffect(() => {
    getPost();
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
      .get("http://localhost:3003/auth/getImages", config())
      .then((response) => {
        setProfileImage(response.data[0].profileImgId);
      });
  };

  const getPost = () => {
    axios
      .get(`http://localhost:3003/auth/post/${postID}`, config())
      .then((response) => {
        setPost(response.data[0]);
        // console.log(response.data[0]);
      });
  };

  const handleInputChange = (event) => {
    console.log("object");
    setUpdatedImage({
      ...updatedImage,
      file: event.target.files[0],
    });
  };

  const updatePost = () => {
    const formData = new FormData();
    formData.append("post", updatedImage.file);
    formData.append("postDet", updatedPost);
    console.log(formData);
    axios
      .put(`http://localhost:3003/auth/post/${postID}`, formData, configure)
      .then((response) => {
        console.log(response);
      });

    setTimeout(() => {
      navigate("/Profile");
    }, 1500);
  };

  if (post) {
    return (
      <div className={classes.Content}>
        <div>
          <Sidebar />
        </div>
        <div className={classes.post}>
          <div className={classes.postWrapper}>
            <div className={classes.postTop}>
              <div className={classes.postTopLeft}>
                <img
                  className={classes.postProfileImg}
                  src={`http://localhost:3003/auth/images/${profileImage}`}
                  alt=""
                />
                <div>
                  <div className={classes.postUsername}>
                    <b>{post.Author}</b>
                  </div>

                  <div className={classes.postDate}>
                    Posted On {post.date_time.slice(0, 10)} at{" "}
                    {post.date_time.slice(11, 16)}
                  </div>
                </div>
              </div>
            </div>
            <div className={classes.postCenter}>
              <div className={classes.textEditor}>
                <EditorContent editor={editor} />
              </div>

              <img
                className={classes.postImg}
                src={`http://localhost:3003/auth/images/${post.imgID}`}
                alt=""
              />
            </div>
            <hr className={classes.shareHr} />
            <div className={classes.shareBottom}>
              <div className={classes.shareOptions}>
                <div className={classes.shareOption}>
                  <PermMedia className={classes.shareIcon} />
                  <label htmlFor="files">Photos</label>
                  <input
                    type="file"
                    id="files"
                    name="file"
                    accepts="image/*"
                    style={{ display: "none" }}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <button className={classes.shareButton} onClick={updatePost}>
              Update Post
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default EditPost;
