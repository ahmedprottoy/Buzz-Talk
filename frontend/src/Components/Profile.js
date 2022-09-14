import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Profile() {
  const [msg, setMsg] = useState("");

  useEffect(() => {
    getMsg();
  });

  const config = {
    headers: { authorization: localStorage.getItem("accessToken") },
  };

  const getMsg = () => {
    axios.get("http://localhost:3003/auth/test", config).then((response) => {
      console.log(response);
      setMsg(response.data.msg);
    });
  };

  return <h1>{msg}</h1>;
}
