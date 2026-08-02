"use client";

import { useState } from "react";
import PhoneInput, { type Value } from "react-phone-number-input";
import "react-phone-number-input/style.css";

import styles from "./MarketingPhoneInput.module.css";

type MarketingPhoneInputProps = Readonly<{
  id?: string;
  className?: string;
}>;

export function MarketingPhoneInput({
  id,
  className = "",
}: MarketingPhoneInputProps) {
  const [value, setValue] = useState<Value>();

  return (
    <div className={`${styles.root} ${className}`.trim()}>
      <PhoneInput
        id={id}
        international
        defaultCountry="BD"
        countryCallingCodeEditable={false}
        value={value}
        onChange={setValue}
        placeholder="Enter phone number"
      />
    </div>
  );
}
