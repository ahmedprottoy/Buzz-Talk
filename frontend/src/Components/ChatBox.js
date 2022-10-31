import React from 'react'
import classes from '../Styles/chat.module.css'
import Message from './Message'
import InsertPhotoRoundedIcon from "@mui/icons-material/InsertPhotoRounded";

export default function ChatBox() {
  return (
    <div className={classes.chatBox}>
        <div className={classes.chatBoxWrapper}>
          <div className={classes.chatBoxTop}>
            <Message />
            <Message own={true} />
            <Message own={true} />
            <Message />
            <Message own={true} />
            <Message />
            <Message own={true} />
            <Message />
            <Message own={true} />
            <Message />
            <Message own={true} />
            <Message />
            <Message own={true} />
            <Message />
            <Message own={true} />
          </div>
          <div className={classes.chatBoxBottom}>
            <textarea
              className={classes.chatMessageInput}
              placeholder="Type a message..."
            ></textarea>
            {/* <IoSend className="chatSubmitButton"/> */}
            <label>
              <InsertPhotoRoundedIcon className={classes.photoIco} />
              <input
                id="file1"
                type="file"
                name="fileName"
                accepts="image/*"
                style={{ display: "none" }}
              />
            </label>

            <button className={classes.chatSubmitButton}>Send</button>
          </div>
        </div>
      </div>
  )
}
