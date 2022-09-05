import React, { useContext } from "react";
import classes from "../Styles/account.module.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

export default function Account() {
  const { user } = useContext(AuthContext);

  return (
    <div className={classes.account}>
      {user ? (
        <>
          <span className="material-icons-outlined" title="Account">
            account_circle
          </span>
          <span>{user.user}</span>
          <span className="material-icons-outlined" title="Logout">
            {/* onClick={logout} */}
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
