import React from "react";
import Link from "next/link";
//import Searchbar from "./Searchbar";
import { createClient } from "@/lib/supabase/server";
import LogoutButton from "./logout-button";

const Navbar = async () => {
  let supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <nav className="navbar border-b mb-10 fixed top-0 left-0 w-full bg-white z-10">
      <div className="navbar-start">
        <Link className="btn btn-ghost text-xl" href="/">
          Home
        </Link>
      </div>
   
      <div className="navbar-end flex gap-10">
        <Link href="/sell">
          <button className="btn w-20 bg-emerald-600 text-white hover:bg-opacity-100">Sell</button>

        </Link>

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
