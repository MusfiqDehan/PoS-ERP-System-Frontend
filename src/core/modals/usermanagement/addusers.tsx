"use client";

import { useState, useEffect, type FormEvent } from "react";
import { inviteTenantUser, type InviteUserPayload } from "@/lib/roles";
import { getAccessToken } from "@/lib/auth-session";

type AddUsersProps = {
  id?: string;
  preselectedRole?: { slug: string; name: string } | null;
  onSuccess?: () => void;
};

const field =
  "w-full rounded-[6px] border border-[#e7e7e7] px-[12px] py-[10px] text-[14px] leading-normal text-[#333333] outline-none transition-colors placeholder:text-[#999999] focus:border-[#089b7c]";
const fieldErr =
  "w-full rounded-[6px] border border-[#dc3545] px-[12px] py-[10px] text-[14px] leading-normal text-[#333333] outline-none";
const label = "mb-[6px] block text-[14px] font-medium leading-normal text-[#333333]";
const err = "mt-[4px] text-[12px] leading-normal text-[#dc3545]";

export default function AddUsers({
  id = "add-units",
  preselectedRole,
  onSuccess,
}: AddUsersProps) {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [showPw2, setShowPw2] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string | null>>({});
  const [success, setSuccess] = useState(false);

  /* Reset on open */
  useEffect(() => {
    const el = document.getElementById(id);
    if (!el) return;
    const reset = () => {
      setFullName("");
      setPhone("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setShowPw(false);
      setShowPw2(false);
      setSubmitting(false);
      setApiError(null);
      setFieldErrors({});
      setSuccess(false);
    };
    el.addEventListener("show.bs.modal", reset);
    return () => el.removeEventListener("show.bs.modal", reset);
  }, [id]);

  function validate(): boolean {
    const fe: Record<string, string | null> = {};
    if (!email.trim()) fe.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      fe.email = "Enter a valid email.";
    if (!password) fe.password = "Password is required.";
    else if (password.length < 8) fe.password = "At least 8 characters.";
    if (password && confirmPassword !== password)
      fe.confirmPassword = "Passwords do not match.";
    setFieldErrors(fe);
    return Object.keys(fe).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setApiError(null);
    if (!validate()) return;

    const token = getAccessToken();
    if (!token) {
      setApiError("You must be logged in.");
      return;
    }

    const payload: InviteUserPayload = { email: email.trim(), password };
    if (fullName.trim()) payload.full_name = fullName.trim();
    if (phone.trim()) payload.phone = phone.trim();
    if (preselectedRole?.slug) payload.role_slug = preselectedRole.slug;

    setSubmitting(true);
    try {
      const result = await inviteTenantUser(payload, token);
      if (result.ok && result.body.success) {
        setSuccess(true);
        onSuccess?.();
        setTimeout(() => {
          const el = document.getElementById(id);
          if (!el) return;
          const modal = (window as any).bootstrap?.Modal?.getInstance?.(el);
          if (modal) modal.hide();
          else {
            el.classList.remove("show");
            el.style.display = "none";
            document.body.classList.remove("modal-open");
            document.querySelector(".modal-backdrop")?.remove();
          }
        }, 1500);
      } else {
        const msg = result.body?.message || "Failed to invite user.";
        setApiError(msg);
        if (result.body.errors && typeof result.body.errors === "object") {
          const se: Record<string, string | null> = {};
          for (const [k, v] of Object.entries(result.body.errors)) {
            se[k] = Array.isArray(v) ? v[0] : String(v);
          }
          setFieldErrors((p) => ({ ...p, ...se }));
        }
      }
    } catch {
      setApiError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <div className="modal fade" id={id}>
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content overflow-hidden rounded-[10px] border-0">
            {/* Header */}
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

            <form onSubmit={handleSubmit}>
              <div className="px-[24px] py-[20px]">
                {/* Photo upload (optional, cosmetic) */}
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

                {success && (
                  <div className="mb-[16px] rounded-[6px] bg-[#f1fcf5] px-[14px] py-[10px] text-[14px] leading-normal text-[#089b7c]">
                    User invited successfully.
                  </div>
                )}
                {apiError && !success && (
                  <div className="mb-[16px] rounded-[6px] bg-[#fff5f5] px-[14px] py-[10px] text-[14px] leading-normal text-[#dc3545]">
                    {apiError}
                  </div>
                )}

                <div className="grid grid-cols-1 gap-[16px] sm:grid-cols-2">
                  {/* Full Name (optional) */}
                  <div>
                    <label className={label}>Full Name</label>
                    <input
                      type="text"
                      placeholder="Enter full name (optional)"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className={fieldErrors.full_name ? fieldErr : field}
                    />
                    {fieldErrors.full_name && <p className={err}>{fieldErrors.full_name}</p>}
                  </div>

                  {/* Phone (optional) */}
                  <div>
                    <label className={label}>Phone</label>
                    <input
                      type="text"
                      placeholder="Enter phone (optional)"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={fieldErrors.phone ? fieldErr : field}
                    />
                    {fieldErrors.phone && <p className={err}>{fieldErrors.phone}</p>}
                  </div>

                  {/* Email (required) */}
                  <div>
                    <label className={label}>
                      Email <span className="text-[#dc3545]">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={fieldErrors.email ? fieldErr : field}
                    />
                    {fieldErrors.email && <p className={err}>{fieldErrors.email}</p>}
                  </div>

                  {/* Role (read-only preselected) */}
                  <div>
                    <label className={label}>Role</label>
                    <div className={`${field} flex items-center gap-[8px] bg-[#f9f9f9]`}>
                      <i className="ti ti-shield text-[16px] text-[#666666]" />
                      <span className="text-[14px] font-medium text-[#333333]">
                        {preselectedRole?.name ?? "Not selected"}
                      </span>
                      {preselectedRole ? (
                        <span className="ml-auto rounded-[3px] bg-[#e7fbf7] px-[6px] py-[1px] text-[11px] font-medium text-[#089b7c]">
                          Pre-selected
                        </span>
                      ) : (
                        <span className="ml-auto text-[12px] text-[#999999]">
                          Click a role card
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Password (required) */}
                  <div>
                    <label className={label}>
                      Password <span className="text-[#dc3545]">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showPw ? "text" : "password"}
                        placeholder="Enter password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`${fieldErrors.password ? fieldErr : field} pr-[40px]`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPw((v) => !v)}
                        aria-label={showPw ? "Hide password" : "Show password"}
                        className="absolute right-[12px] top-1/2 -translate-y-1/2 text-[#666666]"
                      >
                        <i className={`ti ${showPw ? "ti-eye" : "ti-eye-off"} text-[16px] leading-none`} />
                      </button>
                    </div>
                    {fieldErrors.password && <p className={err}>{fieldErrors.password}</p>}
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className={label}>
                      Confirm Password <span className="text-[#dc3545]">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showPw2 ? "text" : "password"}
                        placeholder="Re-enter password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className={`${fieldErrors.confirmPassword ? fieldErr : field} pr-[40px]`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPw2((v) => !v)}
                        aria-label={showPw2 ? "Hide password" : "Show password"}
                        className="absolute right-[12px] top-1/2 -translate-y-1/2 text-[#666666]"
                      >
                        <i className={`ti ${showPw2 ? "ti-eye" : "ti-eye-off"} text-[16px] leading-none`} />
                      </button>
                    </div>
                    {fieldErrors.confirmPassword && <p className={err}>{fieldErrors.confirmPassword}</p>}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end gap-[8px] border-t border-[#e7e7e7] px-[24px] py-[16px]">
                <button
                  type="button"
                  data-bs-dismiss="modal"
                  disabled={submitting}
                  className="rounded-[6px] border border-[#e7e7e7] px-[16px] py-[9px] text-[14px] font-medium leading-normal text-[#666666] transition-colors hover:bg-[#f6f6f6] disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-[6px] bg-[#089b7c] px-[16px] py-[9px] text-[14px] font-medium leading-normal text-white transition-colors hover:bg-[#06866b] disabled:opacity-50"
                >
                  {submitting ? (
                    <span className="inline-flex items-center gap-[6px]">
                      <span className="h-[14px] w-[14px] animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Inviting…
                    </span>
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
