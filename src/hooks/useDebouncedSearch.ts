"use client";

import { useState } from "react";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";

export function useDebouncedSearch(initial = "", delayMs = 300) {
  const [value, setValue] = useState(initial);
  const debouncedValue = useDebouncedValue(value, delayMs);

  return { value, setValue, debouncedValue };
}
