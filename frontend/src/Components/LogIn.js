import React from "react";
import Illustration2 from "./Illustration2";
import classes from "../Styles/signup.module.css";
import LogInForm from "./LogInForm";
import config from "../config";

export default function SignUp() {
  return (
    <main className={classes.main}>
      <div className={classes.container}>
        <div className={classes.cont}>
          <div className={classes.left}>
            <h1>Login to your account</h1>
            <Illustration2 />
          </div>
          <div className={classes.right}>
            <LogInForm />
          </div>
        </div>
      </div>
    </main>
  );
}
