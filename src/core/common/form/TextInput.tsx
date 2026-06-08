"use client";

import type { ButtonHTMLAttributes, InputHTMLAttributes } from "react";

export type TextInputAction = {
  label: string;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  onClick?: () => void;
};

export type TextInputProps = {
  inputClassName?: string;
  action?: TextInputAction;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "className">;

export default function TextInput({
  inputClassName = "",
  action,
  type = "text",
  ...inputProps
}: TextInputProps) {
  const input = (
    <input
      type={type}
      className={`form-control${inputClassName ? ` ${inputClassName}` : ""}`}
      {...inputProps}
    />
  );

  if (!action) {
    return input;
  }

  return (
    <div className="list position-relative">
      {input}
      <button
        type={action.type ?? "button"}
        className="btn btn-primaryadd"
        onClick={action.onClick}
      >
        {action.label}
      </button>
    </div>
  );
}
