import React from "react";
import classes from "../Styles/feed.module.css";
import Share from "./Share";
import Post from "./Post";

export default function Feed() {
  return (
    <div className={classes.feed}>
      <div className={classes.feedWrapper}>
        <Share />
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
    </div>
  );
}
