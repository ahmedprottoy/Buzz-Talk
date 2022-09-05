import React from "react";
import Illustration from "./Illustration";
import classes from "../Styles/signup.module.css";
import SignUpForm from "./SignUpForm";

export default function SignUp() {
  return (
    <>
      <h1>Create an account</h1>
      <div className={classes.cont}>
        <Illustration />

        <SignUpForm />
      </div>
    </>
  );
}
