"use client";
import { signOutAction } from "@/app/actions";

export default function LogoutButton() {
  return (
    <button className="" onClick={() => signOutAction()}>
      Logout
    </button>
  );
}
