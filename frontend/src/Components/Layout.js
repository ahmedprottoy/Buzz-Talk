import React from "react";
import classes from "../Styles/home.module.css";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <main className={classes.main}>
      <div className={classes.container}>
        <Navbar />
        {children}
      </div>
    </main>
  );
}
