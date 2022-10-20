import React, { useState } from "react";
import TextInput from "./TextInput";
import classes from "../Styles/signup.module.css";
import Axios from "axios";

import { Link, useNavigate } from "react-router-dom";

export default function SignUpFrom() {
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
            navigate("/");
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
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />
        <TextInput
          type="text"
          placeholder="Enter First Name"
          icon="person"
          required
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
        />
        <TextInput
          type="text"
          placeholder="Enter Last Name"
          icon="person"
          required
          value={lastName}
          onChange={(e) => {
            setLastName(e.target.value);
          }}
        />

        <TextInput
          type="email"
          required
          placeholder="Enter email"
          icon="alternate_email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

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

        <TextInput
          type="New field"
          required
          placeholder="new field"
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
