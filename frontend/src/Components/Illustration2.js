import React from "react";
import illustration from "../images/login.svg";
import classes from "../Styles/illustration.module.css";

export default function Illustration2() {
  return (
    <div className={classes.illustration}>
      <img src={illustration} alt="Login" />
    </div>
  );
}
