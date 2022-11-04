import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import config from "../config";
import axios from "axios";
import Sidebar from "./Sidebar";
import classes from "../Styles/searchResult.module.css";
import SearchUsers from "./SearchUsers";

function Searchresult() {
  return (
    <>
      <div className={classes.SearchResult}>
        <Sidebar />
        <div className={classes.searchContent}>
          <div className={classes.searchusers}>
            <SearchUsers />
          </div>
        </div>
      </div>
    </>
  );
}

export default Searchresult;
///search/user/account/:userName
