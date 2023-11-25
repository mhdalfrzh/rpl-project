import React, { useState } from "react";
import { LogoSearch } from "../Logo";
import { Link } from "react-router-dom";

export default function SearchBar(props) {
  const [name, setName] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    props.history.push(`/search/name/${name}`);
  };
  return (
    <div className="searchBar">
      <input
        type="text"
        name="searchInput"
        id="searchInput"
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => {
          if (e.keyCode === 13) {
            e.preventDefault();
            document.getElementsByClassName("logoSearch")[0].click();
          }
        }}
      ></input>
      <Link to={`/search/name/${name}`}>
        <div className="logoSearch">
          <LogoSearch />
        </div>
      </Link>
    </div>
  );
}
