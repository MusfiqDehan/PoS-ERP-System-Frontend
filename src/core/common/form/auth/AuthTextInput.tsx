import type { InputHTMLAttributes } from "react";

export type AuthTextInputProps = {
  inputClassName?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "className">;

export default function AuthTextInput({
  inputClassName = "",
  type = "text",
  ...inputProps
}: AuthTextInputProps) {
  return (
    <input
      type={type}
      className={`auth-form-field__input${inputClassName ? ` ${inputClassName}` : ""}`}
      {...inputProps}
    />
  );
}
