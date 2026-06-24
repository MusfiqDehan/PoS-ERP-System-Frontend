"use client";

import { useState } from "react";
import Select from "react-select";

type AddUsersProps = {
  /** Modal element id used by the Bootstrap trigger. */
  id?: string;
};

const roleOptions = [
  { value: "manager", label: "Manager" },
  { value: "admin", label: "Admin" },
  { value: "cashier", label: "Cashier" },
  { value: "accountant", label: "Accountant" },
  { value: "auditor", label: "Auditor" },
];

const selectStyles = {
  control: (base: Record<string, unknown>, state: { isFocused: boolean }) => ({
    ...base,
    minHeight: 42,
    borderRadius: 6,
    borderColor: state.isFocused ? "#089b7c" : "#e7e7e7",
    boxShadow: "none",
    fontSize: 14,
    "&:hover": { borderColor: "#089b7c" },
  }),
  option: (
    base: Record<string, unknown>,
    state: { isSelected: boolean; isFocused: boolean },
  ) => ({
    ...base,
    fontSize: 14,
    backgroundColor: state.isSelected
      ? "#089b7c"
      : state.isFocused
        ? "#e7fbf7"
        : "#fff",
    color: state.isSelected ? "#fff" : "#333333",
  }),
};

const fieldClass =
  "w-full rounded-[6px] border border-[#e7e7e7] px-[12px] py-[10px] text-[14px] leading-normal text-[#333333] outline-none transition-colors placeholder:text-[#999999] focus:border-[#089b7c]";
const labelClass =
  "mb-[6px] block text-[14px] font-medium leading-normal text-[#333333]";

const AddUsers = ({ id = "add-units" }: AddUsersProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div>
      {/* Add User */}
      <div className="modal fade" id={id}>
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content overflow-hidden rounded-[10px] border-0">
            <div className="flex items-center justify-between border-b border-[#e7e7e7] px-[24px] py-[16px]">
              <div>
                <h4 className="m-0 text-[18px] font-semibold leading-normal text-[#333333]">
                  Add User
                </h4>
                <p className="mt-[4px] mb-0 text-[13px] font-normal leading-normal text-[#666666]">
                  Invite a member and assign them a role.
                </p>
              </div>
              <button
                type="button"
                data-bs-dismiss="modal"
                aria-label="Close"
                className="flex h-[30px] w-[30px] items-center justify-center rounded-full text-[#666666] transition-colors hover:bg-[#f1f1f1]"
              >
                <i className="ti ti-x text-[18px] leading-none" />
              </button>
            </div>

            <form>
              <div className="px-[24px] py-[20px]">
                <div className="mb-[18px] flex items-center gap-[16px]">
                  <span className="flex h-[64px] w-[64px] shrink-0 items-center justify-center rounded-full bg-[#f1fcf5] text-[#089b7c]">
                    <i className="ti ti-camera text-[24px] leading-none" />
                  </span>
                  <label className="cursor-pointer">
                    <span className="inline-flex items-center gap-[6px] rounded-[6px] border border-[#089b7c] px-[14px] py-[8px] text-[14px] font-medium leading-normal text-[#089b7c] transition-colors hover:bg-[#f1fcf5]">
                      <i className="ti ti-upload text-[16px] leading-none" />
                      Upload Photo
                    </span>
                    <input type="file" accept="image/*" className="hidden" />
                  </label>
                </div>

                <div className="grid grid-cols-1 gap-[16px] sm:grid-cols-2">
                  <div>
                    <label className={labelClass}>User Name</label>
                    <input type="text" placeholder="Enter user name" className={fieldClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Phone</label>
                    <input type="text" placeholder="Enter phone number" className={fieldClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Email</label>
                    <input type="email" placeholder="name@example.com" className={fieldClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Role</label>
                    <Select
                      classNamePrefix="react-select"
                      options={roleOptions}
                      placeholder="Choose role"
                      styles={selectStyles}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter password"
                        className={`${fieldClass} pr-[40px]`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        className="absolute right-[12px] top-1/2 -translate-y-1/2 text-[#666666]"
                      >
                        <i className={`ti ${showPassword ? "ti-eye" : "ti-eye-off"} text-[16px] leading-none`} />
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Confirm Password</label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Re-enter password"
                        className={`${fieldClass} pr-[40px]`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword((v) => !v)}
                        aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                        className="absolute right-[12px] top-1/2 -translate-y-1/2 text-[#666666]"
                      >
                        <i className={`ti ${showConfirmPassword ? "ti-eye" : "ti-eye-off"} text-[16px] leading-none`} />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-[16px]">
                  <label className={labelClass}>Description</label>
                  <textarea
                    rows={3}
                    placeholder="Add a short note about this user"
                    className={`${fieldClass} resize-none`}
                  />
                  <p className="mt-[6px] mb-0 text-[12px] font-normal leading-normal text-[#999999]">
                    Maximum 600 characters
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-[8px] border-t border-[#e7e7e7] px-[24px] py-[16px]">
                <button
                  type="button"
                  data-bs-dismiss="modal"
                  className="rounded-[6px] border border-[#e7e7e7] px-[16px] py-[9px] text-[14px] font-medium leading-normal text-[#666666] transition-colors hover:bg-[#f6f6f6]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  data-bs-dismiss="modal"
                  className="rounded-[6px] bg-[#089b7c] px-[16px] py-[9px] text-[14px] font-medium leading-normal text-white transition-colors hover:bg-[#06866b]"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* /Add User */}
    </div>
  );
};

export default AddUsers;
