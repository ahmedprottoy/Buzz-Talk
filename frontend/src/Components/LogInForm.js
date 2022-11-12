import React, { useState, useContext } from "react";
import TextInput from "./TextInput";
import classes from "../Styles/signup.module.css";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { loginCall } from "../apiCalls";
import { AuthContext } from "../Context/AuthContext";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function LogInForm() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const [status, setStatus] = useState("");

  const { user, isFetching, err, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    loginCall({ userName, password }, dispatch);

    try {
      setError("");
      setLoading(true);
      setStatus("");

      const response = await Axios.post("http://localhost:3003/auth/logIn", {
        userName,
        password,
      });

      setLoading(false);
      localStorage.setItem(
        "accessToken",
        "Bearer " + response.data.accessToken
        // response.data.accessToken

      );
      localStorage.setItem("id", response.data.id);
      

      if (response.data.next) {
        setStatus(response.data.msg);
        navigate("/Home");
      } else {
        setError(response.data.msg);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }

  return (
    <>
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
          type="password"
          required
          minLength="6"
          placeholder="Enter password"
          icon="lock"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          disabled={isFetching}
          type="submit"
          className={classes.submitButton}
        >
          <span>
            {isFetching ? (
              <CircularProgress color="primary" size="18px" />
            ) : (
              "Log In"
            )}{" "}
          </span>
        </button>

        {error && <p className={classes.error}>{error}</p>}
        {status && <p className={classes.status}>{status}</p>}

        <div className={classes.info}>
        Don't have an account? <Link to="/SignUp">Sign Up </Link> first.<br/>
        Forgot your password?<Link to="/ForgotPassword">click here </Link>
        </div>
      </form>
    </>
  );
}
