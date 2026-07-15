"use client";

import dynamic from "next/dynamic";
import { useAuth } from "@/providers/auth-provider";

const Header = dynamic(() => import("./header"));
const PlatformHeader = dynamic(() => import("./PlatformHeader"));

export default function HeaderSwitcher() {
  const { tier } = useAuth();

  if (tier === "platform") {
    return <PlatformHeader />;
  }

  return <Header />;
}
