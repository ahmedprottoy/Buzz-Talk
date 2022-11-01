import Sidebar from "./Sidebar";
import classes from "../Styles/searchResult.module.css";
import SearchUsers from "./SearchUsers";
import config from "../config";

function Searchresult() {
  // config();
  // console.log(config().headers.authorization);
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
