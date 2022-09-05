import React from "react";
import Illustration2 from "./Illustration2";
import classes from "../Styles/signup.module.css";
import LogInForm from "./LogInForm";

export default function SignUp() {
  return (
    <>
      <h1>Login to your account</h1>
      <div className={classes.cont}>
        <Illustration2 />

        <LogInForm />
      </div>
    </>
  );
}
