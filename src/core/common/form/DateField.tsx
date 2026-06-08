"use client";

import { DatePicker } from "antd";
import type { ReactNode } from "react";
import FormField, { type FormFieldProps } from "./FormField";

export type DateFieldProps = Omit<FormFieldProps, "children"> & {
  placeholder?: string;
  icon?: ReactNode;
};

export default function DateField({
  label,
  required,
  className,
  placeholder = "dd/mm/yyyy",
  icon,
}: DateFieldProps) {
  return (
    <FormField label={label} required={required} className={className}>
      <div className="input-groupicon calender-input">
        {icon}
        <DatePicker
          className="form-control datetimepicker"
          placeholder={placeholder}
        />
      </div>
    </FormField>
  );
}
