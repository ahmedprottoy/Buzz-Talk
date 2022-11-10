import Sidebar from "./Sidebar";
import classes from "../Styles/searchResult.module.css";
import SearchUsers from "./SearchUsers";

function Searchresult() {
  return (
    <>
      <div className={classes.SearchResult}>
        <Sidebar />
        <div className={classes.searchContent}>
          <SearchUsers />
        </div>
      </div>
    </>
  );
}

export default Searchresult;
