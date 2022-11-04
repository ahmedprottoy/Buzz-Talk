import React from "react";
import { useNavigate } from "react-router-dom";
import Followers from "./Followers";
import classes from "../Styles/sidebar.module.css";
import { RssFeed, AccountBox, SettingsSharp } from "@material-ui/icons";
import SearchBar from "./SearchBar";
import ChatBubbleRoundedIcon from "@material-ui/icons/ChatBubbleRounded";

export default function Sidebar() {
  const navigate = useNavigate();
  return (
    <div className={classes.sidebar}>
      <SearchBar />
      <ul className={classes.sidebarList}>
        <li className={classes.sidebarListItem}></li>
        <li
          className={classes.sidebarListItem}
          onClick={() => {
            navigate("/Home");
          }}
        >
          <RssFeed className={classes.sidebarIcon} />
          Feed
        </li>

        <li
          className={classes.sidebarListItem}
          onClick={() => {
            navigate("/Profile");
          }}
        >
          <AccountBox className={classes.sidebarIcon} />
          <span className={classes.sidebarListItemText}>Profile</span>
        </li>
        <li
          className={classes.sidebarListItem}
          onClick={() => {
            navigate("/Settings");
          }}
        >
          <SettingsSharp className={classes.sidebarIcon} />
          <span className={classes.sidebarListItemText}>Account Settings</span>
        </li>
      </ul>

      <hr className={classes.sidebarHr} />

      <span className={classes.followerTitle}>Followers</span>

      <ul className={classes.sidebarFriendList}>
        <Followers />
      </ul>
    </div>
  );
}
