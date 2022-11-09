import axios from "axios";
import React, { useState, useEffect } from "react";
import config from "../config";
import classes from "../Styles/post.module.css";
import { ThumbUp } from "@material-ui/icons";
import Comments from "./Comments";

export default function FollowerProfilePost(id) {
  const [followerPost, setFollowerPost] = useState([]);
  const followerID = id;
  const [commentOpen, setCommentOpen] = useState([]);
  const [cnt, setCnt] = useState(0);

  const handleCommentOpen = (evnt, index) => {
    const commentStatus = commentOpen;
    commentStatus[index] = !commentStatus[index];

    setCommentOpen(commentStatus);
  }

  useEffect(() => {
    getFollowerPost();
  }, [followerID]);

  const getFollowerPost = () => {
    axios
      .get(`http://localhost:3003/auth/post/user/${followerID.id}`, config())
      .then((response) => {
        setFollowerPost(response.data);
        console.log(response.data);
      });
  };
  console.log(followerPost);
  if (!followerPost.message) {
    return followerPost.map((Post, index) => {
      if (Post.profileImgId === "null") {
        Post.profileImgId = "avatar.png";
      }
      return (
        <div className={classes.post}>
          <div className={classes.postWrapper}>
            <div className={classes.postTop}>
              <div className={classes.postTopLeft}>
                <img
                  className={classes.postProfileImg}
                  src={`http://localhost:3003/auth/images/${Post.profileImgId}`}
                  alt=""
                />
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
                {Post.likenumber === null ? (
                  <span className={classes.postLikeCounter}></span>
                ) : (
                  <span className={classes.postLikeCounter}>
                    {Post.likenumber} people likes it
                  </span>
                )}
              </div>
              <div className={classes.postBottomRight}>
              {Post.commentNumber === null ? (
                  <span
                    className={classes.postCommentText}
                    onClick={(evnt) => {
                      handleCommentOpen(evnt, index);
                      setCnt(cnt + 1);
                    }}
                  >
                    no comments yet
                  </span>
                ) : (
                  <span
                    className={classes.postCommentText}
                    onClick={(evnt) => {
                      handleCommentOpen(evnt, index);
                      setCnt(cnt + 1);
                    }}
                  >
                    {Post.commentNumber} comments
                  </span>
                )}
              </div>
            </div>
            {commentOpen[index]&& (
                <Comments postId={followerPost[index].postID}/>
              )}
          </div>
        </div>
      );
    });
  }
  else{
    return(
      <div><p>no post yet</p></div>
    )
  }
}
