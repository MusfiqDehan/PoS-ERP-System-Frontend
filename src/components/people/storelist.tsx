"use client";

import React, { useState, useEffect, FormEvent } from "react";
import Table from "@/core/common/pagination/datatable";
import Link from "next/link";
import { PlusCircle, Edit, Trash2 } from "react-feather";
import TooltipIcons from "@/core/common/tooltip-content/tooltipIcons";
import RefreshIcon from "@/core/common/tooltip-content/refresh";
import CollapesIcon from "@/core/common/tooltip-content/collapes";
import { useBranchList } from "@/hooks/branch/useBranchList";
import { assignBranchManager, type Branch, type CreateBranchPayload, type UpdateBranchPayload } from "@/lib/branches";
import { fetchTenantUsers, type TenantUser } from "@/lib/users";
import { getAccessToken } from "@/lib/auth-session";

export default function BranchListComponent() {
  const { dataSource, loading, addBranch, editBranch, removeBranch, reload } = useBranchList();

  const [addForm, setAddForm] = useState<CreateBranchPayload>({ name: "", code: "" });
  const [editTarget, setEditTarget] = useState<Branch | null>(null);
  const [editForm, setEditForm] = useState<UpdateBranchPayload>({});
  const [managerId, setManagerId] = useState("");
  const [users, setUsers] = useState<TenantUser[]>([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Branch | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  useEffect(() => {
    if (!editTarget) return;
    const token = getAccessToken();
    if (!token) return;
    setUsersLoading(true);
    fetchTenantUsers(token).then((result) => {
      if (result.ok && result.body.success && result.body.data) {
        setUsers(result.body.data);
      }
      setUsersLoading(false);
    });
  }, [editTarget]);

  const handleAdd = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const result = await addBranch(addForm);
    setSubmitting(false);
    if (result.ok) {
      setAddForm({ name: "", code: "" });
      closeBsModal("add-branch");
    }
  };

  const openEdit = (branch: Branch) => {
    setEditTarget(branch);
    setManagerId(branch.manager ?? "");
    setApiError(null);
    setEditForm({
      name: branch.name,
      code: branch.code,
      address: branch.address ?? "",
      city: branch.city ?? "",
      phone_number: branch.phone_number ?? "",
      email: branch.email ?? "",
      status: branch.status ?? "active",
    });
  };

  const handleEdit = async (e: FormEvent) => {
    e.preventDefault();
    if (!editTarget) return;
    setSubmitting(true);
    setApiError(null);
    const token = getAccessToken();
    const ok = await editBranch(editTarget.id, editForm);
    if (!ok) {
      setSubmitting(false);
      setApiError("Failed to update branch.");
      return;
    }
    if (managerId && managerId !== (editTarget.manager ?? "") && token) {
      const mgrResult = await assignBranchManager(editTarget.id, managerId, token);
      if (!mgrResult.ok || !mgrResult.body.success) {
        setApiError(mgrResult.body?.message || "Branch updated but manager assignment failed.");
        setSubmitting(false);
        return;
      }
    }
    setSubmitting(false);
    reload();
    closeBsModal("edit-branch");
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setSubmitting(true);
    await removeBranch(deleteTarget.id);
    setSubmitting(false);
    setDeleteTarget(null);
    closeBsModal("delete-modal");
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a: Branch, b: Branch) => a.name.localeCompare(b.name),
    },
    {
      title: "Code",
      dataIndex: "code",
      sorter: (a: Branch, b: Branch) => a.code.localeCompare(b.code),
    },
    {
      title: "City",
      dataIndex: "city",
      sorter: (a: Branch, b: Branch) => (a.city ?? "").localeCompare(b.city ?? ""),
    },
    {
      title: "Contact Person",
      dataIndex: "manager_name",
      render: (_: unknown, record: Branch) => record.manager_name ?? "\u2014",
    },
    {
      title: "Phone",
      dataIndex: "phone_number",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text: string) => (
        <span className={`badge d-inline-flex align-items-center badge-xs ${text === "active" ? "badge-success" : "badge-danger"}`}>
          <i className="ti ti-point-filled me-1" />
          {text ?? "active"}
        </span>
      ),
    },
    {
      title: "HQ",
      dataIndex: "is_headquarters",
      render: (val: boolean) => val ? <span className="badge badge-info badge-xs">HQ</span> : null,
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_: unknown, record: Branch) => (
        <div className="action-table-data">
          <div className="edit-delete-action">
            <Link
              className="me-2 p-2"
              href="#"
              data-bs-toggle="modal"
              data-bs-target="#edit-branch"
              onClick={() => openEdit(record)}
            >
              <Edit className="feather-edit" />
            </Link>
            <Link
              className="confirm-text p-2"
              href="#"
              data-bs-toggle="modal"
              data-bs-target="#delete-modal"
              onClick={() => setDeleteTarget(record)}
            >
              <Trash2 className="feather-trash-2" />
            </Link>
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="add-item d-flex">
              <div className="page-title">
                <h4>Branches</h4>
                <h6>Manage your branches</h6>
              </div>
            </div>
            <ul className="table-top-head">
              <TooltipIcons />
              <RefreshIcon />
              <CollapesIcon />
            </ul>
            <div className="page-btn">
              <Link href="#" data-bs-toggle="modal" data-bs-target="#add-branch" className="btn btn-primary">
                <PlusCircle size={14} className="me-2" />
                Add Branch
              </Link>
            </div>
          </div>

          <div className="card table-list-card">
            <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
              <div className="search-set" />
              <div className="d-flex table-dropdown my-xl-auto right-content align-items-center flex-wrap row-gap-3">
                <button className="btn btn-white btn-sm me-2" onClick={reload} disabled={loading}>
                  {loading ? "Loading..." : "Refresh"}
                </button>
              </div>
            </div>
            <div className="card-body pb-0">
              <div className="table-responsive">
                <Table columns={columns} dataSource={dataSource} />
              </div>
            </div>
          </div>
        </div>
        <div className="footer d-sm-flex align-items-center justify-content-between border-top bg-white p-3">
          <p className="mb-0">2014-2025 - Sortorium. All Right Reserved</p>
          <p>Designed &amp; Developed By <Link href="#" className="text-primary">Sortorium</Link></p>
        </div>
      </div>

      {/* Add Branch Modal */}
      <div className="modal fade" id="add-branch">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <div className="page-title"><h4>Add Branch</h4></div>
              <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form onSubmit={handleAdd}>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Name <span className="text-danger">*</span></label>
                  <input type="text" className="form-control" required value={addForm.name} onChange={(e) => setAddForm((p) => ({ ...p, name: e.target.value }))} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Code <span className="text-danger">*</span></label>
                  <input type="text" className="form-control" required value={addForm.code} onChange={(e) => setAddForm((p) => ({ ...p, code: e.target.value }))} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Address</label>
                  <input type="text" className="form-control" value={addForm.address ?? ""} onChange={(e) => setAddForm((p) => ({ ...p, address: e.target.value }))} />
                </div>
                <div className="mb-3">
                  <label className="form-label">City</label>
                  <input type="text" className="form-control" value={addForm.city ?? ""} onChange={(e) => setAddForm((p) => ({ ...p, city: e.target.value }))} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Phone</label>
                  <input type="text" className="form-control" value={addForm.phone_number ?? ""} onChange={(e) => setAddForm((p) => ({ ...p, phone_number: e.target.value }))} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input type="email" className="form-control" value={addForm.email ?? ""} onChange={(e) => setAddForm((p) => ({ ...p, email: e.target.value }))} />
                </div>
                <div className="mb-0">
                  <div className="status-toggle modal-status d-flex justify-content-between align-items-center">
                    <span className="status-label">Status</span>
                    <select className="form-select form-select-sm w-auto" value={addForm.status ?? "active"} onChange={(e) => setAddForm((p) => ({ ...p, status: e.target.value }))}>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn me-2 btn-secondary fs-13 fw-medium p-2 px-3 shadow-none" data-bs-dismiss="modal">Cancel</button>
                <button type="submit" className="btn btn-primary fs-13 fw-medium p-2 px-3" disabled={submitting}>
                  {submitting ? "Adding..." : "Add Branch"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Edit Branch Modal */}
      <div className="modal fade" id="edit-branch">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <div className="page-title"><h4>Edit Branch</h4></div>
              <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form onSubmit={handleEdit}>
              <div className="modal-body">
                {apiError && (
                  <div className="alert alert-danger py-2">{apiError}</div>
                )}
                <div className="mb-3">
                  <label className="form-label">Name <span className="text-danger">*</span></label>
                  <input type="text" className="form-control" required value={editForm.name ?? ""} onChange={(e) => setEditForm((p) => ({ ...p, name: e.target.value }))} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Code <span className="text-danger">*</span></label>
                  <input type="text" className="form-control" required value={editForm.code ?? ""} onChange={(e) => setEditForm((p) => ({ ...p, code: e.target.value }))} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Branch Manager</label>
                  {usersLoading ? (
                    <div className="form-control text-muted">Loading users...</div>
                  ) : (
                    <select
                      className="form-select"
                      value={managerId}
                      onChange={(e) => setManagerId(e.target.value)}
                    >
                      <option value="">-- Select manager --</option>
                      {users.map((u) => (
                        <option key={u.id} value={u.id}>
                          {u.full_name || u.email}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">Address</label>
                  <input type="text" className="form-control" value={editForm.address ?? ""} onChange={(e) => setEditForm((p) => ({ ...p, address: e.target.value }))} />
                </div>
                <div className="mb-3">
                  <label className="form-label">City</label>
                  <input type="text" className="form-control" value={editForm.city ?? ""} onChange={(e) => setEditForm((p) => ({ ...p, city: e.target.value }))} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Phone</label>
                  <input type="text" className="form-control" value={editForm.phone_number ?? ""} onChange={(e) => setEditForm((p) => ({ ...p, phone_number: e.target.value }))} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input type="email" className="form-control" value={editForm.email ?? ""} onChange={(e) => setEditForm((p) => ({ ...p, email: e.target.value }))} />
                </div>
                <div className="mb-0">
                  <div className="status-toggle modal-status d-flex justify-content-between align-items-center">
                    <span className="status-label">Status</span>
                    <select className="form-select form-select-sm w-auto" value={editForm.status ?? "active"} onChange={(e) => setEditForm((p) => ({ ...p, status: e.target.value }))}>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn me-2 btn-secondary fs-13 fw-medium p-2 px-3 shadow-none" data-bs-dismiss="modal">Cancel</button>
                <button type="submit" className="btn btn-primary fs-13 fw-medium p-2 px-3" disabled={submitting}>
                  {submitting ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Delete Branch Modal */}
      <div className="modal fade" id="delete-modal">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="page-wrapper-new p-0">
              <div className="content p-5 px-3 text-center">
                <span className="rounded-circle d-inline-flex p-2 bg-danger-transparent mb-2">
                  <i className="ti ti-trash fs-24 text-danger" />
                </span>
                <h4 className="fs-20 text-gray-9 fw-bold mb-2 mt-1">Delete Branch</h4>
                <p className="text-gray-6 mb-0 fs-16">
                  Are you sure you want to delete{" "}
                  <strong>{deleteTarget?.name}</strong>?
                </p>
                <div className="modal-footer-btn mt-3 d-flex justify-content-center">
                  <button type="button" className="btn me-2 btn-secondary fs-13 fw-medium p-2 px-3 shadow-none" data-bs-dismiss="modal">Cancel</button>
                  <button type="button" className="btn btn-primary fs-13 fw-medium p-2 px-3" onClick={handleDelete} disabled={submitting}>
                    {submitting ? "Deleting..." : "Yes Delete"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function closeBsModal(id: string) {
  if (typeof window === "undefined") return;
  const el = document.getElementById(id);
  if (!el) return;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const bsModal = (window as any).bootstrap?.Modal?.getInstance(el);
  bsModal?.hide();
}
