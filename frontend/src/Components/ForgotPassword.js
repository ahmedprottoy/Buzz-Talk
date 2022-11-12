import React, { useState } from "react";
import TextInput from "./TextInput";

import classes from "../Styles/signup.module.css";
import Axios from "axios";

import { Link, useNavigate } from "react-router-dom";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
  
    const submitHandler = (e) => {
        e.preventDefault();
        console.log("hey")
    Axios.post("http://localhost:3003/auth/forgot",{
        email:email
    })
    .then((response) => {
        console.log(email)
        navigate("/ChechkCode");

    });
    }
  

  return (
    <>
    <form className={classes.form} onSubmit={submitHandler}>
        <TextInput
          type="text"
          required
          
          placeholder="Enter email"
          icon="alternate_email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          type="submit"
          className={classes.submitButton}
          
        >
          <span>Submit Now</span>
        </button>
     </form>
    </>
  );
}