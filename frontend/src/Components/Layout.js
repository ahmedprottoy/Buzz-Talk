import React from "react";
import classes from "../Styles/home.module.css";
import config from "../config";
import { Navigate, Outlet } from "react-router-dom";

export default function Layout() {
  let loggedin = config().headers.authorization;
  console.log(loggedin);
  return loggedin ? (
    <>
      <main className={classes.main}>
        <div className={classes.container}>
          <Outlet />
        </div>
      </main>
    </>
  ) : (
    <>
      <Navigate to="/LogIn" />
    </>
  );
}
