import React, { useState, useEffect } from "react";
import classes from "../Styles/sidebar.module.css";
import axios from "axios";
import config from "../config";

export default function Followers() {
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3003/auth/follower", config)
      .then((response) => {
        setFollowers(response.data);
      });
  }, []);

  if (followers) {
    return followers.map((follower) => {
      return (
        <>
          <li className={classes.sidebarFriend}>
            <img
              className={classes.sidebarFriendImg}
              src="https://bhaviksarkhedi.com/wp-content/uploads/2017/03/1.jpg"
              alt=""
            />
            <span className={classes.sidebarFriendName}>
              {follower.userName}
            </span>
          </li>
          
        </>
      );
    });
  }
}
