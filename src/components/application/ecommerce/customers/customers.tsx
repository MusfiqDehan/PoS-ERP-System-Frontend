"use client";
/* eslint-disable @next/next/no-img-element */

import React, { useCallback, useEffect, useRef, useState } from "react";
import { Edit, Trash2 } from "react-feather";
import Link from "next/link";
import TooltipIcons from "@/core/common/tooltip-content/tooltipIcons";
import CollapesIcon from "@/core/common/tooltip-content/collapes";
import Table from "@/core/common/pagination/datatable";
import CommonFooter from "@/core/common/footer/commonFooter";
import { useCustomerList } from "@/hooks/customers/useCustomerList";
import { usePermission } from "@/hooks/usePermission";
import type { PosCustomer } from "@/lib/pos";

type CustomerFormState = {
  name: string;
  email: string;
  phone: string;
  isActive: boolean;
};

const emptyForm: CustomerFormState = {
  name: "",
  email: "",
  phone: "",
  isActive: true,
};

function hideModal(id: string) {
  const modal = document.getElementById(id);
  if (!modal || typeof window === "undefined") return;
  const bootstrap = (
    window as Window & {
      bootstrap?: {
        Modal?: { getOrCreateInstance: (el: Element) => { hide: () => void } };
      };
    }
  ).bootstrap;
  bootstrap?.Modal?.getOrCreateInstance(modal)?.hide();
}

