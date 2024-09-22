'use client';
import React, { useState } from 'react';



const Searchbar = () => {
  const [searchTerm, setsearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    //searchlogic
    console.log('searchterm:',searchTerm)
  };
  
    return (
      <div>
         <form onSubmit={handleSearch} className="flex">
           <input 
             type="text"
             placeholder="Search"
             className="border rounded-md px-3 py-2"
             value={searchTerm}
             onChange={(e) => setsearchTerm(e.target.value)}           
           />
         </form>
      </div>
  )
}

export default Searchbar;