import React from "react";
import classes from "../Styles/nav.module.css";
import Account from "./Account";

export default function Navbar() {
  return (
    <nav className={classes.nav}>
      <ul>
        <li>
          <a href="/" className={classes.brand}>
            {/* <img src={image} alt="Learn with Sumit Logoo" /> */}
            <h3>Social Media</h3>
          </a>
        </li>
      </ul>

      <Account />
    </nav>
  );
}
