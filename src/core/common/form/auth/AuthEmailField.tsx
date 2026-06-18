"use client";

import type { InputHTMLAttributes } from "react";
import AuthFormField from "./AuthFormField";
import AuthTextInput from "./AuthTextInput";

export type AuthEmailFieldProps = {
  label?: string;
  required?: boolean;
  id?: string;
  className?: string;
  value: string;
  onChange: (value: string) => void;
  autoComplete?: InputHTMLAttributes<HTMLInputElement>["autoComplete"];
} & Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "className" | "id" | "value" | "onChange" | "type" | "autoComplete"
>;

export default function AuthEmailField({
  label = "Email",
  required = true,
  id = "auth-email",
  className,
  value,
  onChange,
  autoComplete = "email",
  ...inputProps
}: AuthEmailFieldProps) {
  return (
    <AuthFormField label={label} required={required} htmlFor={id} className={className}>
      <AuthTextInput
        id={id}
        type="email"
        autoComplete={autoComplete}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        {...inputProps}
      />
    </AuthFormField>
  );
}
