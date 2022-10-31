import React, { useState } from "react";
import classes from "../Styles/search.module.css";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  function handleChange(event) {
    setName(event.target.value);
  }

  return (
    <>
      <textarea
        type="text"
        className={classes.searchbar}
        autoComplete="off"
        placeholder="Search"
        onChange={handleChange}
      />

      <button
        className={classes.searchButton}
        onClick={() => navigate("/SearchResult", { state: { name: name } })}
      >
        <SearchOutlinedIcon />
      </button>
    </>
  );
}

export default SearchBar;
