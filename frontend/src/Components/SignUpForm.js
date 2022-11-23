import React, { useState } from "react";
import TextInput from "./TextInput";
import classes from "../Styles/signup.module.css";
import Axios from "axios";

import { Link, useNavigate } from "react-router-dom";

export default function SignUpFrom() {
  // const [val, setVal] = useState(true);
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const [status, setStatus] = useState("");

  const navigate = useNavigate();

  const [errText, setErrText] = useState();
  const [firstErr, setFirstErr] = useState();
  const [lastErr, setLastErr] = useState();
  const [userErr, setUserErr] = useState();

  const validateEmail = (e) => {
    let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    let emailValue = e.target.value;
    setEmail(emailValue);
    if (email.match(pattern)) {
      setErrText("");
    } else {
      setErrText("Email format is not valid");
    }
  };

  const validateFirstName = (e) => {
    let pattern = /^[a-z ,.'-]+$/i;
    let firstNameValue = e.target.value;
    setFirstName(firstNameValue);
    if (firstNameValue.length < 1) {
      setFirstErr("First Name must not be Empty");

      return;
    }
    if (
      firstNameValue[0] !== firstNameValue[0].toUpperCase() ||
      firstName.length > 20
    ) {
      setFirstErr("First Name must start with an UpperCase Letter");

      return;
    }
    if (firstName.match(pattern)) {
      setFirstErr("");
    } else {
      setFirstErr("First Name Should only contain Letters");
    }
  };

  const validateLastName = (e) => {
    let patternLast = /^[a-z ,.'-]+$/i;
    let lastNameValue = e.target.value;
    setLastName(lastNameValue);
    if (lastNameValue.length < 1) {
      setLastErr("Last Name must not be empty");

      return;
    }
    if (
      lastNameValue[0] !== lastNameValue[0].toUpperCase() ||
      lastName.length > 20
    ) {
      setLastErr("Last Name must start with an UpperCase Letter");

      return;
    }
    if (lastName.match(patternLast)) {
      setLastErr("");
    } else {
      setLastErr("Last Name Should only contain Letters");
    }
  };

  const validateUserName = (e) => {
    let userNameValue = e.target.value;
    setUserName(userNameValue);
    if (userNameValue.length < 4) {
      setUserErr("Username must be at least 4 character");

      return;
    }
    if (userNameValue[0] >= "0" && userNameValue[0] <= "9") {
      setUserErr("Username must start with a letter");

      return;
    } else {
      setUserErr("");
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setError("Password Didn't Match");
    }

    try {
      setError("");
      setLoading(true);
      setStatus("");

      await Axios.post("http://localhost:3003/auth/signUp", {
        userName,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
      }).then((response) => {
        setStatus(response.data.msg);
        if (response.data.nav) {
          setTimeout(() => {
            navigate("/LogIn");
          }, 1500);
        }
      });
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError("Failed to create an account!");
    }
  }

  return (
    <div>
      <form className={classes.form} onSubmit={handleSubmit}>
        <TextInput
          type="text"
          placeholder="Enter User Name"
          icon="person"
          required
          value={userName}
          onChange={validateUserName}
        />
        {userErr && <p className={classes.error}>{userErr}</p>}

        <TextInput
          type="text"
          placeholder="Enter First Name"
          icon="person"
          required
          value={firstName}
          onChange={validateFirstName}
        />
        {firstErr && <p className={classes.error}>{firstErr}</p>}

        <TextInput
          type="text"
          placeholder="Enter Last Name"
          icon="person"
          required
          value={lastName}
          onChange={validateLastName}
        />
        {lastErr && <p className={classes.error}>{lastErr}</p>}

        <TextInput
          type="email"
          required
          placeholder="Enter email"
          icon="alternate_email"
          value={email}
          onChange={validateEmail}
        />
        {errText && <p className={classes.error}>{errText}</p>}

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
          disabled={loading}
          type="submit"
          className={classes.submitButton}
        >
          <span>Submit Now</span>
        </button>

        {error && <p className={classes.error}>{error}</p>}
        {status && <p className={classes.status}>{status}</p>}

        <div className={classes.info}>
          Already have an account? <Link to="/login">Login</Link> instead.
        </div>
      </form>
    </div>
  );
}
