"use client";

import { useAuth } from "@/context/AuthContext";

type LoginButtonProps = {
  className?: string;
  children?: React.ReactNode;
};

export function LoginButton({ className, children = "Login" }: LoginButtonProps) {
  const { openAuthModal } = useAuth();

  return (
    <button className={className} onClick={openAuthModal} type="button">
      {children}
    </button>
  );
}
