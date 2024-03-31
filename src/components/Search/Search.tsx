import React, { useState } from "react";
import {FaSearch} from 'react-icons/fa';
import { IconContext } from "react-icons/lib";
import { SeachProps } from "../../utils/searchUtils";

function Search({placeholderText, handleOnChange}: SeachProps) {
  const [searchData, setSearchData] = useState<string>("");
  const iconStyles = { marginRight: "10px", marginLeft: "6px", color: "black" };

 

  return (
    <div className={"app__search"}>
      <IconContext.Provider value={{ size: "20px" }}>
        <FaSearch style={iconStyles}/>
      </IconContext.Provider>

      <input
        className={"app__search-input"}
        type="text"
        placeholder={placeholderText}
        value={searchData}
        onChange={(e) => {handleOnChange(e, setSearchData)}}
      />
    </div>
  );
}

export default Search;