import React from "react";

const SearchBar = ({ onChange, value, placeholder = "Rechercher.." }) => {
  return (
    <div className="lookup lookup-right fadeInDown animated ml-auto ">
      <input
          className="shadow-material-1 hover-shadow-material-2-5"
        type="text"
        onChange={onChange}
        value={value}
        placeholder={placeholder}
      />
    </div>
  );
};

export default SearchBar;
