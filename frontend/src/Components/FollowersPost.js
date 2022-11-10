import axios from "axios";
import React, { useState, useEffect } from "react";
import config from "../config";
import classes from "../Styles/post.module.css";
import { ThumbUp } from "@material-ui/icons";
import Comments from "./Comments";

export default function FollowersPost() {
  let numberOfLikes;
  let liked = false;
  let clicked = false;
  // const [likeNumber, setLikeNumber] = useState(0);
  // const [likeNumber, setLikeNumber] = useState(0);

  const [followerPost, setFollowerPost] = useState([]);
  const [commentOpen, setCommentOpen] = useState([]);
  const [cnt, setCnt] = useState(0);

  const handleCommentOpen = (evnt, index) => {
    const commentStatus = commentOpen;
    commentStatus[index] = !commentStatus[index];
    evnt.preventDefault();
    setCommentOpen(commentStatus);
  };

  useEffect(() => {
    getFollowerPost();
  }, []);
  // console.log(followerPost);
  const getFollowerPost = () => {
    axios
      .get("http://localhost:3003/auth/follower/post", config())
      .then((response) => {
        const allMyPost = response.data;
        allMyPost.sort((a, b) => (a.postDate > b.postDate ? 1 : -1));
        setFollowerPost(allMyPost);
        // console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  async function isThePostLiked(postid, likenumber) {
    const response = await axios.get(
      `http://localhost:3003/auth/isLike/${postid}`,
      config()
    );

    if (response.data.isLiking === true) {
      handleUnLike(postid);
    } else {
      handleLike(postid);
    }
  }

  const handleLike = (postid) => {
    console.log("clicked like");
    clicked = true;
    console.log(postid);
    //  setLikeNumber(likeNumber+1);
    axios
      .post(`http://localhost:3003/auth/like/${postid}`, {}, config())
      .then((response) => {
        console.log(response);
        liked = true;
      });
    window.location.reload(false);
  };

  const handleUnLike = (postid) => {
    console.log("clicked unlike");
    clicked = true;
    console.log(postid);
    // setLikeNumber(likeNumber-1);
    axios
      .delete(`http://localhost:3003/auth/unlike/${postid}`, config())
      .then((response) => {
        console.log(response);
        liked = false;
      });
    window.location.reload(false);
  };

  // console.log(followerPost);

  if (followerPost) {
    return followerPost.map((Post, index) => {
      if (Post.profileImgId === "null") {
        Post.profileImgId = "avatar.png";
        numberOfLikes = Post.likenumber;
      }
      return (
        <div className={classes.post} key={index}>
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
                <ThumbUp
                  className={classes.likeIcon}
                  onClick={() => {
                    isThePostLiked(followerPost[index].postId, Post.likenumber);
                  }}
                />
                {Post.likenumber === null ? (
                  <span className={classes.postLikeCounter}>No likes yet</span>
                ) : (
                  <span className={classes.postLikeCounter}>
                    {Post.likenumber} people liked it
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
            {commentOpen[index] && (
              <Comments postId={followerPost[index].postId} />
            )}
          </div>
        </div>
      );
    });
  }
}
