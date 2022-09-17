import React from 'react'
import classes from "../Styles/rightbar.module.css";
import {Cake} from "@material-ui/icons"

export default function Rightbar() {
  return (
    <div className={classes.rightbar}>
      <div className={classes.rightbarWrapper}>
        <div className={classes.birthdayContainer}>
          {/* <Cake className={classes.birthdayImg}/> */}
          <img className={classes.birthdayImg} src='https://cdn-icons-png.flaticon.com/512/1/1531.png' alt=''/>
          <span className={classes.birthdayText}>
            {" "}
            <b>Jalaluddin</b> and <b>69 other friends</b> have a birthday today.
          </span>
        </div>
        <h4 className={classes.rightbarTitle}>Online Friends</h4>
        <ul className={classes.rightbarFriendList}>
          <li className={classes.rightbarFriend}>
            <div className={classes.rightbarProfileImgContainer}>
              <img className={classes.rightbarProfileImg} src='https://st2.depositphotos.com/4760391/10082/i/600/depositphotos_100824156-stock-photo-studio-portrait-of-adolf-hitler.jpg' alt=''/>
              <span className={classes.rightbarOnline}></span>
            </div>
            <span className={classes.rightbarUsername}> Jalaluddin </span>
          </li>
        </ul>
      </div>
    </div>
  )
}
