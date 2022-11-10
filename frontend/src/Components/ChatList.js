import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import config from "../config";
import classes from "../Styles/conversation.module.css";

function ChatList() {
  const navigate = useNavigate();
  const [conversation, getConversation] = useState([]);

  useEffect(() => {
    getConversationInfo();
  }, []);

  const getConversationInfo = () => {
    axios
      .get("http://localhost:3003/auth/getconvo", config())
      .then((response) => {
        //   console.log(response.data);
        // const allConvo = response.data;
        getConversation(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (conversation) {
    return conversation.map((convo, index) => {
      return (
        <div
          key={index}
          className={classes.conversation}
          onClick={() => {
            navigate("/Chat", {
              state: {
                id: convo.userID,
                img: convo.profileImgId,
                userName: convo.userName,
              },
            });
            // getMsgs();
          }}
        >
          {convo.profileImgId === "null" ? (
            <img
              className={classes.conversationImg}
              src={`http://localhost:3003/auth/images/avatar.png`}
              alt=""
            />
          ) : (
            <img
              className={classes.conversationImg}
              src={`http://localhost:3003/auth/images/${convo.profileImgId}`}
              alt=""
            />
          )}

          <span className={classes.conversationName}>{convo.userName}</span>
        </div>
      );
    });
  }
}

export default ChatList;
