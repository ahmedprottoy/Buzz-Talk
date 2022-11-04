import React from "react";
import Feed from "./Feed";
import Sidebar from "./Sidebar";
import Rightbar from "./Rightbar";
import classes from "../Styles/home.module.css";




export default function Home() {


  return (
    <>
      <div className={classes.side}>
        <Sidebar />
      </div>
      <div className={classes.feed}>
        <Feed />
      </div>
      <div className={classes.right}>
      <h3>Chats</h3>
        <Rightbar/>
      </div>
    </>
  );
}
