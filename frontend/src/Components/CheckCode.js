import React, { useState } from "react";
import TextInput from "./TextInput";

import classes from "../Styles/signup.module.css";
import Axios from "axios";

import { Link, useNavigate } from "react-router-dom";

export default function CheckCode() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [errText, setErrText] = useState("");
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("hey");
    Axios.post("http://localhost:3003/auth/recovery", {
      email: email,
      code: code,
    }).then((response) => {
      if (response.data.msg === "unauthorized") {
        setErrText("Reset code doesn't match!!!");
      } else {
        navigate("/resetpassword", { state: { email: email } });
      }
      //navigate("/SignUp");
    });
  };

  return (
    <>
      <form className={classes.form} onSubmit={submitHandler}>
        <TextInput
          type="email"
          required
          placeholder="Enter email"
          icon="alternate_email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextInput
          type="text"
          required
          placeholder="Reset Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button type="submit" className={classes.submitButton}>
          <span>Submit Now</span>
        </button>
        {errText && <p className={classes.error}>{errText}</p>}
      </form>
    </>
  );
}
