import React, { useState, useEffect } from "react";
import config from "../config";
import axios from "axios";
import classes from "../Styles/post.module.css";
import { MoreVert, ThumbUp } from "@material-ui/icons";
import parser from "html-react-parser";

export default function UserPost() {
  const [myPost, setMyPost] = useState([]);
  const [profileImage, setProfileImage] = useState("");

  useEffect(() => {
    getImages();
  }, []);

  const getImages = () => {
    axios
      .get("http://localhost:3003/auth/getImages", config)
      .then((response) => {
        setProfileImage(response.data[0].profileImgId);
      });
  };

  useEffect(() => {
    getAllMyPost();
  }, []);

  const getAllMyPost = () => {
    axios
      .get("http://localhost:3003/auth/getOwnPost", config)
      .then((response) => {
        const allMyPost = response.data;
        allMyPost.sort((a, b) => (a.postDate > b.postDate ? 1 : -1));
        console.log(allMyPost);

        setMyPost(allMyPost);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (myPost) {
    return myPost.map((Post, index) => {
      return (
        <div className={classes.post}>
          <div className={classes.postWrapper}>
            <div className={classes.postTop}>
              <div className={classes.postTopLeft}>
                <img
                  className={classes.postProfileImg}
                  src={`http://localhost:3003/auth/images/${profileImage}`}
                  alt=""
                />
                <span className={classes.postUsername}>{Post.Author}</span>
                <span className={classes.postDate}>{Post.date_time}</span>
              </div>
              <div className={classes.postTopRight}>
                <MoreVert />
              </div>
            </div>
            <div className={classes.postCenter}>
              <span className={classes.postText}>
                <div dangerouslySetInnerHTML={{ __html: Post.postDet }} />
              </span>
              <img
                className={classes.postImg}
                src={`http://localhost:3003/auth/images/${Post.imgID}`}
                alt=""
              />
            </div>
            <div className={classes.postBottom}>
              <div className={classes.postBottomLeft}>
                <ThumbUp className={classes.likeIcon} />
                {/* <Favorite className={classes.likeIcon} /> */}
                <span className={classes.postLikeCounter}>
                  20 people liked it
                </span>
              </div>
              <div className={classes.postBottomRight}>
                <span className={classes.postCommentText}>32 comments</span>
              </div>
            </div>
          </div>
        </div>
      );
    });
  }
}
