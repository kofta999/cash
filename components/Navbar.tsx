import React from 'react';
import Link from 'next/link';
import Searchbar from './Searchbar';


const Navbar = () => {

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex space-x-4">
           <Searchbar />
            <Link href="/">
              Home
            </Link>
            <Link href="/sell">
              Sell
            </Link>
            <Link href="/cart">
              Cart
            </Link>
            <Link href="/login">
              Login
            </Link>
           
          </div>
        </div>        
      </div>  
    </nav>
  );
};

export default Navbar;