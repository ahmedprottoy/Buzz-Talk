import React from "react";
import ChatList from "./ChatList";
import classes from "../Styles/rightbar.module.css";

function Rightbar() {
  return (
    <div className={classes.rightbar}>
      <ChatList />
    </div>
  );
}

export default Rightbar;
