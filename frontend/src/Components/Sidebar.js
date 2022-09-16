import React from "react";
import { useNavigate } from "react-router-dom";
import classes from "../Styles/sidebar.module.css";
import {
  RssFeed,
  Chat,
  PlayCircleFilledOutlined,
  Group,
  Bookmark,
  HelpOutline,
  WorkOutline,
  Event,
  AccountBox,
} from "@material-ui/icons";

export default function Sidebar() {
  let navigate = useNavigate();
  const routeChange = () => {
    let path = '/Profile';
    navigate(path);
  }
  return (
    <div className={classes.sidebar}>
      <div className={classes.sidebarWrapper}>
        <ul className={classes.sidebarList}>
          <li className={classes.sidebarListItem}>
            <RssFeed className={classes.sidebarIcon} />
            <span className={classes.sidebarListItemText}>Feed</span>
          </li>
          <li className={classes.sidebarListItem}>
            <Chat className={classes.sidebarIcon} />
            <span className={classes.sidebarListItemText}>Chats</span>
          </li>
          <li className={classes.sidebarListItem}>
            <PlayCircleFilledOutlined className={classes.sidebarIcon} />
            <span className={classes.sidebarListItemText}>Videos</span>
          </li>
          <li className={classes.sidebarListItem}>
            <Group className={classes.sidebarIcon} />
            <span className={classes.sidebarListItemText}>Groups</span>
          </li>
          <li className={classes.sidebarListItem}>
            <Bookmark className={classes.sidebarIcon} />
            <span className={classes.sidebarListItemText}>Bookmarks</span>
          </li>
          <li className={classes.sidebarListItem}>
            <HelpOutline className={classes.sidebarIcon} />
            <span className={classes.sidebarListItemText}>Questions</span>
          </li>
          <li className={classes.sidebarListItem}>
            <WorkOutline className={classes.sidebarIcon} />
            <span className={classes.sidebarListItemText}>Jobs</span>
          </li>
          <li className={classes.sidebarListItem}>
            <Event className={classes.sidebarIcon} />
            <span className={classes.sidebarListItemText}>Events</span>
          </li>
          <li className={classes.sidebarListItem} onClick={routeChange}>
            <AccountBox className={classes.sidebarIcon} />
            <span className={classes.sidebarListItemText}>Profile</span>
          </li>
        </ul>
        <button className={classes.sidebarButton}>Show More</button>
        <hr className={classes.sidebarHr} />
        <span className={classes.followerTitle}>Followers</span>
        <ul className={classes.sidebarFriendList}>
          <li className={classes.sidebarFriend}>
            <img
              className={classes.sidebarFriendImg}
              src="https://bhaviksarkhedi.com/wp-content/uploads/2017/03/1.jpg"
              alt=""
            />
            <span className={classes.sidebarFriendName}>John Doe</span>
          </li>
          <li className={classes.sidebarFriend}>
            <img
              className={classes.sidebarFriendImg}
              src="https://bhaviksarkhedi.com/wp-content/uploads/2017/03/1.jpg"
              alt=""
            />
            <span className={classes.sidebarFriendName}>John Doe</span>
          </li>
          <li className={classes.sidebarFriend}>
            <img
              className={classes.sidebarFriendImg}
              src="https://bhaviksarkhedi.com/wp-content/uploads/2017/03/1.jpg"
              alt=""
            />
            <span className={classes.sidebarFriendName}>John Doe</span>
          </li>
          <li className={classes.sidebarFriend}>
            <img
              className={classes.sidebarFriendImg}
              src="https://bhaviksarkhedi.com/wp-content/uploads/2017/03/1.jpg"
              alt=""
            />
            <span className={classes.sidebarFriendName}>John Doe</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
