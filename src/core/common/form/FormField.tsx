"use client";

import type { ReactNode } from "react";

export type FormFieldProps = {
  label: string;
  required?: boolean;
  className?: string;
  labelWrapperClassName?: string;
  labelAddon?: ReactNode;
  children: ReactNode;
  htmlFor?: string;
};

export default function FormField({
  label,
  required = false,
  className = "mb-3",
  labelWrapperClassName,
  labelAddon,
  children,
  htmlFor,
}: FormFieldProps) {
  const labelNode = (
    <label className="form-label" htmlFor={htmlFor}>
      {label}
      {required && <span className="text-danger ms-1">*</span>}
    </label>
  );

  return (
    <div className={className}>
      {labelWrapperClassName ? (
        <div className={labelWrapperClassName}>
          {labelNode}
          {labelAddon}
        </div>
      ) : (
        <>
          {labelNode}
          {labelAddon}
        </>
      )}
      {children}
    </div>
  );
}
