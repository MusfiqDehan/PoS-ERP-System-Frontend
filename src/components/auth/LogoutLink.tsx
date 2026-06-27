"use client";

import Link from "next/link";
import type { ReactNode } from "react";

import { all_routes } from "@/data/all_routes";
import { useAuth } from "@/providers/auth-provider";

type LogoutLinkProps = {
  className?: string;
  children: ReactNode;
};

export default function LogoutLink({ className, children }: LogoutLinkProps) {
  const { logout } = useAuth();

  return (
    <Link
      className={className}
      href={all_routes.signin}
      onClick={() => logout()}
    >
      {children}
    </Link>
  );
}
