import React from "react";
import classes from "../Styles/textInput.module.css";

export default function TextInput({ icon, ...rest }) {
  return (
    <div className={classes.textInput}>
      <input {...rest} />
      
    </div>
  );
}
