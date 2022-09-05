import React from "react";
import illustration from "../images/signup.svg";
import classes from "../Styles/illustration.module.css";

export default function Illustration() {
  return (
    <div className={classes.illustration}>
      <img src={illustration} alt="Login" />
    </div>
  );
}
