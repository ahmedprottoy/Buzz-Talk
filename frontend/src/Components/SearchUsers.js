import React, { useEffect, useState } from "react";
import classes from "../Styles/sidebar.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../config";

function SearchUsers(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const UserName = location.state.name;
  const [users, setUsers] = useState([]);

  useEffect(() => {
    searchedUser();
  }, []);

  const searchedUser = () => {
    axios
      .get(`http://localhost:3003/auth/search/user/account/${UserName}`, config)
      .then((response) => {
        setUsers(response.data);
      });
  };
  console.log(users);

  if (users) {
    return users.map((user, index) => {
      if (user.profileImgId === "null") {
        user.profileImgId = "avatar.png";
      }
      return (
        <>
          <a
            onClick={() =>
              navigate("/FollowerProfile", { state: { id: user.userID } })
            }
          >
            <li className={classes.sidebarFriend}>
              <img
                className={classes.sidebarFriendImg}
                src={`http://localhost:3003/auth/images/${user.profileImgId}`}
                alt=""
              />
              <span className={classes.sidebarFriendName}>
                {user.firstName} {user.lastName}
              </span>
            </li>
          </a>
        </>
      );
    });
  }
}

export default SearchUsers;
