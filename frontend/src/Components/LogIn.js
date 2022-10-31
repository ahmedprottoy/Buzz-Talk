import React from "react";
import Illustration2 from "./Illustration2";
import classes from "../Styles/signup.module.css";
import LogInForm from "./LogInForm";

export default function SignUp() {
  return (
    <div className={classes.cont}>
      <div className={classes.left}>
        <h1>Login to your account</h1>
        <Illustration2 />
      </div>
      <div className={classes.right}>
        <LogInForm />
      </div>
    </div>
  );
}
