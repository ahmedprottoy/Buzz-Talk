import React, { useState, useEffect } from "react";
import config from "../config";
import axios from "axios";
import classes from "../Styles/post.module.css";
import Comments from "./Comments";
import { ThumbUp } from "@material-ui/icons";
import DropDown from "./DropDown";
import { useNavigate } from "react-router-dom";
import EditPost from "./EditPost";

export default function UserPost() {
 
  const [commentOpen, setCommentOpen] = useState([]);
  const [myPost, setMyPost] = useState([]);
  const [profileImage, setProfileImage] = useState("");
  const [cnt,setCnt]=useState(0);
  
  const handleCommentOpen = (event, index) => {
     //if(!commentOpen[index])
     console.log("handle comment")
      const commentStatus = commentOpen;
      commentStatus[index] = !commentStatus[index];
      setCommentOpen(commentStatus);
     // console.log(commentOpen[index])
  }

  const navigate = useNavigate();
  useEffect(() => {
    getImages();
  }, []);

  const getImages = () => {
    axios
      .get("http://localhost:3003/auth/getImages", config)
      .then((response) => {
        if (response.data[0].profileImgId !== "null") {
          setProfileImage(response.data[0].profileImgId);
        } else {
          setProfileImage("avatar.png");
        }
      });
  };

 useEffect(() => {
    getAllMyPost();
  },[]);

  const getAllMyPost = () => {
    axios
      .get("http://localhost:3003/auth/getOwnPost", config)
      .then((response) => {
        // console.log(response.data);
        const allMyPost = response.data;

        allMyPost.sort((a, b) => (a.postDate > b.postDate ? 1 : -1));

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
              <div
                className={classes.postTopRight}
                //onClick={() => {
                //  console.log(Post.postId);
                // }}
              >
                <DropDown
                  ClickEdit={() => {
                    navigate("/EditPost", {
                      state: {
                        id: Post.postId,
                        postDet: Post.postDet,
                      },
                    });
                  }}
                  postId={Post.postId}
                />
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
                <span className={classes.postCommentText} onClick={(evnt)=>{
                  
                  handleCommentOpen(evnt, index)
                  setCnt(cnt+1);

                  
                }}>comments</span>
              </div>
            </div>
          
            {  commentOpen[index] && <Comments postId={myPost[index].postId}/>}
            
          </div>
        </div>
      );
    });
  }
}
