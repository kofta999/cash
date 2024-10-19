import React from "react";
import Link from "next/link";
import Searchbar from "./Searchbar";
import { createClient } from "@/utils/supabase/server";
import LogoutButton from "./logout-button";

const Navbar = async () => {
  let supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <nav className="navbar bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex space-x-4">
            <Searchbar />
            <Link href="/" className="navbar-link">Home</Link>
            <Link href="/sell" className="navbar-link">Sell</Link>
            <Link href="/cart" className="navbar-link">Cart</Link>
            {session ? (
              <LogoutButton />
            ) : (
              <>
                <Link href="/sign-in" className="navbar-link">Sign in</Link>
                <Link href="/sign-up" className="navbar-link">Sign up</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;