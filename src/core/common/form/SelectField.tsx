"use client";

import FormField, { type FormFieldProps } from "./FormField";
import SelectInput, { type SelectInputProps } from "./SelectInput";

export type SelectFieldProps = Omit<FormFieldProps, "children"> & SelectInputProps;

export default function SelectField({
  label,
  required,
  className,
  labelWrapperClassName,
  labelAddon,
  options,
  placeholder,
  selectClassName,
  classNamePrefix,
  value,
  onChange,
  isDisabled,
  name,
}: SelectFieldProps) {
  return (
    <FormField
      label={label}
      required={required}
      className={className}
      labelWrapperClassName={labelWrapperClassName}
      labelAddon={labelAddon}
    >
      <SelectInput
        options={options}
        placeholder={placeholder}
        selectClassName={selectClassName}
        classNamePrefix={classNamePrefix}
        value={value}
        onChange={onChange}
        isDisabled={isDisabled}
        name={name}
      />
    </FormField>
  );
}
