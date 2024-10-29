import { resetPasswordAction } from "./actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";

export default async function ResetPassword({
  searchParams,
}: {
  searchParams: Message;
}) {
  return (
    <form className="flex flex-col w-full max-w-md p-4 gap-2 [&>input]:mb-4">
      <h1 className="text-2xl font-medium">Reset password</h1>
      <p className="text-sm text-foreground/60">
        Please enter your new password below.
      </p>
      <label className="label" htmlFor="password">
        New password
      </label>
      <input
        className="input input-bordered"
        type="password"
        name="password"
        placeholder="New password"
        required
      />
      <label className="label" htmlFor="confirmPassword">
        Confirm password
      </label>
      <input
        className="input input-bordered"
        type="password"
        name="confirmPassword"
        placeholder="Confirm password"
        required
      />
      <SubmitButton formAction={resetPasswordAction}>
        Reset password
      </SubmitButton>
      <FormMessage message={searchParams} />
    </form>
  );
}
