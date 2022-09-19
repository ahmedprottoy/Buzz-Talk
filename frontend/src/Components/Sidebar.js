import React from "react";
import { useNavigate } from "react-router-dom";
import classes from "../Styles/sidebar.module.css";
import { RssFeed, AccountBox } from "@material-ui/icons";

export default function Sidebar() {
  const navigate = useNavigate();
  return (
    <div className={classes.sidebar}>
      <ul className={classes.sidebarList}>
        <li
          className={classes.sidebarListItem}
          onClick={() => {
            navigate("/");
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
      </ul>

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
      </ul>
    </div>
  );
}

// eslint-disable-next-line no-lone-blocks
{
  /* <li className={classes.sidebarListItem}>
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
          </li> */
}

// <li className={classes.sidebarListItem}>
//   <Event className={classes.sidebarIcon} />
//   <span className={classes.sidebarListItemText}>Events</span>
// </li>;
// <button className={classes.sidebarButton}>Show More</button>;
// Chat,
// PlayCircleFilledOutlined,
// Group,
// Bookmark,
// HelpOutline,
// WorkOutline,
// Event,
