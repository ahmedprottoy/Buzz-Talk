import React, { useState } from "react";
import TextInput from "./TextInput";
import {useLocation} from 'react-router-dom';
import classes from "../Styles/signup.module.css";
import Axios from "axios";

import { Link, useNavigate } from "react-router-dom";

export default function ResetPassword() {
    
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errText, setErrText] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location.state.email)
  
    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
           return setErrText("Password Didn't Match");
        }
    Axios.put("http://localhost:3003/auth/resetPassword",{
        email:location.state.email,
        password:password
    })
    .then((response) => {
        if(response.data.msg !== "successful"){
            setErrText("Reset code doesn't match!!!")
        }else{
            navigate('/LogIn');
        }
        //navigate("/SignUp");

    });
    }
  

  return (
    <>
    <form className={classes.form} onSubmit={submitHandler}>
    <TextInput
          type="password"
          required
          placeholder="Enter password"
          minLength="6"
          icon="lock"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <TextInput
          type="password"
          required
          placeholder="Confirm password"
          minLength="6"
          icon="lock_clock"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          type="submit"
          className={classes.submitButton}
          
        >
          <span>Submit Now</span>
        </button>
        {errText && <p className={classes.error}>{errText}</p> } 
         
     </form>

    </>
  );
}