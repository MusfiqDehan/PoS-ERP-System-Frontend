"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";

import { demoData } from "@/data/demo";
import { MarketingPhoneInput } from "@/components/marketing/ui/MarketingPhoneInput";

function FieldLabel({
  label,
  required = false,
}: Readonly<{ label: string; required?: boolean }>) {
  return (
    <label className="text-[16px]! font-medium leading-[normal]! tracking-[-0.5px] text-[#212121]">
      {label}
      {required ? <span className="text-[#FA0C00]"> *</span> : null}
    </label>
  );
}

const inputClassName =
  "w-full rounded-[4px] border border-solid border-[#F1F1F1] bg-white px-4 py-[15px] text-[16px]! font-normal leading-[normal]! tracking-[-0.5px] text-[#212121] placeholder:text-[#666666] focus:border-[#089B7C] focus:outline-none";

export function DemoForm() {
  const { form } = demoData;

  return (
    <div className="w-full rounded-[8px] border border-solid border-[#F5F5F5] bg-[#F8F8F8] p-5 shadow-[0_4px_24px_rgba(0,0,0,0.04)] sm:p-6 md:p-8">
      <div className="mb-6 flex flex-col gap-4 md:mb-8">
        <h2 className="mb-0 text-[24px]! font-semibold capitalize leading-[normal]! text-[#212121] sm:text-[28px]! md:text-[32px]!">
          {form.title}
        </h2>
        <p className="mb-0 text-[16px]! font-normal leading-[1.5]! text-[#666666]">
          {form.subtitle}
        </p>
      </div>

      <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <FieldLabel label="First Name" required />
            <input
              type="text"
              placeholder={form.fields.firstName.placeholder}
              className={inputClassName}
              autoComplete="given-name"
            />
          </div>
          <div className="flex flex-col gap-2">
            <FieldLabel label="Last Name" required />
            <input
              type="text"
              placeholder={form.fields.lastName.placeholder}
              className={inputClassName}
              autoComplete="family-name"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <FieldLabel label="Company" required />
            <input
              type="text"
              placeholder={form.fields.company.placeholder}
              className={inputClassName}
              autoComplete="organization"
            />
          </div>
          <div className="flex flex-col gap-2">
            <FieldLabel label="Company Size" />
            <div className="relative">
              <select
                defaultValue=""
                className={`${inputClassName} appearance-none pr-10 text-[#666666]`}
              >
                <option value="" disabled>
                  {form.fields.companySize.placeholder}
                </option>
                {form.fields.companySize.options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-5 -translate-y-1/2 text-[#666666]" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <FieldLabel label="Job Role" required />
            <div className="relative">
              <select
                defaultValue=""
                className={`${inputClassName} appearance-none pr-10 text-[#666666]`}
              >
                <option value="" disabled>
                  {form.fields.jobRole.placeholder}
                </option>
                {form.fields.jobRole.options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-5 -translate-y-1/2 text-[#666666]" />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <FieldLabel label="Work Email" required />
            <input
              type="email"
              placeholder={form.fields.workEmail.placeholder}
              className={inputClassName}
              autoComplete="email"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <FieldLabel label="Country / Region" required />
            <div className="relative">
              <select
                defaultValue="Bangladesh"
                className={`${inputClassName} appearance-none pr-10`}
              >
                {form.fields.country.options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-5 -translate-y-1/2 text-[#666666]" />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <FieldLabel label="Phone Number" required />
            <MarketingPhoneInput />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <FieldLabel label="Note" />
          <textarea
            rows={5}
            placeholder={form.fields.note.placeholder}
            className={`${inputClassName} min-h-[120px] resize-none py-3`}
          />
        </div>

        <div className="flex items-start gap-1 pt-1">
          <input
            type="checkbox"
            id="demo-marketing"
            className="mt-0.5 size-6 shrink-0 rounded border-[#F1F1F1] text-[#089B7C] focus:ring-[#089B7C]"
          />
          <label
            htmlFor="demo-marketing"
            className="text-[14px]! font-normal leading-[normal]! text-[#666666]"
          >
            {form.checkboxText}
          </label>
        </div>

        <p className="mb-0 text-[14px]! font-normal leading-[normal]! text-[#666666]">
          {form.privacyText}
          <Link href={form.privacyHref} className="text-[#089B7C] underline">
            {form.privacyLinkText}
          </Link>
          .
        </p>

        <button
          type="submit"
          className="mt-2 w-full rounded-[4px] bg-[#089B7C] px-5 py-[14px] text-[16px]! font-medium leading-[normal]! text-white transition-colors hover:bg-[#07886E]"
        >
          {form.submitButton}
        </button>
      </form>
    </div>
  );
}
