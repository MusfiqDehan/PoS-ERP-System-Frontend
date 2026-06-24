"use client";

import { useState } from "react";
import {
  ACCESS_LEVELS,
  ACCESS_LEVEL_KEYS,
  type AccessLevel,
} from "./permissionsMatrixData";

type AccessSelectProps = {
  defaultLevel: AccessLevel;
  /** Notifies the parent when the access level changes (for save/validation). */
  onLevelChange?: (level: AccessLevel) => void;
};

export default function AccessSelect({
  defaultLevel,
  onLevelChange,
}: AccessSelectProps) {
  const [level, setLevel] = useState<AccessLevel>(defaultLevel);

  return (
    <div className="relative">
      <select
        value={level}
        onChange={(e) => {
          const next = e.target.value as AccessLevel;
          setLevel(next);
          onLevelChange?.(next);
        }}
        className="h-[26px] w-full appearance-none rounded-[2px] border border-[#e7e7e7] bg-white pl-3 pr-7 text-sm font-medium leading-normal text-[#666666]"
      >
        {ACCESS_LEVEL_KEYS.map((key) => (
          <option key={key} value={key}>
            {ACCESS_LEVELS[key].label}
          </option>
        ))}
      </select>
      <i className="ti ti-chevron-down pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-base leading-none text-[#666666]" />
    </div>
  );
}
