import React, { useEffect, useState } from "react";
import classes from "../Styles/searchResult.module.css";
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
      .get(
        `http://localhost:3003/auth/search/user/account/${UserName}`,
        config()
      )
      .then((response) => {
        console.log(response);
        setUsers(response.data);
      });
  };
  console.log(users.length);

  if (users.length !== 0) {
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
            className={classes.searchusers}
          >
            <img
              className={classes.sidebarFriendImg}
              src={`http://localhost:3003/auth/images/${user.profileImgId}`}
              alt=""
            />
            <span className={classes.sidebarFriendName}>
              {user.firstName} {user.lastName}
            </span>
          </a>
        </>
      );
    });
  } else {
    return <h2>No User Found</h2>;
  }
}

export default SearchUsers;
