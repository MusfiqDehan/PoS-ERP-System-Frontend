"use client";

import React, { useState, useEffect, FormEvent } from "react";
import Table from "@/core/common/pagination/datatable";
import Link from "next/link";
import TooltipIcons from "@/core/common/tooltip-content/tooltipIcons";
import RefreshIcon from "@/core/common/tooltip-content/refresh";
import CollapesIcon from "@/core/common/tooltip-content/collapes";
import CommonFooter from "@/core/common/footer/commonFooter";
import { useWarehouseList } from "@/hooks/inventory/useWarehouseList";
import {
  assignWarehouseManager,
  type Warehouse,
  type CreateWarehousePayload,
  type UpdateWarehousePayload,
} from "@/lib/warehouses";
import { fetchTenantUsers, type TenantUser } from "@/lib/users";
import { getAccessToken } from "@/lib/auth-session";

export default function WareHousesComponent() {
  const { dataSource, loading, addWarehouse, editWarehouse, removeWarehouse, reload } = useWarehouseList();

  const [addForm, setAddForm] = useState<CreateWarehousePayload>({ name: "", code: "" });
  const [editTarget, setEditTarget] = useState<Warehouse | null>(null);
  const [editForm, setEditForm] = useState<UpdateWarehousePayload>({});
  const [managerId, setManagerId] = useState("");
  const [users, setUsers] = useState<TenantUser[]>([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Warehouse | null>(null);
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
    const ok = await addWarehouse(addForm);
    setSubmitting(false);
    if (ok) {
      setAddForm({ name: "", code: "" });
      closeBsModal("add-units");
    }
  };

  const openEdit = (wh: Warehouse) => {
    setEditTarget(wh);
    setManagerId(wh.manager ?? "");
    setApiError(null);
    setEditForm({
      name: wh.name,
      code: wh.code,
      phone: wh.phone,
      address: wh.address,
      city: wh.city,
      is_central: wh.is_central,
    });
  };

  const handleEdit = async (e: FormEvent) => {
    e.preventDefault();
    if (!editTarget) return;
    setSubmitting(true);
    setApiError(null);
    const token = getAccessToken();
    const ok = await editWarehouse(editTarget.id, editForm);
    if (!ok) {
      setSubmitting(false);
      setApiError("Failed to update warehouse.");
      return;
    }
    if (managerId && managerId !== (editTarget.manager ?? "") && token) {
      const mgrResult = await assignWarehouseManager(editTarget.id, managerId, token);
      if (!mgrResult.ok || !mgrResult.body.success) {
        setApiError(mgrResult.body?.message || "Warehouse updated but manager assignment failed.");
        setSubmitting(false);
        return;
      }
    }
    setSubmitting(false);
    reload();
    closeBsModal("edit-units");
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setSubmitting(true);
    await removeWarehouse(deleteTarget.id);
    setSubmitting(false);
    setDeleteTarget(null);
    closeBsModal("delete-modal");
  };

  const columns = [
    {
      title: "Warehouse",
      dataIndex: "name",
      sorter: (a: Warehouse, b: Warehouse) => a.name.localeCompare(b.name),
    },
    {
      title: "Code",
      dataIndex: "code",
      sorter: (a: Warehouse, b: Warehouse) => a.code.localeCompare(b.code),
    },
    {
      title: "Contact Person",
      dataIndex: "manager_name",
      render: (_: unknown, record: Warehouse) => record.manager_name ?? "\u2014",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "City",
      dataIndex: "city",
    },
    {
      title: "Central",
      dataIndex: "is_central",
      render: (val: boolean) => val ? <span className="badge badge-info badge-xs">Central</span> : null,
    },
    {
      title: "Status",
      dataIndex: "is_active",
      render: (val: boolean) => (
        <span className={`badge d-inline-flex align-items-center badge-xs ${val ? "badge-success" : "badge-danger"}`}>
          <i className="ti ti-point-filled me-1" />
          {val ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_: unknown, record: Warehouse) => (
        <div className="action-table-data">
          <div className="edit-delete-action">
            <Link
              className="me-2 p-2"
              href="#"
              data-bs-toggle="modal"
              data-bs-target="#edit-units"
              onClick={() => openEdit(record)}
            >
              <i data-feather="edit" className="feather-edit" />
            </Link>
            <Link
              className="confirm-text p-2"
              href="#"
              data-bs-toggle="modal"
              data-bs-target="#delete-modal"
              onClick={() => setDeleteTarget(record)}
            >
              <i data-feather="trash-2" className="feather-trash-2" />
            </Link>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="add-item d-flex">
              <div className="page-title">
                <h4>Warehouses</h4>
                <h6>Manage your warehouses</h6>
              </div>
            </div>
            <ul className="table-top-head">
              <TooltipIcons />
              <RefreshIcon />
              <CollapesIcon />
            </ul>
            <div className="page-btn">
              <Link href="#" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#add-units">
                <i className="ti ti-circle-plus me-1" />
                Add Warehouse
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
            <div className="card-body">
              <div className="table-responsive">
                <Table columns={columns} dataSource={dataSource} />
              </div>
            </div>
          </div>
        </div>
        <CommonFooter />
      </div>

      {/* Add Warehouse Modal */}
      <div className="modal fade" id="add-units">
        <div className="modal-dialog modal-dialog-centered custom-modal-two">
          <div className="modal-content">
            <div className="page-wrapper-new p-0">
              <div className="content p-0">
                <div className="modal-header border-0 custom-modal-header">
                  <div className="page-title"><h4>Add Warehouse</h4></div>
                  <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body custom-modal-body">
                  <form onSubmit={handleAdd}>
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="mb-3">
                          <label className="form-label">Name <span className="text-danger">*</span></label>
                          <input type="text" className="form-control" required value={addForm.name} onChange={(e) => setAddForm((p) => ({ ...p, name: e.target.value }))} />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="mb-3">
                          <label className="form-label">Code <span className="text-danger">*</span></label>
                          <input type="text" className="form-control" required value={addForm.code} onChange={(e) => setAddForm((p) => ({ ...p, code: e.target.value }))} />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="mb-3">
                          <label className="form-label">Phone</label>
                          <input type="text" className="form-control" value={addForm.phone ?? ""} onChange={(e) => setAddForm((p) => ({ ...p, phone: e.target.value }))} />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="mb-3">
                          <label className="form-label">Address</label>
                          <input type="text" className="form-control" value={addForm.address ?? ""} onChange={(e) => setAddForm((p) => ({ ...p, address: e.target.value }))} />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="mb-3">
                          <label className="form-label">City</label>
                          <input type="text" className="form-control" value={addForm.city ?? ""} onChange={(e) => setAddForm((p) => ({ ...p, city: e.target.value }))} />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="mb-3">
                          <div className="form-check form-switch mt-4">
                            <input className="form-check-input" type="checkbox" id="addIsCentral" checked={addForm.is_central ?? false} onChange={(e) => setAddForm((p) => ({ ...p, is_central: e.target.checked }))} />
                            <label className="form-check-label" htmlFor="addIsCentral">Central Warehouse</label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer-btn">
                      <button type="button" className="btn btn-cancel me-2" data-bs-dismiss="modal">Cancel</button>
                      <button type="submit" className="btn btn-submit" disabled={submitting}>
                        {submitting ? "Creating..." : "Create Warehouse"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Warehouse Modal */}
      <div className="modal fade" id="edit-units">
        <div className="modal-dialog modal-dialog-centered custom-modal-two">
          <div className="modal-content">
            <div className="page-wrapper-new p-0">
              <div className="content p-0">
                <div className="modal-header border-0 custom-modal-header">
                  <div className="page-title"><h4>Edit Warehouse</h4></div>
                  <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body custom-modal-body">
                  <form onSubmit={handleEdit}>
                    {apiError && (
                      <div className="alert alert-danger py-2">{apiError}</div>
                    )}
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="mb-3">
                          <label className="form-label">Name <span className="text-danger">*</span></label>
                          <input type="text" className="form-control" required value={editForm.name ?? ""} onChange={(e) => setEditForm((p) => ({ ...p, name: e.target.value }))} />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="mb-3">
                          <label className="form-label">Code <span className="text-danger">*</span></label>
                          <input type="text" className="form-control" required value={editForm.code ?? ""} onChange={(e) => setEditForm((p) => ({ ...p, code: e.target.value }))} />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="mb-3">
                          <label className="form-label">Warehouse Manager</label>
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
                      </div>
                      <div className="col-lg-6">
                        <div className="mb-3">
                          <label className="form-label">Phone</label>
                          <input type="text" className="form-control" value={editForm.phone ?? ""} onChange={(e) => setEditForm((p) => ({ ...p, phone: e.target.value }))} />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="mb-3">
                          <label className="form-label">Address</label>
                          <input type="text" className="form-control" value={editForm.address ?? ""} onChange={(e) => setEditForm((p) => ({ ...p, address: e.target.value }))} />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="mb-3">
                          <label className="form-label">City</label>
                          <input type="text" className="form-control" value={editForm.city ?? ""} onChange={(e) => setEditForm((p) => ({ ...p, city: e.target.value }))} />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="mb-3">
                          <div className="form-check form-switch mt-4">
                            <input className="form-check-input" type="checkbox" id="editIsCentral" checked={editForm.is_central ?? false} onChange={(e) => setEditForm((p) => ({ ...p, is_central: e.target.checked }))} />
                            <label className="form-check-label" htmlFor="editIsCentral">Central Warehouse</label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer-btn">
                      <button type="button" className="btn btn-cancel me-2" data-bs-dismiss="modal">Cancel</button>
                      <button type="submit" className="btn btn-submit" disabled={submitting}>
                        {submitting ? "Saving..." : "Save Changes"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Warehouse Modal */}
      <div className="modal fade" id="delete-modal">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="page-wrapper-new p-0">
              <div className="content p-5 px-3 text-center">
                <span className="rounded-circle d-inline-flex p-2 bg-danger-transparent mb-2">
                  <i className="ti ti-trash fs-24 text-danger" />
                </span>
                <h4 className="fs-20 text-gray-9 fw-bold mb-2 mt-1">Delete Warehouse</h4>
                <p className="text-gray-6 mb-0 fs-16">
                  Are you sure you want to delete <strong>{deleteTarget?.name}</strong>?
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
    </div>
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
