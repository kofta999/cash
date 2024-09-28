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
    <nav className="border-b border-gray-200">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex space-x-4">
            <Searchbar />
            <Link href="/">Home</Link>
            <Link href="/sell">Sell</Link>
            <Link href="/cart">Cart</Link>
            {session ? (
              <LogoutButton />
            ) : (
              <>
                <Link href="/sign-in">Sign in</Link>
                <Link href="/sign-up">Sign up</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
