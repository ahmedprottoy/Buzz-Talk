import React, { useState, useEffect, useContext } from "react";
import classes from "../Styles/account.module.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import Axios from "axios";

export default function Account() {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const { user } = useContext(AuthContext);

  Axios.defaults.withCredentials = true;

  useEffect(() => {
    Axios.get("http://localhost:3003/auth/isLoggedIn").then((response) => {
      if (response.data.isloggedin) {
        setTimeout(() => {
          setUserName(response.data.user[0].userName);
        }, 1000);
      }
    });
  }, []);

  useEffect(() => {
    setUserName(user?.user);
  }, [user]);

  function logout() {
    Axios.get("http://localhost:3003/auth/logout").then((response) => {
      // eslint-disable-next-line no-const-assign
      setTimeout(() => {
        localStorage.clear();
        setUserName(null);
        navigate("/login");
      }, 1000);
    });
  }

  return (
    <div className={classes.account}>
      {userName ? (
        <>
          <span className="material-icons-outlined" title="Account">
            account_circle
          </span>
          <span>{userName}</span>
          <span
            className="material-icons-outlined"
            title="Logout"
            onClick={logout}
          >
            logout{" "}
          </span>
        </>
      ) : (
        <>
          <span className="material-icons-outlined" title="Account">
            account_circle
          </span>
          <Link to="/SignUp">Signup</Link>
          <span className="material-icons-outlined" title="Account">
            account_circle
          </span>
          <Link to="/LogIn">Log In</Link>
        </>
      )}
    </div>
  );
}
