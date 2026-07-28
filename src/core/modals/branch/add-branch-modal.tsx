"use client";

import { useState, useEffect, type FormEvent } from "react";
import { createBranch, type CreateBranchPayload } from "@/lib/branches";
import { getAccessToken } from "@/lib/auth-session";

type Props = {
  id: string;
  show: boolean;
  onCreated: () => void;
  onClose: () => void;
};

const STATUS_OPTIONS = [
  { value: "active", label: "Active" },
  { value: "maintenance", label: "Maintenance" },
  { value: "opening_soon", label: "Opening Soon" },
  { value: "closed", label: "Closed" },
];

const field = "w-full rounded-[6px] border border-[#e7e7e7] px-[12px] py-[10px] text-[14px] leading-normal text-[#333333] outline-none transition-colors placeholder:text-[#999999] focus:border-[#089b7c]";
const fieldErr = "w-full rounded-[6px] border border-[#dc3545] px-[12px] py-[10px] text-[14px] leading-normal text-[#333333] outline-none";
const labelCls = "mb-[6px] block text-[14px] font-medium leading-normal text-[#333333]";
const errCls = "mt-[4px] text-[12px] leading-normal text-[#dc3545]";
const selectCls = "w-full rounded-[6px] border border-[#e7e7e7] px-[12px] py-[10px] text-[14px] leading-normal text-[#333333] outline-none transition-colors focus:border-[#089b7c] bg-white";

