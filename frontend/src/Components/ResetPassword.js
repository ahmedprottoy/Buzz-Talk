import React, { useState } from "react";
import TextInput from "./TextInput";
import { useLocation } from "react-router-dom";
import classes from "../Styles/signup.module.css";
import Axios from "axios";
import Illustration2 from "./Illustration2";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errText, setErrText] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setErrText("Password Didn't Match");
    }
    Axios.put("http://localhost:3003/auth/resetPassword", {
      email: location.state.email,
      password: password,
    }).then((response) => {
      if (response.data.msg !== "successful") {
        setErrText("Reset code doesn't match!!!");
      } else {
        navigate("/LogIn");
      }
      //navigate("/SignUp");
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
                  type="password"
                  required
                  placeholder="Enter New Password"
                  minLength="6"
                  icon="lock"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <TextInput
                  type="password"
                  required
                  placeholder="Confirm New Password"
                  minLength="6"
                  icon="lock_clock"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button type="submit" className={classes.submitButton}>
                  <span>Submit Now</span>
                </button>
                {errText && <p className={classes.error}>{errText}</p>}
              </form>
            </div>
          </div>
        </div>
      </main>
      ;
    </>
  );
}
