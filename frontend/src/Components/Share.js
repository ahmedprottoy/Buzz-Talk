import React from "react";
import classes from "../Styles/share.module.css";
import {PermMedia, Label, Room, EmojiEmotions} from "@material-ui/icons"

export default function Share() {
  return (
    <div className={classes.share}>
      <div className={classes.shareWrapper}>
        <div className={classes.shareTop}>
          <img className={classes.shareProfileImg} src="https://res.cloudinary.com/demo/image/facebook/65646572251.jpg" alt=""/>
          <textarea placeholder="What's in your mind?" className={classes.shareInput}/>
        </div>
        <hr className={classes.shareHr}/>
        <div className={classes.shareBottom}>
          <div className={classes.shareOptions}>
            <div className={classes.shareOption}>
              <PermMedia className={classes.shareIcon} />
              <span className={classes.shareOptionText}>Photo or Video</span>
            </div>
            <div className={classes.shareOption}>
              <Label className={classes.shareIcon} />
              <span className={classes.shareOptionText}>Tag</span>
            </div>
            <div className={classes.shareOption}>
              <Room className={classes.shareIcon} />
              <span className={classes.shareOptionText}>Location</span>
            </div>
            <div className={classes.shareOption}>
              <EmojiEmotions className={classes.shareIcon} />
              <span className={classes.shareOptionText}>Feeling</span>
            </div>
          </div>
          <button className={classes.shareButton}>Post</button>
        </div>
      </div>
    </div>
  )
}