export default function CustomersComponent() {
  const {
    dataSource,
    loading,
    error,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    reload,
    addCustomer,
    editCustomer,
    removeCustomer,
  } = useCustomerList();

  const { allowed: canEdit } = usePermission("customers", "edit");

  const [selectedForEdit, setSelectedForEdit] = useState<PosCustomer | null>(null);
  const [selectedForDelete, setSelectedForDelete] = useState<PosCustomer | null>(null);
  const [addForm, setAddForm] = useState<CustomerFormState>(emptyForm);
  const [editForm, setEditForm] = useState<CustomerFormState>(emptyForm);
  const [addError, setAddError] = useState<string | null>(null);
  const [editError, setEditError] = useState<string | null>(null);
  const [addSubmitting, setAddSubmitting] = useState(false);
  const [editSubmitting, setEditSubmitting] = useState(false);
  const [deleteSubmitting, setDeleteSubmitting] = useState(false);
  const addCloseRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!selectedForEdit) return;
    setEditForm({
      name: selectedForEdit.name,
      email: selectedForEdit.email ?? "",
      phone: selectedForEdit.phone ?? "",
      isActive: selectedForEdit.is_active,
    });
    setEditError(null);
  }, [selectedForEdit]);

  const resetAddForm = () => {
    setAddForm(emptyForm);
    setAddError(null);
  };

  const handleAddSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!canEdit || !addForm.name.trim() || !addForm.phone.trim()) return;

    setAddSubmitting(true);
    setAddError(null);
    const result = await addCustomer({
      name: addForm.name.trim(),
      phone: addForm.phone.trim(),
      email: addForm.email.trim() || undefined,
      is_active: addForm.isActive,
    });
    setAddSubmitting(false);

    if (result.ok) {
      resetAddForm();
      addCloseRef.current?.click();
      hideModal("add-units");
    } else {
      setAddError(result.error ?? "Failed to create customer.");
    }
  };

  const handleEditSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!canEdit || !selectedForEdit || !editForm.name.trim() || !editForm.phone.trim()) {
      return;
    }

    setEditSubmitting(true);
    setEditError(null);
    const result = await editCustomer(selectedForEdit.id, {
      name: editForm.name.trim(),
      phone: editForm.phone.trim(),
      email: editForm.email.trim() || undefined,
      is_active: editForm.isActive,
    });
    setEditSubmitting(false);

    if (result.ok) {
      setSelectedForEdit(null);
      hideModal("edit-units");
    } else {
      setEditError(result.error ?? "Failed to update customer.");
    }
  };

  const handleDelete = async () => {
    if (!canEdit || !selectedForDelete) return;
    setDeleteSubmitting(true);
    const success = await removeCustomer(selectedForDelete.id);
    setDeleteSubmitting(false);
    if (success) {
      setSelectedForDelete(null);
      hideModal("delete-modal");
    }
  };

  const handleSelectForEdit = useCallback((record: PosCustomer) => {
    setSelectedForEdit(record);
  }, []);

  const handleSelectForDelete = useCallback((record: PosCustomer) => {
    setSelectedForDelete(record);
  }, []);

  const columns = [
    {
      title: "Customer Name",
      dataIndex: "name",
      sorter: (a: PosCustomer, b: PosCustomer) => a.name.localeCompare(b.name),
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (value: string | null) => value || "—",
      sorter: (a: PosCustomer, b: PosCustomer) =>
        (a.email ?? "").localeCompare(b.email ?? ""),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      render: (value: string) => value || "—",
      sorter: (a: PosCustomer, b: PosCustomer) => a.phone.localeCompare(b.phone),
    },
    {
      title: "Loyalty Points",
      dataIndex: "points",
      sorter: (a: PosCustomer, b: PosCustomer) => a.points - b.points,
    },
    {
      title: "Status",
      dataIndex: "is_active",
      render: (value: boolean) => (
        <span
          className={`badge d-inline-flex align-items-center badge-xs ${
            value ? "badge-success" : "badge-danger"
          }`}
        >
          <i className="ti ti-point-filled me-1" />
          {value ? "Active" : "Inactive"}
        </span>
      ),
      sorter: (a: PosCustomer, b: PosCustomer) =>
        Number(a.is_active) - Number(b.is_active),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_: unknown, record: PosCustomer) => (
        <div className="action-table-data">
          <div className="edit-delete-action">
            {canEdit && (
              <>
                <Link
                  className="me-2 p-2"
                  href="#"
                  data-bs-toggle="modal"
                  data-bs-target="#edit-units"
                  onClick={() => handleSelectForEdit(record)}
                >
                  <Edit className="feather-edit" />
                </Link>
                <Link
                  className="confirm-text p-2"
                  href="#"
                  data-bs-toggle="modal"
                  data-bs-target="#delete-modal"
                  onClick={() => handleSelectForDelete(record)}
                >
                  <Trash2 className="feather-trash-2" />
                </Link>
              </>
            )}
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
                <h4 className="fw-bold">Customers</h4>
                <h6>Manage your customers</h6>
              </div>
            </div>
            <ul className="table-top-head">
              <TooltipIcons />
              <li>
                <button
                  type="button"
                  className="border-0 bg-transparent p-0"
                  title="Refresh"
                  onClick={reload}
                  disabled={loading}
                >
                  <i className="ti ti-refresh" />
                </button>
              </li>
              <CollapesIcon />
            </ul>
            {canEdit && (
              <div className="page-btn">
                <Link
                  href="#"
                  className="btn btn-primary text-white"
                  data-bs-toggle="modal"
                  data-bs-target="#add-units"
                  onClick={resetAddForm}
                >
                  <i className="ti ti-circle-plus me-1" />
                  Add Customer
                </Link>
              </div>
            )}
          </div>

          <div className="card table-list-card">
            <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
              <div className="search-set">
                <div className="search-input">
                  <input
                    type="search"
                    className="form-control"
                    placeholder="Search by name, phone, or email"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                  />
                  <span className="btn-searchset">
                    <i className="ti ti-search fs-14" />
                  </span>
                </div>
              </div>
              <div className="d-flex table-dropdown my-xl-auto right-content align-items-center flex-wrap row-gap-3">
                <div className="dropdown me-2">
                  <Link
                    href="#"
                    className="dropdown-toggle btn btn-white btn-md d-inline-flex align-items-center"
                    data-bs-toggle="dropdown"
                  >
                    {statusFilter === "all"
                      ? "Status"
                      : statusFilter === "active"
                        ? "Active"
                        : "Inactive"}
                  </Link>
                  <ul className="dropdown-menu dropdown-menu-end p-3">
                    <li>
                      <button
                        type="button"
                        className="dropdown-item rounded-1"
                        onClick={() => setStatusFilter("all")}
                      >
                        All
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="dropdown-item rounded-1"
                        onClick={() => setStatusFilter("active")}
                      >
                        Active
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="dropdown-item rounded-1"
                        onClick={() => setStatusFilter("inactive")}
                      >
                        Inactive
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="card-body">
              {error && (
                <div className="alert alert-danger mb-3" role="alert">
                  {error}
                </div>
              )}
              <div className="table-responsive">
                {loading ? (
                  <p className="text-muted mb-0">Loading customers...</p>
                ) : (
                  <Table
                    columns={columns}
                    dataSource={dataSource}
                    rowKey={(record: PosCustomer) => record.id}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <CommonFooter />
      </div>

      {/* Add Customer */}
      <div className="modal fade" id="add-units">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="page-wrapper-new p-0">
              <div className="content">
                <div className="modal-header">
                  <div className="page-title">
                    <h4>Add Customer</h4>
                  </div>
                  <button
                    type="button"
                    className="close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    ref={addCloseRef}
                    onClick={resetAddForm}
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <form onSubmit={handleAddSubmit}>
                  <div className="modal-body">
                    {addError && (
                      <div className="alert alert-danger py-2">{addError}</div>
                    )}
                    <div className="row">
                      <div className="col-lg-12 mb-3">
                        <label className="form-label">
                          Customer Name<span className="text-danger ms-1">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          value={addForm.name}
                          onChange={(event) =>
                            setAddForm((current) => ({
                              ...current,
                              name: event.target.value,
                            }))
                          }
                          required
                        />
                      </div>
                      <div className="col-lg-12 mb-3">
                        <label className="form-label">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          value={addForm.email}
                          onChange={(event) =>
                            setAddForm((current) => ({
                              ...current,
                              email: event.target.value,
                            }))
                          }
                        />
                      </div>
                      <div className="col-lg-12 mb-3">
                        <label className="form-label">
                          Phone<span className="text-danger ms-1">*</span>
                        </label>
                        <input
                          type="tel"
                          className="form-control"
                          value={addForm.phone}
                          onChange={(event) =>
                            setAddForm((current) => ({
                              ...current,
                              phone: event.target.value,
                            }))
                          }
                          required
                        />
                      </div>
                      <div className="col-lg-12">
                        <div className="status-toggle modal-status d-flex justify-content-between align-items-center">
                          <span className="status-label">Status</span>
                          <input
                            type="checkbox"
                            id="add-customer-status"
                            className="check"
                            checked={addForm.isActive}
                            onChange={(event) =>
                              setAddForm((current) => ({
                                ...current,
                                isActive: event.target.checked,
                              }))
                            }
                          />
                          <label htmlFor="add-customer-status" className="checktoggle">
                            {" "}
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn me-2 btn-secondary fs-13 fw-medium p-2 px-3 shadow-none"
                      data-bs-dismiss="modal"
                      onClick={resetAddForm}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary fs-13 fw-medium p-2 px-3"
                      disabled={addSubmitting || !addForm.name.trim() || !addForm.phone.trim()}
                    >
                      {addSubmitting ? "Adding..." : "Add Customer"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Customer */}
      <div className="modal fade" id="edit-units">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="page-wrapper-new p-0">
              <div className="content">
                <div className="modal-header">
                  <div className="page-title">
                    <h4>Edit Customer</h4>
                  </div>
                  <button
                    type="button"
                    className="close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={() => setSelectedForEdit(null)}
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <form onSubmit={handleEditSubmit}>
                  <div className="modal-body">
                    {editError && (
                      <div className="alert alert-danger py-2">{editError}</div>
                    )}
                    <div className="row">
                      <div className="col-lg-12 mb-3">
                        <label className="form-label">
                          Customer Name<span className="text-danger ms-1">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          value={editForm.name}
                          onChange={(event) =>
                            setEditForm((current) => ({
                              ...current,
                              name: event.target.value,
                            }))
                          }
                          required
                        />
                      </div>
                      <div className="col-lg-12 mb-3">
                        <label className="form-label">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          value={editForm.email}
                          onChange={(event) =>
                            setEditForm((current) => ({
                              ...current,
                              email: event.target.value,
                            }))
                          }
                        />
                      </div>
                      <div className="col-lg-12 mb-3">
                        <label className="form-label">
                          Phone<span className="text-danger ms-1">*</span>
                        </label>
                        <input
                          type="tel"
                          className="form-control"
                          value={editForm.phone}
                          onChange={(event) =>
                            setEditForm((current) => ({
                              ...current,
                              phone: event.target.value,
                            }))
                          }
                          required
                        />
                      </div>
                      <div className="col-lg-12">
                        <div className="status-toggle modal-status d-flex justify-content-between align-items-center">
                          <span className="status-label">Status</span>
                          <input
                            type="checkbox"
                            id="edit-customer-status"
                            className="check"
                            checked={editForm.isActive}
                            onChange={(event) =>
                              setEditForm((current) => ({
                                ...current,
                                isActive: event.target.checked,
                              }))
                            }
                          />
                          <label htmlFor="edit-customer-status" className="checktoggle">
                            {" "}
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn me-2 btn-secondary fs-13 fw-medium p-2 px-3 shadow-none"
                      data-bs-dismiss="modal"
                      onClick={() => setSelectedForEdit(null)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary fs-13 fw-medium p-2 px-3"
                      disabled={
                        editSubmitting ||
                        !selectedForEdit ||
                        !editForm.name.trim() ||
                        !editForm.phone.trim()
                      }
                    >
                      {editSubmitting ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Customer */}
      <div className="modal fade" id="delete-modal">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="page-wrapper-new p-0">
              <div className="content p-5 px-3 text-center">
                <span className="rounded-circle d-inline-flex p-2 bg-danger-transparent mb-2">
                  <i className="ti ti-trash fs-24 text-danger" />
                </span>
                <h4 className="fs-20 fw-bold mb-2 mt-1">Delete Customer</h4>
                <p className="mb-0 fs-16">
                  Are you sure you want to delete{" "}
                  <strong>{selectedForDelete?.name ?? "this customer"}</strong>?
                </p>
                <div className="modal-footer-btn mt-3 d-flex justify-content-center">
                  <button
                    type="button"
                    className="btn me-2 btn-secondary fs-13 fw-medium p-2 px-3 shadow-none"
                    data-bs-dismiss="modal"
                    onClick={() => setSelectedForDelete(null)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary fs-13 fw-medium p-2 px-3"
                    disabled={deleteSubmitting || !selectedForDelete}
                    onClick={handleDelete}
                  >
                    {deleteSubmitting ? "Deleting..." : "Yes Delete"}
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
