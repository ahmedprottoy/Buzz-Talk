import React from "react";
import classes from "../Styles/nav.module.css";
import Account from "./Account";
import { Typewriter } from "react-simple-typewriter";

export default function Navbar() {
  return (
    <nav className={classes.nav}>
      <ul>
        <li>
          <a href="/" className={classes.brand}>
            {/* <Typewriter
              onInit={(typewriter) => {
                typewriter.typeString("Social Media").pauseFor(1500).start();
              }}
            /> */}

            <Typewriter
              words={["Social Media..."]}
              loop="false"
              cursor
              cursorStyle="_"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </a>
        </li>
      </ul>

      <Account />
    </nav>
  );
}
