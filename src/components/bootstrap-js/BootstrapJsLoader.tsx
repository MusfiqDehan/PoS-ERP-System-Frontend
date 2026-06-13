"use client";

import dynamic from "next/dynamic";

const BootstrapJs = dynamic(() => import("./bootstrapjs"), { ssr: false });

export default function BootstrapJsLoader() {
  return <BootstrapJs />;
}
