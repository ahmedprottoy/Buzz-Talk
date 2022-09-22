import React from 'react'
import classes from '../Styles/settings.module.css';
import Sidebar from "./Sidebar";
import {CameraAlt} from "@material-ui/icons";

export default function Settings() {
  return (
    <>
    {/* <Sidebar/> */}
     <div className={classes.settings}>
    <div className={classes.settingsWrapper}>
      <div className={classes.settingsTitle}>
        <span className={classes.settingsTitleUpdate}>Update Your Account</span>
      </div>
      <form className={classes.settingsForm}>
        <label>Update Profile Picture and Cover Photo</label>
        <div className={classes.settingsPP}>
          <img
            src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
          />
          <label htmlFor="fileInput">
          <span className={classes.PPtext}>Click to Choose new Profile Picture</span>
            {/* <i className={classes.settingsPPIcon}></i>{" "} */}
            <CameraAlt className={classes.settingsPPIcon}/>
          </label>
          <img
            src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
          />
          <label htmlFor="fileInput">
          <span className={classes.PPtext}>Click to Choose new Profile Cover</span>
            {/* <i className={classes.settingsPPIcon}></i>{" "} */}
            <CameraAlt className={classes.settingsPPIcon}/>
          </label>
          <input
            id="fileInput"
            type="file"
            style={{ display: "none" }}
            className={classes.settingsPPInput}
          />
        </div>
        <label>Username</label>
        <input type="text" placeholder="New User Name...." name="name" />
        <button className={classes.settingsSubmitButton} type="submit">
          Update Username
        </button>
        <label>Email</label>
        <input type="email" placeholder="New Email Address...." name="email" />
        <button className={classes.settingsSubmitButton} type="submit">
          Update Email
        </button>
        <label>Location</label>
        <input type="text" placeholder="New Location...." name="name" />
        <button className={classes.settingsSubmitButton} type="submit">
          Update Location
        </button>
        <label>Profession</label>
        <input type="text" placeholder="New Profession...." name="name" />
        <button className={classes.settingsSubmitButton} type="submit">
          Update Profession
        </button>
        <label>Religion</label>
        <input type="text" placeholder="New Religion...." name="" />
        <button className={classes.settingsSubmitButton} type="submit">
          Update Religion
        </button>
        <label>Password</label>
        <input type="password" placeholder="New Password...." name="password" />
        <input type="password" placeholder="Confirm New Password...." name="password" />
        <button className={classes.settingsSubmitButton} type="submit">
          Update Password
        </button>
        
      </form>
    </div>
    {/* <Sidebar /> */}
  </div>
  </>
  )
}
