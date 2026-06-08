"use client";

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
  return (
    <Select
      className={selectClassName}
      classNamePrefix={classNamePrefix}
      options={options}
      placeholder={placeholder}
      {...selectProps}
    />
  );
}
