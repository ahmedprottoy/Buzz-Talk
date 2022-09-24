import React from "react";
import UpdateInfo from "./UpdateInfo";
import UpdateProfileImage from "./UpdateProfileImage";
import UpdateCoverImage from "./UpdateCoverImage";

export default function Settings() {
  return (
    <>
      <UpdateCoverImage />
      <UpdateProfileImage />

      <UpdateInfo />
    </>
  );
}
