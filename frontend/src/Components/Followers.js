import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import classes from "../Styles/sidebar.module.css";
import axios from "axios";
import config from "../config";

export default function Followers() {
  const navigate = useNavigate();

  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3003/auth/following", config)
      .then((response) => {
        setFollowers(response.data);
      });
  }, []);

  if (followers) {
    return followers.map((follower, index) => {
      return (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <a
          onClick={() =>
            navigate("/FollowerProfile", { state: { id: follower.userId } })
          }
        >
          <li className={classes.sidebarFriend}>
            <img
              className={classes.sidebarFriendImg}
              src={`http://localhost:3003/auth/images/${follower.profileImgId}`}
              alt=""
            />
            <span className={classes.sidebarFriendName}>
              {follower.userName}
            </span>
          </li>
        </a>
      );
    });
  }
}
