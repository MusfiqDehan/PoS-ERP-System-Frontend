"use client";

import FormField, { type FormFieldProps } from "./FormField";
import TextInput, { type TextInputProps } from "./TextInput";

export type TextFieldProps = Omit<FormFieldProps, "children"> &
  TextInputProps & {
    id?: string;
  };

export default function TextField({
  label,
  required,
  className,
  labelWrapperClassName,
  labelAddon,
  id,
  inputClassName,
  action,
  ...inputProps
}: TextFieldProps) {
  return (
    <FormField
      label={label}
      required={required}
      className={className}
      labelWrapperClassName={labelWrapperClassName}
      labelAddon={labelAddon}
      htmlFor={id}
    >
      <TextInput
        id={id}
        inputClassName={inputClassName}
        action={action}
        {...inputProps}
      />
    </FormField>
  );
}
