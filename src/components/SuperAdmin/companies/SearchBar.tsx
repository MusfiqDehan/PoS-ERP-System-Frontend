"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search companies...",
}: Props) {
  const [local, setLocal] = useState(value);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setLocal(value);
  }, [value]);

  function handleChange(v: string) {
    setLocal(v);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => onChange(v), 300);
  }

  return (
    <div className="relative w-full max-w-[320px]">
      <i className="ti ti-search absolute left-3 top-1/2 -translate-y-1/2 text-[16px] text-[#94A3B8] pointer-events-none" />
      <input
        type="text"
        placeholder={placeholder}
        value={local}
        onChange={(e) => handleChange(e.target.value)}
        className="w-full h-[38px] pl-9 pr-4 rounded-[10px] border border-[#E2E8F0] bg-white text-[13px] text-[#0F172A] placeholder:text-[#94A3B8] outline-none focus:border-[#0ac79e] focus:ring-1 focus:ring-[#0ac79e]/20 transition-all"
      />
    </div>
  );
}
