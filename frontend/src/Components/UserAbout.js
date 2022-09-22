import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../config";
import classes from "../Styles/userAbout.module.css";
import { Email, LocationOn, Work } from "@material-ui/icons";

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
      
      <span className={classes.aboutText}> <Email className={classes.aboutIcon} /> {info.email} </span>
      
      <span className={classes.aboutText}> <LocationOn className={classes.aboutIcon} /> {info.location}</span>
      
      <span className={classes.aboutText}> <Work className={classes.aboutIcon}/>  {info.profession} </span>
      {/* <Mosque /> */}
      <span className={classes.aboutText}><b>Religion: </b>{info.religion}</span>
    </div>
  );
}
