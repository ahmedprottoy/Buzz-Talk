import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <p>Welcome</p>

      <Link to="/Profile">profile</Link>
    </div>
  );
}
