import { signInAction } from "../actions";
import { FormMessage, Message } from "@/components/form-message";
import GoogleSignIn from "@/components/google-button";
import { SubmitButton } from "@/components/submit-button";
import Link from "next/link";

export default function Login({ searchParams }: { searchParams: Message }) {
  return (
    <div>
      <div>
        <GoogleSignIn />
      </div>
      <div className="divider">Or with</div>
      <form className="flex-1 flex flex-col min-w-64">
        <h1 className="text-2xl font-medium">Sign in</h1>
        <p className="text-sm text-foreground">
          Don't have an account?{" "}
          <Link
            className="text-foreground font-medium underline"
            href="/sign-up"
          >
            Sign up
          </Link>
        </p>
        <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
          <label className="label" htmlFor="email">
            Email
          </label>
          <input
            className="input input-bordered"
            name="email"
            placeholder="you@example.com"
            required
          />
          <div className="flex justify-between items-center">
            <label className="label" htmlFor="password">
              Password
            </label>
            <Link
              className="text-s text-foreground underline"
              href="/forgot-password"
            >
              Forgot Password?
            </Link>
          </div>
          <input
            className="input input-bordered"
            type="password"
            name="password"
            placeholder="Your password"
            required
          />
          <SubmitButton pendingText="Signing In..." formAction={signInAction}>
            Sign in
          </SubmitButton>
          <FormMessage message={searchParams} />
        </div>
      </form>
    </div>
  );
}
