import React, { useState, useEffect } from "react";
import classes from "../Styles/account.module.css";
import { Link, useNavigate } from "react-router-dom";
// import { AuthContext } from "../Context/AuthContext";
import Axios from "axios";

export default function Account() {
  // const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const [user, setUser] = useState("");

  Axios.defaults.withCredentials = true;

  useEffect(() => {
    Axios.get("http://localhost:3003/auth/isLoggedIn").then((response) => {
      if (response.data.isloggedin) {
        setUser(response.data.user[0].userName);
      }
    });
  }, [user]);

  function logout() {
    Axios.get("http://localhost:3003/auth/logout").then((response) => {
      console.log(response.data.msg);
      // response.clearCookie();
      if (!response.data.isloggedin) {
        navigate("/login");
      }
    });
  }

  return (
    <div className={classes.account}>
      {user ? (
        <>
          <span className="material-icons-outlined" title="Account">
            account_circle
          </span>
          <span>{user}</span>
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
