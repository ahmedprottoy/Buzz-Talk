import React, { useState, useEffect } from "react";
import config from "../config";
import axios from "axios";
import classes from "../Styles/post.module.css";
import { MoreVert, ThumbUp, Favorite } from "@material-ui/icons";

export default function UserPost() {
  const [myPost, setMyPost] = useState([]);

  useEffect(() => {
    getAllMyPost();
  }, []);

  const getAllMyPost = () => {
    axios
      .get("http://localhost:3003/auth/getOwnPost", config)
      .then((response) => {
        const allMyPost = response.data;
        setMyPost(allMyPost);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (myPost) {
    return myPost.map((myPost, index) => {
      return (
        <div className={classes.post}>
          <div className={classes.postWrapper}>
            <div className={classes.postTop}>
              <div className={classes.postTopLeft}>
                <img
                  className={classes.postProfileImg}
                  src="https://res.cloudinary.com/demo/image/facebook/65646572251.jpg"
                  alt=""
                />
                <span className={classes.postUsername}>{myPost.Author}</span>
                <span className={classes.postDate}>{myPost.date_time}</span>
              </div>
              <div className={classes.postTopRight}>
                <MoreVert />
              </div>
            </div>
            <div className={classes.postCenter}>
              <span className={classes.postText}>{myPost.postDet}</span>
              <img
                className={classes.postImg}
                src={`http://localhost:3003/auth/images/${myPost.imgID}`}
                alt=""
              />
            </div>
            <div className={classes.postBottom}>
              <div className={classes.postBottomLeft}>
                <ThumbUp className={classes.likeIcon} />
                <Favorite className={classes.likeIcon} />
                <span className={classes.postLikeCounter}>
                  69 people liked it
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
