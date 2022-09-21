import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../config";

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
    <div>
      <span>Email : {info.email}</span>
      <span> From : {info.location}</span>
      <span>Professiion : {info.profession}</span>
      <span>Religion : {info.religion}</span>
    </div>
  );
}
