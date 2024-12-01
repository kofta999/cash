import React from "react";
import Link from "next/link";
import Searchbar from "./Searchbar";
import { createClient } from "@/lib/supabase/server";
import LogoutButton from "./logout-button";

const Navbar = async () => {
  let supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <nav className="navbar mb-5 border-b fixed top-0 left-0 w-full bg-white z-50">
      <div className="navbar-start">
        <Link className="btn btn-ghost text-xl" href="/">
          Home
        </Link>
      </div>
      <div className="navbar-center">
        <Searchbar />
      </div>

      <div className="navbar-end flex gap-10">
        <Link href="/sell">
          <button className="btn w-20 bg-emerald-500 text-white hover:bg-opacity-80">Sell</button>
          
        </Link>
        {/* TODO: Cart Route */}
        {/* <Link href="/cart">Cart</Link> */}
        {session ? (
          <LogoutButton />
        ) : (
          <>
            <Link href="/sign-in">Sign in</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
