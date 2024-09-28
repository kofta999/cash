"use client";
import { signOutAction } from "@/app/actions";

export default function LogoutButton() {
  return (
    <button className="btn btn-ghost" onClick={() => signOutAction()}>
      Logout
    </button>
  );
}
