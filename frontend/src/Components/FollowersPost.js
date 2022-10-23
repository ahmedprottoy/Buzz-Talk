import axios from "axios";
import React, { useState, useEffect } from "react";
import config from "../config";
import classes from "../Styles/post.module.css";
import { ThumbUp } from "@material-ui/icons";
import Comments from "./Comments";

export default function FollowersPost() {
  const [followerPost, setFollowerPost] = useState([]);
  const[commentOpen,setCommentOpen]=useState([]);
  const [cnt,setCnt]=useState(0);

  const handleCommentOpen = (evnt, index) => {
    const commentStatus = commentOpen;
    commentStatus[index] = !commentStatus[index];
    setCommentOpen(commentStatus);
  }

  useEffect(() => {
    getFollowerPost();
  }, []);

  const getFollowerPost = () => {
    axios
      .get("http://localhost:3003/auth/follower/post", config)
      .then((response) => {
        const allMyPost = response.data;
        allMyPost.sort((a, b) => (a.postDate > b.postDate ? 1 : -1));
        setFollowerPost(allMyPost);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log(followerPost);

  if (followerPost) {
    return followerPost.map((Post, index) => {
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
                <span className={classes.postUsername}>
                  <b>{Post.Author}</b>
                  <p> </p>
                </span>

                <span className={classes.postDate}>{Post.date_time}</span>
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
                <span className={classes.postLikeCounter}>
                  20 people liked it
                </span>
              </div>
              <div className={classes.postBottomRight}>
                <span className={classes.postCommentText} onClick={
                  (evnt)=>{
                    handleCommentOpen(evnt, index)
                    setCnt(cnt+1);
                  }
                }>comments</span>
              </div>
            </div>
            {commentOpen[index] && <Comments postId={followerPost[index].postId}/>}
          </div>
        </div>
      );
    });
  }
}
