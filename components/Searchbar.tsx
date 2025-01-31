"use client";
import React, { FormEventHandler, useState } from "react";

const Searchbar = () => {
  const [searchTerm, setsearchTerm] = useState("");

  const handleSearch: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    //searchlogic
  };

  return (
    <div>
      <form onSubmit={handleSearch} className="flex">
        <input
          type="text"
          placeholder="Search"
          className="border rounded-md border-base-300 bg-base-200 outline-none px-3 py-2"
          value={searchTerm}
          onChange={(e) => setsearchTerm(e.target.value)}
        />
      </form>
    </div>
  );
};

export default Searchbar;
