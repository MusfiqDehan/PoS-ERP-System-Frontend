"use client";

import { useAuth } from "@/providers/auth-provider";
import Header from "./header";
import PlatformHeader from "./PlatformHeader";

export default function HeaderSwitcher() {
  const { tier } = useAuth();

  if (tier === "platform") {
    return <PlatformHeader />;
  }

  return <Header />;
}