export default function AddBranchModal({ id, show, onCreated, onClose }: Props) {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("active");

  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string | null>>({});
  const [success, setSuccess] = useState(false);

  /* Reset whenever modal opens */
  useEffect(() => {
    if (show) {
      setName("");
      setCode("");
      setAddress("");
      setCity("");
      setPhone("");
      setEmail("");
      setDescription("");
      setStatus("active");
      setSubmitting(false);
      setApiError(null);
      setFieldErrors({});
      setSuccess(false);
    }
  }, [show]);

  function validate(): boolean {
    const fe: Record<string, string | null> = {};
    if (!name.trim()) fe.name = "Branch name is required.";
    if (!code.trim()) fe.code = "Branch code is required.";
    else if (code.trim().length < 2) fe.code = "Code must be at least 2 characters.";
    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      fe.email = "Enter a valid email.";
    setFieldErrors(fe);
    return Object.keys(fe).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setApiError(null);
    if (!validate()) return;

    const token = getAccessToken();
    if (!token) { setApiError("Not authenticated."); return; }

    const payload: CreateBranchPayload = {
      name: name.trim(),
      code: code.trim().toUpperCase(),
    };
    if (address.trim()) payload.address = address.trim();
    if (city.trim()) payload.city = city.trim();
    if (phone.trim()) payload.phone_number = phone.trim();
    if (email.trim()) payload.email = email.trim();
    if (description.trim()) payload.description = description.trim();
    if (status) payload.status = status;

    setSubmitting(true);
    try {
      const result = await createBranch(payload, token);
      if (result.ok && result.body.success) {
        setSuccess(true);
        onCreated();
        setTimeout(() => onClose(), 1200);
      } else {
        const msg = result.body?.message || "Failed to create branch.";
        setApiError(msg);
        if (result.body.errors && typeof result.body.errors === "object") {
          const se: Record<string, string | null> = {};
          for (const [k, v] of Object.entries(result.body.errors)) {
            se[k] = Array.isArray(v) ? String(v[0]) : String(v);
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
    <>
      <div className="modal-backdrop show" style={{ zIndex: 1040 }} onClick={onClose} />
      <div
        className="modal fade show d-block"
        id={id}
        tabIndex={-1}
        role="dialog"
        style={{ zIndex: 1050 }}
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content overflow-hidden rounded-[10px] border-0">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#e7e7e7] px-[24px] py-[16px]">
              <div>
                <h4 className="m-0 text-[18px] font-semibold leading-normal text-[#333333]">
                  Add New Branch
                </h4>
                <p className="mt-[4px] mb-0 text-[13px] font-normal leading-normal text-[#666666]">
                  Fill in the details to create a new branch.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="flex h-[30px] w-[30px] items-center justify-center rounded-full text-[#666666] transition-colors hover:bg-[#f1f1f1]"
              >
                <i className="ti ti-x text-[18px] leading-none" />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="px-[24px] py-[20px] space-y-[16px]">
                {success && (
                  <div className="rounded-[6px] bg-[#f1fcf5] px-[14px] py-[10px] text-[14px] leading-normal text-[#089b7c]">
                    Branch created successfully!
                  </div>
                )}
                {apiError && !success && (
                  <div className="rounded-[6px] bg-[#fff5f5] px-[14px] py-[10px] text-[14px] leading-normal text-[#dc3545]">
                    {apiError}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px]">
                  {/* Name (required) */}
                  <div>
                    <label className={labelCls}>Branch Name <span className="text-[#dc3545]">*</span></label>
                    <input type="text" placeholder="e.g. Mirpur Main Branch"
                      required value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={fieldErrors.name ? fieldErr : field} />
                    {fieldErrors.name && <p className={errCls}>{fieldErrors.name}</p>}
                  </div>

                  {/* Code (required) */}
                  <div>
                    <label className={labelCls}>Branch Code <span className="text-[#dc3545]">*</span></label>
                    <input type="text" placeholder="e.g. MIRPUR01"
                      required value={code}
                      onChange={(e) => setCode(e.target.value.toUpperCase())}
                      className={fieldErrors.code ? fieldErr : field} />
                    {fieldErrors.code && <p className={errCls}>{fieldErrors.code}</p>}
                  </div>

                  {/* Address */}
                  <div>
                    <label className={labelCls}>Address</label>
                    <input type="text" placeholder="Street address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className={fieldErrors.address ? fieldErr : field} />
                    {fieldErrors.address && <p className={errCls}>{fieldErrors.address}</p>}
                  </div>

                  {/* City */}
                  <div>
                    <label className={labelCls}>City</label>
                    <input type="text" placeholder="e.g. Dhaka"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className={fieldErrors.city ? fieldErr : field} />
                    {fieldErrors.city && <p className={errCls}>{fieldErrors.city}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className={labelCls}>Phone</label>
                    <input type="text" placeholder="e.g. +8801XXXXXXXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={fieldErrors.phone_number ? fieldErr : field} />
                    {fieldErrors.phone_number && <p className={errCls}>{fieldErrors.phone_number}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label className={labelCls}>Email</label>
                    <input type="email" placeholder="branch@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={fieldErrors.email ? fieldErr : field} />
                    {fieldErrors.email && <p className={errCls}>{fieldErrors.email}</p>}
                  </div>

                  {/* Status */}
                  <div>
                    <label className={labelCls}>Status</label>
                    <select value={status} onChange={(e) => setStatus(e.target.value)}
                      className={selectCls}>
                      {STATUS_OPTIONS.map((o) => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className={labelCls}>Description</label>
                  <textarea rows={3} placeholder="Brief description of this branch"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className={`${fieldErrors.description ? fieldErr : field} resize-none`} />
                  {fieldErrors.description && <p className={errCls}>{fieldErrors.description}</p>}
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end gap-[8px] border-t border-[#e7e7e7] px-[24px] py-[16px]">
                <button type="button" onClick={onClose} disabled={submitting}
                  className="rounded-[6px] border border-[#e7e7e7] px-[16px] py-[9px] text-[14px] font-medium leading-normal text-[#666666] transition-colors hover:bg-[#f6f6f6] disabled:opacity-50">
                  Cancel
                </button>
                <button type="submit" disabled={submitting}
                  className="rounded-[6px] bg-[#089b7c] px-[16px] py-[9px] text-[14px] font-medium leading-normal text-white transition-colors hover:bg-[#06866b] disabled:opacity-50">
                  {submitting ? (
                    <span className="inline-flex items-center gap-[6px]">
                      <span className="h-[14px] w-[14px] animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Creating…
                    </span>
                  ) : "Create Branch"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
