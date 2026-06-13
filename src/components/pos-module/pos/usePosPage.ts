"use client";

import { useEffect, useState } from "react";

export function usePosPage() {
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    document.body.classList.add("pos-page");

    return () => {
      document.body.classList.remove("pos-page");
    };
  }, []);

  return {
    activeTab,
    setActiveTab,
  };
}
