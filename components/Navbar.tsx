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
    <nav className="navbar bg-base-100 border-b border-base-300">
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
          <button className="btn w-20">Sell</button>
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
