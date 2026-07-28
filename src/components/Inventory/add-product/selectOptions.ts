import type { SelectOption } from "@/core/common/form/types";

export const sellingTypeOptions: SelectOption[] = [
  { value: "retail", label: "Retail" },
  { value: "wholesale", label: "Wholesale" },
];

export const barcodeSymbolOptions: SelectOption[] = [
  { value: "code128", label: "Code 128" },
  { value: "ean13", label: "EAN-13" },
  { value: "upca", label: "UPC-A" },
];

export const taxTypeOptions: SelectOption[] = [
  { value: "exclusive", label: "Exclusive" },
  { value: "inclusive", label: "Inclusive" },
  { value: "none", label: "None" },
];

export const discountTypeOptions: SelectOption[] = [
  { value: "", label: "Choose" },
  { value: "percentage", label: "Percentage" },
  { value: "cash", label: "Cash" },
];

export const warrantyOptions: SelectOption[] = [
  { value: "", label: "Choose" },
];
