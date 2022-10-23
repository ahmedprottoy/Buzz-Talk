import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import classes from "../Styles/profile.module.css";
import Sidebar from "./Sidebar";
import FollowerProfilePost from "./FollowerProfilePost";
import axios from "axios";
import config from "../config";
import { Email, Brightness4, LocationOn, Work } from "@material-ui/icons";

export default function FollowerProfile() {
  const location = useLocation();
  const followerID = location.state.id;
  const [following, setFollowing] = useState("");
  console.log(location.state);

  const [followerInfo, setFollowerInfo] = useState([]);

  useEffect(() => {
    getInfo();
    isFollowing();
  }, [followerID]);

  const getInfo = () => {
    axios
      .get(
        `http://localhost:3003/auth/user/getFollowerProfile/${followerID}`,
        config
      )
      .then((response) => {
        setFollowerInfo(response.data[0]);
        console.log(response.data[0]);
      });
  };

  const isFollowing = () => {
    axios
      .get(`http://localhost:3003/auth//user/isFollowing/${followerID}`, config)
      .then((response) => {
        setFollowing(response.data);
      });
  };

  const unfollow = (followerID) => {
    axios
      .delete(`http://localhost:3003/auth/unfollow/${followerID}`, config)
      .then((response) => {
        console.log(response.data);
      });
  };
  return (
    <>
      <div className={classes.profile}>
        <Sidebar />
        <div className={classes.profileRight}>
          <div className={classes.profileRightTop}>
            <div className={classes.profileCover}>
              <img
                className={classes.profileCoverImg}
                src={`http://localhost:3003/auth/images/${followerInfo.coverImgId}`}
                alt=""
              />
              <img
                className={classes.profileUserImg}
                src={`http://localhost:3003/auth/images/${followerInfo.profileImgId}`}
                alt=""
              />
            </div>
            <div className={classes.profileInfo}>
              <h4 className={classes.profileInfoName}>
                {followerInfo.firstName} {followerInfo.lastName}
              </h4>
              <span className={classes.profileInfoDesc}>
                {followerInfo.userName}
              </span>
            </div>
            <div className={classes.profileBio}>
              {/* <span className={classes.profileBioItem}>lorem</span>
              <span className={classes.profileBioItem}>ipsum</span>
              <span className={classes.profileBioItem}>dolor</span>
              <span className={classes.profileBioItem}>amet</span> */}
            </div>

            <div className={classes.profileButton}>
              {following ? (
                <>
                  <button
                    className={classes.FollowingButton}
                    onClick={() => {
                      unfollow(followerID);
                    }}
                  >
                    Unfollow
                  </button>
                </>
              ) : (
                <>
                  <button>Follow</button>
                </>
              )}
            </div>
          </div>
          <div className={classes.profileRightBottom}>
            <div className={classes.content}>
              <FollowerProfilePost id={followerID} />
            </div>

            <div className={classes.UserAbout}>
              <h2>About User : </h2>
              <span className={classes.aboutText}>
                <Email className={classes.aboutIcon} /> EMAIL :{" "}
                {followerInfo.email}{" "}
              </span>

              <span className={classes.aboutText}>
                {" "}
                <LocationOn className={classes.aboutIcon} /> FROM :{" "}
                {followerInfo.location}
              </span>

              <span className={classes.aboutText}>
                {" "}
                <Work className={classes.aboutIcon} /> PROFESSION :{" "}
                {followerInfo.profession}{" "}
              </span>

              <span className={classes.aboutText}>
                <Brightness4 className={classes.aboutIcon} />
                Religion : {followerInfo.religion}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
