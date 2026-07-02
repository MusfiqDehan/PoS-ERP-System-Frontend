"use client";

import { useState, useEffect, type FormEvent } from "react";
import { inviteEmployee, type InviteEmployeePayload } from "@/lib/roles";
import { fetchAllTenantBranches, type Branch } from "@/lib/branches";
import { getAccessToken } from "@/lib/auth-session";

type AddUsersProps = {
  id?: string;
  preselectedRole?: { slug: string; name: string } | null;
  onSuccess?: () => void;
};

/** Roles that are org-wide and do not need a branch assignment. */
const ORG_WIDE_ROLES = new Set(["admin"]);

const fieldCls =
  "w-full rounded-[6px] border border-[#e7e7e7] px-[12px] py-[10px] text-[14px] leading-normal text-[#333333] outline-none transition-colors placeholder:text-[#999999] focus:border-[#089b7c]";
const fieldErrCls =
  "w-full rounded-[6px] border border-[#dc3545] px-[12px] py-[10px] text-[14px] leading-normal text-[#333333] outline-none";
const selectCls =
  "w-full appearance-none rounded-[6px] border border-[#e7e7e7] px-[12px] py-[10px] pr-[32px] text-[14px] leading-normal text-[#333333] outline-none transition-colors focus:border-[#089b7c] bg-white";
const lblCls = "mb-[6px] block text-[14px] font-medium leading-normal text-[#333333]";
const errCls = "mt-[4px] text-[12px] leading-normal text-[#dc3545]";

export default function AddUsers({
  id = "add-units",
  preselectedRole,
  onSuccess,
}: AddUsersProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedBranchId, setSelectedBranchId] = useState("");
  const [branches, setBranches] = useState<Branch[]>([]);
  const [branchesLoading, setBranchesLoading] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string | null>>({});
  const [success, setSuccess] = useState(false);

  const roleSlug = preselectedRole?.slug ?? "";
  const needsBranch = roleSlug !== "" && !ORG_WIDE_ROLES.has(roleSlug);

  /* Load branches when modal is shown for a branch-scoped role */
  useEffect(() => {
    if (!needsBranch) return;
    let cancelled = false;
    setBranchesLoading(true);
    const token = getAccessToken();
    if (!token) {
      setBranchesLoading(false);
      return;
    }
    (async () => {
      const res = await fetchAllTenantBranches(token);
      if (cancelled) return;
      if (res.ok && res.body.success && Array.isArray(res.body.data)) {
        setBranches(res.body.data as Branch[]);
      }
      setBranchesLoading(false);
    })();
    return () => { cancelled = true; };
  }, [needsBranch, preselectedRole?.slug]);

  /* Reset on modal open */
  useEffect(() => {
    const el = document.getElementById(id);
    if (!el) return;
    const reset = () => {
      setFullName("");
      setEmail("");
      setSelectedBranchId("");
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
    if (needsBranch && !selectedBranchId) {
      fe.branch_id = "Branch is required for this role.";
    }
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

    const payload: InviteEmployeePayload = { email: email.trim() };
    if (fullName.trim()) payload.full_name = fullName.trim();
    if (preselectedRole?.slug) payload.role_slug = preselectedRole.slug;
    if (needsBranch && selectedBranchId) {
      payload.branch_id = selectedBranchId;
    }

    setSubmitting(true);
    try {
      const result = await inviteEmployee(payload, token);
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
        const msg = result.body?.message || "Failed to send invitation.";
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
                  Invite a member. They will receive an email to set their own password.
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
                {/* Photo upload (cosmetic) */}
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
                    Invitation sent. The user will receive an email to set their password.
                  </div>
                )}
                {apiError && !success && (
                  <div className="mb-[16px] rounded-[6px] bg-[#fff5f5] px-[14px] py-[10px] text-[14px] leading-normal text-[#dc3545]">
                    {apiError}
                  </div>
                )}

                <div className="grid grid-cols-1 gap-[16px] sm:grid-cols-2">
                  <div>
                    <label className={lblCls}>Full Name</label>
                    <input
                      type="text"
                      placeholder="Enter full name (optional)"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className={fieldErrors.full_name ? fieldErrCls : fieldCls}
                    />
                    {fieldErrors.full_name && <p className={errCls}>{fieldErrors.full_name}</p>}
                  </div>

                  <div>
                    <label className={lblCls}>
                      Email <span className="text-[#dc3545]">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={fieldErrors.email ? fieldErrCls : fieldCls}
                    />
                    {fieldErrors.email && <p className={errCls}>{fieldErrors.email}</p>}
                  </div>

                  {/* Role (read-only) */}
                  <div>
                    <label className={lblCls}>Role</label>
                    <div className={`${fieldCls} flex items-center gap-[8px] bg-[#f9f9f9]`}>
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

                  {/* Branch selector (branch-scoped roles only) */}
                  {needsBranch && (
                    <div>
                      <label className={lblCls}>
                        Branch <span className="text-[#dc3545]">*</span>
                      </label>
                      {branchesLoading ? (
                        <div className={`${fieldCls} flex items-center gap-[8px] text-[#999999]`}>
                          <span className="h-[14px] w-[14px] animate-spin rounded-full border-2 border-[#e7e7e7] border-t-[#089b7c]" />
                          Loading branches...
                        </div>
                      ) : (
                        <div className="relative">
                          <select
                            value={selectedBranchId}
                            onChange={(e) => setSelectedBranchId(e.target.value)}
                            className={fieldErrors.branch_id ? fieldErrCls : selectCls}
                          >
                            <option value="">Select a branch</option>
                            {branches.map((b) => (
                              <option key={b.id} value={b.id}>
                                {b.name}{b.is_headquarters ? " (HQ)" : ""}
                              </option>
                            ))}
                          </select>
                          <i className="ti ti-chevron-down pointer-events-none absolute right-[12px] top-1/2 -translate-y-1/2 text-[14px] leading-none text-[#666666]" />
                        </div>
                      )}
                      {fieldErrors.branch_id && <p className={errCls}>{fieldErrors.branch_id}</p>}
                    </div>
                  )}
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
                      Sending\u00a0invite...
                    </span>
                  ) : (
                    "Send Invitation"
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
