import type { ReactNode } from "react";

export type AuthFormFieldProps = {
  label: string;
  required?: boolean;
  htmlFor?: string;
  className?: string;
  children: ReactNode;
};

export default function AuthFormField({
  label,
  required = false,
  htmlFor,
  className = "",
  children,
}: AuthFormFieldProps) {
  return (
    <div className={`auth-form-field${className ? ` ${className}` : ""}`}>
      <label className="auth-form-field__label" htmlFor={htmlFor}>
        {label}
        {required && <span className="auth-form-field__required"> *</span>}
      </label>
      {children}
    </div>
  );
}
