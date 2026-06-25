"use client";

import { useId } from "react";
import Select, { type Props as ReactSelectProps } from "react-select";
import type { SelectOption } from "./types";

export type SelectInputProps = {
  options: SelectOption[];
  placeholder?: string;
  selectClassName?: string;
  classNamePrefix?: string;
} & Pick<
  ReactSelectProps<SelectOption, false>,
  "value" | "onChange" | "isDisabled" | "name"
>;

export default function SelectInput({
  options,
  placeholder = "Choose",
  selectClassName = "react-select",
  classNamePrefix = "react-select",
  ...selectProps
}: SelectInputProps) {
  // react-select derives element ids from an auto-incrementing counter that
  // diverges between the server and client render, causing hydration
  // mismatches. A stable `instanceId` from useId() (identical on both sides)
  // makes the generated ids deterministic and removes the mismatch.
  const instanceId = useId();

  return (
    <Select
      instanceId={instanceId}
      className={selectClassName}
      classNamePrefix={classNamePrefix}
      options={options}
      placeholder={placeholder}
      {...selectProps}
    />
  );
}
