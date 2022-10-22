import axios from "axios";
import React, { useState, useEffect } from "react";
import config from "../config";
import classes from "../Styles/post.module.css";
import { ThumbUp } from "@material-ui/icons";

export default function FollowerProfilePost(id) {
  const [followerPost, setFollowerPost] = useState([]);
  const followerID = id;

  useEffect(() => {
    getFollowerPost();
  }, [followerID]);

  const getFollowerPost = () => {
    axios
      .get(`http://localhost:3003/auth//post/user/${followerID.id}`, config)
      .then((response) => {
        setFollowerPost(response.data);
      });
  };

  if (followerPost) {
    return followerPost.map((Post, index) => {
      return (
        <div className={classes.post}>
          <div className={classes.postWrapper}>
            <div className={classes.postTop}>
              <div className={classes.postTopLeft}>
                {/* <img
                  className={classes.postProfileImg}
                  src={`http://localhost:3003/auth/images/${profileImage}`}
                  alt=""
                /> */}
                <div>
                  <div className={classes.postUsername}>
                    <b>{Post.Author}</b>
                  </div>

                  <div className={classes.postDate}>
                    Posted On {Post.date_time.slice(0, 10)} at{" "}
                    {Post.date_time.slice(11, 16)}
                  </div>
                </div>
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
