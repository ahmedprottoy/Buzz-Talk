import axios from "axios";
import React, { useState, useEffect } from "react";
import classes from "../Styles/comments.module.css";
import config from "../config";
import { useNavigate } from "react-router-dom";

export default function Comments(props) {
  const postId = props.postId;
  
  const navigate = useNavigate();
  const [commentList, setCommentList] = useState([]);

  //image of current user
  
  // console.log(postId);
  useEffect(()=>{
    getAllComments();
  },[commentList]);

  const getAllComments= () => {
    axios.get(`http://localhost:3003/auth/comment/${postId}`,config)
    .then((response)=>{
      const allComment = response.data;
      setCommentList(allComment);
    }).catch((error)=>{
      console.log(error)
    })
  }




  const [commentData, setCommentData] = useState({
    commentText: "",
  });
  const [commentStatus, setCommentStatus] = useState("");

  const handleCommentChange = (event) => {
    setCommentData((prevCommentData) => {
      return {
        ...prevCommentData,
        [event.target.name]: event.target.value,
      };
    });
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        `http://localhost:3003/auth/comment/${postId}`,
        {
          commentText: commentData.commentText,
        },
        config
      )
      .then((response) => {
        console.log(response);
        setCommentStatus(response.data);
        // navigate("/Profile");
      });
  };

  if(commentList){
    return (
      <div className={classes.comments}>
      <div className={classes.write}>
        <img
          className={classes.currentUserImg}
          src="https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&w=300"
          alt=""
        />
        <input
          type="text"
          placeholder="Write a comment..."
          className={classes.commentInput}
          name="commentText"
          autoFocus={true}
          onChange={handleCommentChange}
        />
        <button className={classes.commentBtn} onClick={handleCommentSubmit}>
          Comment
        </button>
      </div>
      {commentList.map((comment,index) => (
        <div className={classes.comment}>
          <img
            src="https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&w=300"
            alt=""
            className={classes.commentImg}
          />
          <div className={classes.info}>
            <span className={classes.commentUsername}>{comment.userName}</span>
            <p className={classes.commentDesc}>{comment.commentText}</p>
          </div>
          <span className={classes.date}>68 minutes ago</span>
        </div>
      ))}
    </div>
    )
  } 

}
