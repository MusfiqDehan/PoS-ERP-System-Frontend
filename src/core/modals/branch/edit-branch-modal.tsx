"use client";

import { useState, useEffect, type FormEvent } from "react";
import { updateBranch, deleteBranch, assignBranchManager, type Branch } from "@/lib/branches";
import { fetchTenantUsers, type TenantUser } from "@/lib/users";
import { getAccessToken } from "@/lib/auth-session";

type Props = {
  id: string;
  branch: Branch | null;
  onUpdated: () => void;
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

export default function EditBranchModal({ id, branch, onUpdated, onClose }: Props) {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("active");
  const [managerId, setManagerId] = useState("");

  const [users, setUsers] = useState<TenantUser[]>([]);
  const [usersLoading, setUsersLoading] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string | null>>({});
  const [success, setSuccess] = useState(false);

  useEffect(function() {
    if (branch) {
      setName(branch.name ?? "");
      setCode(branch.code ?? "");
      setAddress(branch.address ?? "");
      setCity(branch.city ?? "");
      setPhone(branch.phone_number ?? "");
      setEmail(branch.email ?? "");
      setDescription(branch.description ?? "");
      setStatus(branch.status ?? "active");
      setManagerId(branch.manager ?? "");
    }
    setSubmitting(false);
    setApiError(null);
    setFieldErrors({});
    setSuccess(false);
  }, [branch]);

  useEffect(function() {
    if (!branch) return;
    var token = getAccessToken();
    if (!token) return;
    setUsersLoading(true);
    fetchTenantUsers(token).then(function(result) {
      if (result.ok && result.body.success && result.body.data) {
        setUsers(result.body.data);
      }
      setUsersLoading(false);
    });
  }, [branch]);

  function validate() {
    var fe: Record<string, string | null> = {};
    if (!name.trim()) fe.name = "Branch name is required.";
    if (!code.trim()) fe.code = "Branch code is required.";
    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      fe.email = "Enter a valid email.";
    setFieldErrors(fe);
    return Object.keys(fe).length === 0;
  }

  async function handleSave(e: FormEvent) {
    e.preventDefault();
    setApiError(null);
    if (!validate() || !branch) return;

    var token = getAccessToken();
    if (!token) { setApiError("Not authenticated."); return; }

    setSubmitting(true);
    try {
      var result = await updateBranch(branch.id, {
        name: name.trim(),
        code: code.trim().toUpperCase(),
        address: address.trim() || undefined,
        city: city.trim() || undefined,
        phone_number: phone.trim() || undefined,
        email: email.trim() || undefined,
        description: description.trim() || undefined,
        status: status as Branch["status"],
      }, token);

      if (!result.ok || !result.body.success) {
        setApiError(result.body?.message || "Failed to update branch.");
        setSubmitting(false);
        return;
      }

      // Assign manager if changed
      if (managerId && managerId !== (branch.manager ?? "")) {
        var mgrResult = await assignBranchManager(branch.id, managerId, token);
        if (!mgrResult.ok || !mgrResult.body.success) {
          setApiError(mgrResult.body?.message || "Branch updated but manager assignment failed.");
          setSubmitting(false);
          return;
        }
      }

      setSuccess(true);
      onUpdated();
      setTimeout(function() { onClose(); }, 800);
    } catch (err) {
      setApiError("Network error.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete() {
    if (!branch || !confirm("Delete \"" + branch.name + "\"? This cannot be undone.")) return;
    var token = getAccessToken();
    if (!token) return;
    setSubmitting(true);
    try {
      var result = await deleteBranch(branch.id, token);
      if (result.ok && result.body.success) {
        onUpdated();
        onClose();
      } else {
        setApiError(result.body?.message || "Failed to delete branch.");
      }
    } catch (err) {
      setApiError("Network error.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!branch) return null;

  return (
    <>
      <div className="modal-backdrop show" style={{ zIndex: 1040 }} onClick={onClose} />
      <div className="modal fade show d-block" tabIndex={-1} role="dialog" style={{ zIndex: 1050 }}>
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content overflow-hidden rounded-[10px] border-0">
            <div className="flex items-center justify-between border-b border-[#e7e7e7] px-[24px] py-[16px]">
              <div>
                <h4 className="m-0 text-[18px] font-semibold leading-normal text-[#333333]">
                  Edit Branch
                </h4>
                <p className="mt-[4px] mb-0 text-[13px] font-normal leading-normal text-[#666666]">
                  Update details for {branch.name}.
                </p>
              </div>
              <button type="button" onClick={onClose} aria-label="Close"
                className="flex h-[30px] w-[30px] items-center justify-center rounded-full text-[#666666] transition-colors hover:bg-[#f1f1f1]">
                <i className="ti ti-x text-[18px] leading-none" />
              </button>
            </div>

            <form onSubmit={handleSave}>
              <div className="px-[24px] py-[20px] space-y-[16px]">
                {success && (
                  <div className="rounded-[6px] bg-[#f1fcf5] px-[14px] py-[10px] text-[14px] leading-normal text-[#089b7c]">
                    Branch updated successfully!
                  </div>
                )}
                {apiError && !success && (
                  <div className="rounded-[6px] bg-[#fff5f5] px-[14px] py-[10px] text-[14px] leading-normal text-[#dc3545]">
                    {apiError}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px]">
                  <div>
                    <label className={labelCls}>Name <span className="text-[#dc3545]">*</span></label>
                    <input type="text" required value={name}
                      onChange={function(e) { setName(e.target.value); }}
                      className={fieldErrors.name ? fieldErr : field} />
                    {fieldErrors.name && <p className={errCls}>{fieldErrors.name}</p>}
                  </div>
                  <div>
                    <label className={labelCls}>Code <span className="text-[#dc3545]">*</span></label>
                    <input type="text" required value={code}
                      onChange={function(e) { setCode(e.target.value.toUpperCase()); }}
                      className={fieldErrors.code ? fieldErr : field} />
                    {fieldErrors.code && <p className={errCls}>{fieldErrors.code}</p>}
                  </div>
                  <div>
                    <label className={labelCls}>Address</label>
                    <input type="text" value={address} onChange={function(e) { setAddress(e.target.value); }} className={field} />
                  </div>
                  <div>
                    <label className={labelCls}>City</label>
                    <input type="text" value={city} onChange={function(e) { setCity(e.target.value); }} className={field} />
                  </div>
                  <div>
                    <label className={labelCls}>Phone</label>
                    <input type="text" value={phone} onChange={function(e) { setPhone(e.target.value); }} className={field} />
                  </div>
                  <div>
                    <label className={labelCls}>Email</label>
                    <input type="email" value={email} onChange={function(e) { setEmail(e.target.value); }}
                      className={fieldErrors.email ? fieldErr : field} />
                    {fieldErrors.email && <p className={errCls}>{fieldErrors.email}</p>}
                  </div>
                  <div>
                    <label className={labelCls}>Status</label>
                    <select value={status} onChange={function(e) { setStatus(e.target.value); }} className={selectCls}>
                      {STATUS_OPTIONS.map(function(o) {
                        return <option key={o.value} value={o.value}>{o.label}</option>;
                      })}
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>Manager</label>
                    <select
                      value={managerId}
                      onChange={function(e) { setManagerId(e.target.value); }}
                      className={selectCls}
                      disabled={usersLoading}
                    >
                      <option value="">
                        {branch.manager_name
                          ? "Current: " + branch.manager_name
                          : usersLoading
                            ? "Loading users..."
                            : "Select a manager"}
                      </option>
                      <option value="">-- None --</option>
                      {users.map(function(user) {
                        return (
                          <option key={user.id} value={user.id}>
                            {user.full_name || user.email || user.id}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>

                <div>
                  <label className={labelCls}>Description</label>
                  <textarea rows={3} value={description}
                    onChange={function(e) { setDescription(e.target.value); }}
                    className={field + " resize-none"} />
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-[#e7e7e7] px-[24px] py-[16px]">
                <button type="button" onClick={handleDelete} disabled={submitting}
                  className="rounded-[6px] border border-[#dc3545] px-[16px] py-[9px] text-[14px] font-medium leading-normal text-[#dc3545] transition-colors hover:bg-[#fff5f5] disabled:opacity-50">
                  <i className="ti ti-trash text-[16px] leading-none mr-[6px]" />
                  Delete
                </button>
                <div className="flex gap-[8px]">
                  <button type="button" onClick={onClose} disabled={submitting}
                    className="rounded-[6px] border border-[#e7e7e7] px-[16px] py-[9px] text-[14px] font-medium leading-normal text-[#666666] transition-colors hover:bg-[#f6f6f6] disabled:opacity-50">
                    Cancel
                  </button>
                  <button type="submit" disabled={submitting}
                    className="rounded-[6px] bg-[#089b7c] px-[16px] py-[9px] text-[14px] font-medium leading-normal text-white transition-colors hover:bg-[#06866b] disabled:opacity-50">
                    {submitting ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
