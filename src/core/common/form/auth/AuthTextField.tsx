"use client";

import type { InputHTMLAttributes } from "react";
import AuthFormField from "./AuthFormField";
import AuthTextInput from "./AuthTextInput";

export type AuthTextFieldProps = {
  label: string;
  required?: boolean;
  id?: string;
  className?: string;
  inputClassName?: string;
  value: string;
  onChange: (value: string) => void;
} & Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "className" | "id" | "value" | "onChange" | "type"
> & {
  type?: InputHTMLAttributes<HTMLInputElement>["type"];
};

export default function AuthTextField({
  label,
  required = false,
  id,
  className,
  inputClassName,
  value,
  onChange,
  type = "text",
  ...inputProps
}: AuthTextFieldProps) {
  return (
    <AuthFormField label={label} required={required} htmlFor={id} className={className}>
      <AuthTextInput
        id={id}
        type={type}
        value={value}
        inputClassName={inputClassName}
        onChange={(event) => onChange(event.target.value)}
        {...inputProps}
      />
    </AuthFormField>
  );
}
