"use client";

import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { useFormStatus } from "react-dom";

type Props = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> & {
  pendingText?: string;
};

export function SubmitButton({
  children,
  pendingText = "Submitting...",
  ...props
}: Props) {
  const { pending } = useFormStatus();

  return (
    <button className="btn" type="submit" aria-disabled={pending} {...props}>
      {pending ? pendingText : children}
    </button>
  );
}
