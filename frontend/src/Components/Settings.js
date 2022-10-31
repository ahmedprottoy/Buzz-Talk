import React from "react";
import UpdateInfo from "./UpdateInfo";
import UpdateProfileImage from "./UpdateProfileImage";
import UpdateCoverImage from "./UpdateCoverImage";
import classes from "../Styles/settings.module.css";

export default function Settings() {
  return (
    <div className={classes.settingsContent}>
      <>
        <UpdateCoverImage />
      </>
      <>
        <UpdateProfileImage />
      </>
      <>
        <UpdateInfo />
      </>
    </div>
  );
}
