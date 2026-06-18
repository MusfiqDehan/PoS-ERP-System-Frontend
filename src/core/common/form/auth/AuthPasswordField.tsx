"use client";

import { useState } from "react";
import type { InputHTMLAttributes } from "react";
import AuthFormField from "./AuthFormField";
import AuthTextInput from "./AuthTextInput";
import PasswordVisibilityIcon from "./PasswordVisibilityIcon";

export type AuthPasswordFieldProps = {
  label?: string;
  required?: boolean;
  id?: string;
  className?: string;
  value: string;
  onChange: (value: string) => void;
  isVisible?: boolean;
  onToggleVisibility?: () => void;
  autoComplete?: InputHTMLAttributes<HTMLInputElement>["autoComplete"];
} & Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "className" | "id" | "value" | "onChange" | "type" | "autoComplete"
>;

export default function AuthPasswordField({
  label = "Password",
  required = true,
  id = "auth-password",
  className,
  value,
  onChange,
  isVisible,
  onToggleVisibility,
  autoComplete = "current-password",
  ...inputProps
}: AuthPasswordFieldProps) {
  const [internalVisible, setInternalVisible] = useState(false);
  const passwordVisible = isVisible ?? internalVisible;

  const toggleVisibility = () => {
    if (onToggleVisibility) {
      onToggleVisibility();
      return;
    }

    setInternalVisible((current) => !current);
  };

  return (
    <AuthFormField label={label} required={required} htmlFor={id} className={className}>
      <div className="auth-form-field__control">
        <AuthTextInput
          id={id}
          type={passwordVisible ? "text" : "password"}
          autoComplete={autoComplete}
          value={value}
          inputClassName="auth-form-field__input--with-action"
          onChange={(event) => onChange(event.target.value)}
          {...inputProps}
        />
        <button
          type="button"
          className="auth-form-field__toggle"
          aria-label={passwordVisible ? "Hide password" : "Show password"}
          onClick={toggleVisibility}
        >
          <PasswordVisibilityIcon isVisible={passwordVisible} />
        </button>
      </div>
    </AuthFormField>
  );
}
