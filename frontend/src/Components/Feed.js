import React from "react";
import classes from "../Styles/feed.module.css";

import Share from "./Share";
import FollowersPost from "./FollowersPost";

export default function Feed() {
  return (
    <div className={classes.feed}>
      <div className={classes.feedWrapper}>
        <Share />
        <FollowersPost />
      </div>
    </div>
  );
}
