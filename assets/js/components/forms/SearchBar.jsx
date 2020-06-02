import React from "react";

const SearchBar = ({ onChange, value, placeholder = "Recherchez.." }) => {
  return (
    <div className="lookup lookup-huge no-icon pb-4">
      <input
        type="text"
        onChange={onChange}
        value={value}
        placeholder={placeholder}
      />
    </div>
  );
};

export default SearchBar;
