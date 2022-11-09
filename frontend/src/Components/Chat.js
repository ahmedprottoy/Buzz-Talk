import React from "react";
import classes from "../Styles/chat.module.css";
import Message from "./Message";
import InsertPhotoRoundedIcon from "@mui/icons-material/InsertPhotoRounded";
import { useNavigate, useLocation } from "react-router-dom";
import ChatList from "./ChatList";
// import { getMessages } from "../../../BackEnd/Controllers/chatController";
import axios from "axios";
import config from "../config";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3003");

socket.on("connection");
export default function Chat() {
  const navigate = useNavigate();
  const location = useLocation();
  const userID = location.state.id;
  const img = location.state.img;
  const [myImg, setMyImg] = React.useState("");
  const [conversationID, setConversationID] = React.useState("");
  const userName = location.state.userName;
  const [newMessage, setNewMessage] = React.useState("");
  // const currentUser = JSON.parse(localStorage.getItem("user"));
  console.log("userID" + typeof userID);

  console.log(userID);
  const [message, getMessage] = React.useState([]);

  React.useEffect(() => {
    getMsgs();
  }, [userID]);

  React.useEffect(() => {
    socket.on("chat-message", (data) => {
      console.log(data);
      if (data.receiver === localStorage.getItem("id").toString()) {
        const msg = {
          messageText: data.message,
          messageFrom: data.sender,
          senderImg: img,
        };
        let tmp = [msg, ...message];

        getMessage(tmp);
        setNewMessage("");
      }
    });
  }, [message]);

  const getMsgs = () => {
    // console.log("hi")
    axios
      .get(`http://localhost:3003/auth/getmessage/${userID}`, config())
      .then((response) => {
        // console.log(response.data);
        getMessage(response.data);
        if (response.data[0].messageFrom == localStorage.getItem("id")) {
          setMyImg(response.data[0].senderImg);
          setConversationID(response.data[0].conversationID);
        } else {
          setMyImg(response.data[0].receiverImg);
          setConversationID(response.data[0].conversationID);
          console.log(response.data[0].conversationID)
        }
        // console.log(response.data);
        // let allMsg = response.data;
        // getMessage(response.data);
      });
  };

  const handleMessageSend = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    socket.emit("send-chat-message", {
      message: newMessage,
      sender: localStorage.getItem("id"),
      receiver: userID.toString(),
      conversationID: Math.max(localStorage.getItem("id"),userID.toString())+"_"+Math.min(localStorage.getItem("id"),userID.toString()),
    });

    const msg = {
      messageText: newMessage,
      messageFrom: localStorage.getItem("id"),
      senderImg: myImg,
    };
    let tmp = [msg, ...message];

    getMessage(tmp);
    setNewMessage("");
  };

  return (
    <div className={classes.messenger}>
      <div className={classes.chatMenu}>
        <div className={classes.chatMenuWrapper}>
          <ChatList />
        </div>
      </div>

      <div className={classes.chatBox}>
        <div className={classes.chatBoxWrapper}>
          <div className={classes.chatBoxTop}>
            <Message message={message} />
          </div>
          <div className={classes.chatBoxBottom}>
            <textarea
              className={classes.chatMessageInput}
              value={newMessage}
              placeholder="Type a message..."
              onChange={handleMessageSend}
            ></textarea>

            <button className={classes.chatSubmitButton} onClick={handleSubmit}>
              Send
            </button>
          </div>
        </div>
      </div>
      <div className={classes.chatUserInfo}>
        <div className={classes.chatUserInfoWrapper}>
          <h1>You are Chatting With...</h1>
          {(img==="null") ? (
            <img
              src={`http://localhost:3003/auth/images/avatar.png`}
              alt=""
              className={classes.chatUserImg}
            />
          ) : (
            <img
              src={`http://localhost:3003/auth/images/${img}`}
              alt=""
              className={classes.chatUserImg}
            />
          )}

          <h2>{userName}</h2>
          <button className={classes.chatUserButton}>View Profile</button>
        </div>
      </div>
    </div>
  );
}
