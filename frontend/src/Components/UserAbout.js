import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../config";
import classes from "../Styles/userAbout.module.css";
import { Email, Brightness4, LocationOn, Work } from "@material-ui/icons";

export default function UserAbout() {
  const [info, setInfo] = useState({});
  useEffect(() => {
    getInfo();
  }, []);

  const getInfo = () => {
    axios
      .get("http://localhost:3003/auth/user/profile", config)
      .then((response) => {
        setInfo(response.data[0]);
      });
  };

  return (
    <div className={classes.UserAbout}>
      <h2>About User : </h2>
      <span className={classes.aboutText}>
        <Email className={classes.aboutIcon} /> EMAIL : {info.email}{" "}
      </span>

      <span className={classes.aboutText}>
        {" "}
        <LocationOn className={classes.aboutIcon} /> FROM : {info.location}
      </span>

      <span className={classes.aboutText}>
        {" "}
        <Work className={classes.aboutIcon} /> PROFESSION : {info.profession}{" "}
      </span>

      <span className={classes.aboutText}>
        <Brightness4 className={classes.aboutIcon} />
        Religion : {info.religion}
      </span>
    </div>
  );
}
