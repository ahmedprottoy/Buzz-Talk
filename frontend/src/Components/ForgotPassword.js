import React, { useState } from "react";
import TextInput from "./TextInput";
import Illustration2 from "./Illustration2";
import classes from "../Styles/signup.module.css";
import Axios from "axios";

import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3003/auth/forgot", {
      email: email,
    }).then((response) => {
      navigate("/CheckhCode");
    });
  };

  return (
    <>
      <main className={classes.main}>
        <div className={classes.container}>
          <div className={classes.cont}>
            <div className={classes.left}>
              <h1>Login to your account</h1>
              <Illustration2 />
            </div>
            <div className={classes.right}>
              <form className={classes.form} onSubmit={submitHandler}>
                <TextInput
                  type="email"
                  required
                  placeholder="Enter Email"
                  icon="alternate_email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit" className={classes.submitButton}>
                  <span>Submit Now</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
      ;
    </>
  );
}
