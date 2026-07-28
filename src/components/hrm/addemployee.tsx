"use client";
import { all_routes } from "@/data/all_routes";
import { DatePicker } from "antd";
import { ArrowLeft, Calendar, PlusCircle } from "react-feather";
import Link from "next/link";
import { useState, useEffect } from "react";
import Select from "react-select";
import DefaultEditor from "react-simple-wysiwyg";

/* ── reusable style fragments (Tailwind atomic classes, no Bootstrap) ─── */
const labelCls = "mb-[6px] block text-[14px] font-medium leading-normal text-[#333333]";
const inputCls = "w-full rounded-[6px] border border-[#e0e0e0] px-[12px] py-[10px] text-[14px] leading-normal text-[#333333] outline-none transition-colors placeholder:text-[#999999] focus:border-[#089b7c]";
const sectionCard = "rounded-[12px] border border-[#f0f0f0] bg-white p-[24px]";
const sectionTitle = "flex items-center gap-[10px] text-[16px] font-semibold leading-normal text-[#333333]";
const sectionIcon = "text-[#089b7c] text-[18px] leading-none";
const grid3 = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[16px]";
const grid4 = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[16px]";
const asterisk = <span className="text-[#dc3545] ml-[2px]">*</span>;

export default function AddEmployeeComponent() {
  const route = all_routes;

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const [passwordVisibility, setPasswordVisibility] = useState<{ password: boolean; confirmPassword: boolean }>({
    password: false,
    confirmPassword: false,
  });

  function togglePasswordVisibility(field: keyof typeof passwordVisibility) {
    setPasswordVisibility(function(prev) {
      const next = { ...prev };
      next[field] = !prev[field];
      return next;
    });
  }

  const [values, setValue] = useState<string | undefined>();
  function onChange(e: any) {
    setValue(e.target.value);
  }

  const gender = [
    { value: "Choose", label: "Choose" },
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
  ];
  const nationality = [
    { value: "Choose", label: "Choose" },
    { value: "United Kingdom", label: "United Kingdom" },
    { value: "India", label: "India" },
  ];
  const Shift = [
    { value: "Choose", label: "Choose" },
    { value: "Regular", label: "Regular" },
  ];
  const departments = [
    { value: "Choose", label: "Choose" },
    { value: "UI/UX", label: "UI/UX" },
    { value: "Support", label: "Support" },
    { value: "HR", label: "HR" },
    { value: "Engineering", label: "Engineering" },
  ];
  const designation = [
    { value: "Choose", label: "Choose" },
    { value: "Designer", label: "Designer" },
    { value: "Developer", label: "Developer" },
    { value: "Tester", label: "Tester" },
  ];
  const bloodgroup = [
    { value: "Select", label: "Select" },
    { value: "A+", label: "A+" },
    { value: "A-", label: "A-" },
    { value: "B+", label: "B+" },
    { value: "B-", label: "B-" },
    { value: "O+", label: "O+" },
    { value: "O-", label: "O-" },
    { value: "AB+", label: "AB+" },
    { value: "AB-", label: "AB-" },
  ];
  const country = [
    { value: "Choose", label: "Choose" },
    { value: "United Kingdom", label: "United Kingdom" },
    { value: "USA", label: "USA" },
  ];
  const state = [
    { value: "Choose", label: "Choose" },
    { value: "California", label: "California" },
    { value: "Paris", label: "Paris" },
  ];
  const city = [
    { value: "Choose", label: "Choose" },
    { value: "Los Angeles", label: "Los Angeles" },
    { value: "New Jersey", label: "New Jersey" },
  ];

  if (!mounted) {
    return (
      <div className="py-10 text-center text-[14px] text-[#646B72]">
        Loading form…
      </div>
    );
  }

  return (
    <div className="ml-0 pt-[65px] lg:ml-[252px]">
      <div className="px-[24px] py-[24px] space-y-[24px]">

      {/* ── Page header ── */}
      <div className="flex flex-wrap items-center justify-between gap-[12px]">
        <div>
          <h4 className="m-0 text-[22px] font-semibold leading-normal text-[#333333]">Add Employee</h4>
          <p className="mt-[4px] mb-0 text-[14px] font-normal leading-normal text-[#666666]">
            Create new Employee
          </p>
        </div>
        <Link
          href={route.employeelist}
          className="inline-flex items-center gap-[6px] rounded-[6px] border border-[#e0e0e0] px-[16px] py-[9px] text-[14px] font-medium leading-normal text-[#666666] transition-colors hover:bg-[#f6f6f6]"
        >
          <ArrowLeft size={16} />
          Back to List
        </Link>
      </div>

      <form className="space-y-[20px]">

        {/* ═══ EMPLOYEE INFORMATION ═══ */}
        <div className={sectionCard}>
          <div className="flex items-center gap-[10px] mb-[20px] pb-[16px] border-b border-[#f0f0f0]">
            <i className={`ti ti-users ${sectionIcon}`} />
            <span className={sectionTitle}>Employee Information</span>
          </div>

          {/* Profile photo */}
          <div className="flex items-center gap-[24px] mb-[24px]">
            <div className="flex h-[120px] w-[120px] shrink-0 items-center justify-center rounded-[10px] border border-dashed border-[#b0b0b0] flex-col text-[#999999] text-[13px]">
              <PlusCircle size={16} className="mb-[4px] text-[#999999]" />
              Profile Photo
            </div>
            <div>
              <input
                type="file"
                className="block w-full text-[13px] text-[#666666]
                  file:mr-[12px] file:rounded-[6px] file:border-0 file:bg-[#089b7c] file:px-[14px] file:py-[8px] file:text-[13px] file:font-medium file:text-white file:cursor-pointer
                  hover:file:bg-[#06866b]"
              />
            </div>
          </div>

          <div className={grid3}>
            {/* First Name */}
            <div>
              <label className={labelCls}>First Name{asterisk}</label>
              <input type="text" className={inputCls} placeholder="Enter first name" />
            </div>

            {/* Last Name */}
            <div>
              <label className={labelCls}>Last Name{asterisk}</label>
              <input type="text" className={inputCls} placeholder="Enter last name" />
            </div>

            {/* Email */}
            <div>
              <label className={labelCls}>Email{asterisk}</label>
              <input type="email" className={inputCls} placeholder="Enter email" />
            </div>

            {/* Contact Number */}
            <div>
              <label className={labelCls}>Contact Number{asterisk}</label>
              <input type="text" className={inputCls} placeholder="Enter contact number" />
            </div>

            {/* Emp Code */}
            <div>
              <label className={labelCls}>Emp Code{asterisk}</label>
              <input type="text" className={inputCls} placeholder="Enter employee code" />
            </div>

            {/* Date of Birth */}
            <div>
              <label className={labelCls}>Date of Birth{asterisk}</label>
              <div className="relative">
                <Calendar size={14} className="absolute left-[12px] top-[50%] translate-y-[-50%] text-[#999999]" />
                <DatePicker
                  className="w-full rounded-[6px] border border-[#e0e0e0] px-[12px] py-[10px] pl-[36px] text-[14px] leading-normal text-[#333333] outline-none transition-colors focus:border-[#089b7c] [&_.ant-picker-input_>input]:text-[14px]"
                  placeholder="dd/mm/yyyy"
                />
              </div>
            </div>

            {/* Gender */}
            <div>
              <label className={labelCls}>Gender{asterisk}</label>
              <Select classNamePrefix="react-select" options={gender} placeholder="Choose" />
            </div>

            {/* Nationality */}
            <div>
              <label className={labelCls}>Nationality{asterisk}</label>
              <Select classNamePrefix="react-select" options={nationality} placeholder="Choose" />
            </div>

            {/* Joining Date */}
            <div>
              <label className={labelCls}>Joining Date{asterisk}</label>
              <div className="relative">
                <Calendar size={14} className="absolute left-[12px] top-[50%] translate-y-[-50%] text-[#999999]" />
                <DatePicker
                  className="w-full rounded-[6px] border border-[#e0e0e0] px-[12px] py-[10px] pl-[36px] text-[14px] leading-normal text-[#333333] outline-none transition-colors focus:border-[#089b7c] [&_.ant-picker-input_>input]:text-[14px]"
                  placeholder="dd/mm/yyyy"
                />
              </div>
            </div>

            {/* Shift */}
            <div>
              <div className="flex items-center justify-between mb-[6px]">
                <label className="text-[14px] font-medium leading-normal text-[#333333]">Shift{asterisk}</label>
                <Link href="#" className="text-[13px] font-medium text-[#089b7c] hover:underline">
                  + Add new
                </Link>
              </div>
              <Select classNamePrefix="react-select" options={Shift} placeholder="Choose" />
            </div>

            {/* Department */}
            <div>
              <label className={labelCls}>Department{asterisk}</label>
              <Select classNamePrefix="react-select" options={departments} placeholder="Choose" />
            </div>

            {/* Designation */}
            <div>
              <label className={labelCls}>Designation{asterisk}</label>
              <Select classNamePrefix="react-select" options={designation} placeholder="Choose" />
            </div>

            {/* Blood Group */}
            <div>
              <label className={labelCls}>Blood Group{asterisk}</label>
              <Select classNamePrefix="react-select" options={bloodgroup} placeholder="Select" />
            </div>
          </div>

          {/* About editor */}
          <div className="mt-[20px]">
            <label className={labelCls}>About</label>
            <div className="rounded-[6px] border border-[#e0e0e0] overflow-hidden">
              <DefaultEditor value={values} onChange={onChange} />
            </div>
            <p className="mt-[6px] text-[12px] leading-normal text-[#999999]">Maximum 60 Characters</p>
          </div>
        </div>

        {/* ═══ ADDRESS INFORMATION ═══ */}
        <div className={sectionCard}>
          <div className="flex items-center gap-[10px] mb-[20px] pb-[16px] border-b border-[#f0f0f0]">
            <i data-feather="map-pin" className={`${sectionIcon} text-[18px]`} />
            <span className={sectionTitle}>Address Information</span>
          </div>

          <div className={grid3}>
            <div>
              <label className={labelCls}>Address</label>
              <input type="text" className={inputCls} placeholder="Enter address" />
            </div>
            <div>
              <label className={labelCls}>Country</label>
              <Select classNamePrefix="react-select" options={country} placeholder="Choose" />
            </div>
            <div>
              <label className={labelCls}>State</label>
              <Select classNamePrefix="react-select" options={state} placeholder="Choose" />
            </div>
            <div>
              <label className={labelCls}>City</label>
              <Select classNamePrefix="react-select" options={city} placeholder="Choose" />
            </div>
            <div>
              <label className={labelCls}>Zipcode</label>
              <input type="text" className={inputCls} placeholder="Enter zipcode" />
            </div>
          </div>
        </div>

        {/* ═══ EMERGENCY INFORMATION ═══ */}
        <div className={sectionCard}>
          <div className="flex items-center gap-[10px] mb-[20px] pb-[16px] border-b border-[#f0f0f0]">
            <i data-feather="info" className={`${sectionIcon} text-[18px]`} />
            <span className={sectionTitle}>Emergency Information</span>
          </div>

          <div className={grid3}>
            <div>
              <label className={labelCls}>Emergency Contact Number 1</label>
              <input type="text" className={inputCls} placeholder="Enter number" />
            </div>
            <div>
              <label className={labelCls}>Relation</label>
              <input type="text" className={inputCls} placeholder="Enter relation" />
            </div>
            <div>
              <label className={labelCls}>Name</label>
              <input type="text" className={inputCls} placeholder="Enter name" />
            </div>
            <div>
              <label className={labelCls}>Emergency Contact Number 2</label>
              <input type="text" className={inputCls} placeholder="Enter number" />
            </div>
            <div>
              <label className={labelCls}>Relation</label>
              <input type="text" className={inputCls} placeholder="Enter relation" />
            </div>
            <div>
              <label className={labelCls}>Name</label>
              <input type="text" className={inputCls} placeholder="Enter name" />
            </div>
          </div>
        </div>

        {/* ═══ BANK INFORMATION ═══ */}
        <div className={sectionCard}>
          <div className="flex items-center gap-[10px] mb-[20px] pb-[16px] border-b border-[#f0f0f0]">
            <i className={`ti ti-building-bank ${sectionIcon}`} />
            <span className={sectionTitle}>Bank Information</span>
          </div>

          <div className={grid4}>
            <div>
              <label className={labelCls}>Bank Name</label>
              <input type="text" className={inputCls} placeholder="Enter bank name" />
            </div>
            <div>
              <label className={labelCls}>Account Number</label>
              <input type="text" className={inputCls} placeholder="Enter account number" />
            </div>
            <div>
              <label className={labelCls}>IFSC</label>
              <input type="text" className={inputCls} placeholder="Enter IFSC code" />
            </div>
            <div>
              <label className={labelCls}>Branch</label>
              <input type="text" className={inputCls} placeholder="Enter branch" />
            </div>
          </div>
        </div>

        {/* ═══ PASSWORD ═══ */}
        <div className={sectionCard}>
          <div className="flex items-center gap-[10px] mb-[20px] pb-[16px] border-b border-[#f0f0f0]">
            <i data-feather="info" className={`${sectionIcon} text-[18px]`} />
            <span className={sectionTitle}>Password</span>
          </div>

          <div className={grid3}>
            <div>
              <label className={labelCls}>Password {asterisk}</label>
              <div className="relative">
                <input
                  type={passwordVisibility.password ? "text" : "password"}
                  className={`${inputCls} pr-[40px]`}
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  onClick={function() { togglePasswordVisibility("password"); }}
                  className="absolute right-[10px] top-[50%] translate-y-[-50%] cursor-pointer border-0 bg-transparent p-0 text-[16px] text-[#999999] hover:text-[#666]"
                >
                  <i className={`ti ${passwordVisibility.password ? "ti-eye" : "ti-eye-off"}`} />
                </button>
              </div>
            </div>
            <div>
              <label className={labelCls}>Confirm Password {asterisk}</label>
              <div className="relative">
                <input
                  type={passwordVisibility.confirmPassword ? "text" : "password"}
                  className={`${inputCls} pr-[40px]`}
                  placeholder="Confirm password"
                />
                <button
                  type="button"
                  onClick={function() { togglePasswordVisibility("confirmPassword"); }}
                  className="absolute right-[10px] top-[50%] translate-y-[-50%] cursor-pointer border-0 bg-transparent p-0 text-[16px] text-[#999999] hover:text-[#666]"
                >
                  <i className={`ti ${passwordVisibility.confirmPassword ? "ti-eye" : "ti-eye-off"}`} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Submit buttons ── */}
        <div className="flex justify-end gap-[10px] pt-[8px]">
          <button
            type="button"
            className="rounded-[6px] border border-[#e0e0e0] px-[20px] py-[10px] text-[14px] font-medium leading-normal text-[#666666] transition-colors hover:bg-[#f6f6f6]"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-[6px] bg-[#089b7c] px-[20px] py-[10px] text-[14px] font-medium leading-normal text-white transition-colors hover:bg-[#06866b]"
          >
            Add Employee
          </button>
        </div>

      </form>
      </div>
    </div>
  );
}
