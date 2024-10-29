"use client";
import { signOutAction } from "@/app/(auth)/actions";

export default function LogoutButton() {
  return (
    <button className="" onClick={() => signOutAction()}>
      Logout
    </button>
  );
}
