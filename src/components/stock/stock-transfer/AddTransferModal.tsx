"use client";

import { useState, FormEvent } from "react";
import Select from "react-select";
import FormCol from "@/core/common/form/FormCol";
import type {
  BranchOption,
  ProductOption,
  WarehouseOption,
} from "@/hooks/stock/useStockTransfers";
import type { CreateStockTransferPayload } from "@/lib/stock";
import {
  buildCreateTransferPayload,
  type TransferFormType,
} from "@/lib/stockTransferForm";

type Props = {
  branches: BranchOption[];
  warehouses: WarehouseOption[];
  products: ProductOption[];
  saving?: boolean;
  onSubmit: (payload: CreateStockTransferPayload) => Promise<boolean>;
};

export default function AddTransferModal({
  branches,
  warehouses,
  products,
  saving,
  onSubmit,
}: Props) {
  const [transferType, setTransferType] =
    useState<TransferFormType>("branch_branch");
  const [sourceBranch, setSourceBranch] = useState("");
  const [sourceWarehouse, setSourceWarehouse] = useState("");
  const [targetBranch, setTargetBranch] = useState("");
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [notes, setNotes] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  const handleTransferTypeChange = (nextType: TransferFormType) => {
    setTransferType(nextType);
    setSourceBranch("");
    setSourceWarehouse("");
    setTargetBranch("");
    setFormError(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const built = buildCreateTransferPayload({
      transferType,
      sourceBranch,
      targetBranch,
      sourceWarehouse,
      product,
      quantity,
      notes,
    });

    if (!built.ok) {
      setFormError(built.error);
      return;
    }

    const ok = await onSubmit(built.payload);
    if (ok) {
      setTransferType("branch_branch");
      setSourceBranch("");
      setSourceWarehouse("");
      setTargetBranch("");
      setProduct("");
      setQuantity("");
      setNotes("");
      closeBsModal("add-units");
    }
  };

  const branchOptions = branches.map((b) => ({ value: b.value, label: b.label }));
  const warehouseOptions = warehouses.map((w) => ({
    value: w.value,
    label: w.label,
  }));
  const productOptions = products.map((p) => ({ value: p.value, label: p.label }));

  return (
    <div className="modal fade" id="add-units">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <div className="page-title">
              <h4>Add Transfer</h4>
            </div>
            <button
              type="button"
              className="close"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              {formError && (
                <div className="alert alert-danger">{formError}</div>
              )}
              <div className="row">
                <FormCol lg={12}>
                  <div className="mb-3">
                    <label className="form-label">
                      Transfer Type <span className="text-danger">*</span>
                    </label>
                    <select
                      className="form-select"
                      value={transferType}
                      onChange={(e) =>
                        handleTransferTypeChange(e.target.value as TransferFormType)
                      }
                    >
                      <option value="branch_branch">Branch to Branch</option>
                      <option value="warehouse_branch">Warehouse to Branch</option>
                    </select>
                  </div>
                </FormCol>

                {transferType === "branch_branch" ? (
                  <>
                    <FormCol lg={6}>
                      <div className="mb-3">
                        <label className="form-label">
                          From Branch <span className="text-danger">*</span>
                        </label>
                        <Select
                          classNamePrefix="react-select"
                          options={branchOptions}
                          placeholder="Choose"
                          value={
                            branchOptions.find((o) => o.value === sourceBranch) ??
                            null
                          }
                          onChange={(opt) => setSourceBranch(opt?.value ?? "")}
                        />
                      </div>
                    </FormCol>
                    <FormCol lg={6}>
                      <div className="mb-3">
                        <label className="form-label">
                          To Branch <span className="text-danger">*</span>
                        </label>
                        <Select
                          classNamePrefix="react-select"
                          options={branchOptions}
                          placeholder="Choose"
                          value={
                            branchOptions.find((o) => o.value === targetBranch) ??
                            null
                          }
                          onChange={(opt) => setTargetBranch(opt?.value ?? "")}
                        />
                      </div>
                    </FormCol>
                  </>
                ) : (
                  <>
                    <FormCol lg={6}>
                      <div className="mb-3">
                        <label className="form-label">
                          From Warehouse <span className="text-danger">*</span>
                        </label>
                        <Select
                          classNamePrefix="react-select"
                          options={warehouseOptions}
                          placeholder="Choose warehouse"
                          value={
                            warehouseOptions.find(
                              (o) => o.value === sourceWarehouse,
                            ) ?? null
                          }
                          onChange={(opt) => setSourceWarehouse(opt?.value ?? "")}
                        />
                      </div>
                    </FormCol>
                    <FormCol lg={6}>
                      <div className="mb-3">
                        <label className="form-label">
                          To Branch <span className="text-danger">*</span>
                        </label>
                        <Select
                          classNamePrefix="react-select"
                          options={branchOptions}
                          placeholder="Choose branch"
                          value={
                            branchOptions.find((o) => o.value === targetBranch) ??
                            null
                          }
                          onChange={(opt) => setTargetBranch(opt?.value ?? "")}
                        />
                      </div>
                    </FormCol>
                  </>
                )}

                <FormCol lg={12}>
                  <div className="mb-3">
                    <label className="form-label">
                      Product <span className="text-danger">*</span>
                    </label>
                    <Select
                      classNamePrefix="react-select"
                      options={productOptions}
                      placeholder="Select Product"
                      value={productOptions.find((o) => o.value === product) ?? null}
                      onChange={(opt) => setProduct(opt?.value ?? "")}
                    />
                  </div>
                </FormCol>
                <FormCol lg={12}>
                  <div className="mb-3">
                    <label className="form-label">
                      Quantity <span className="text-danger">*</span>
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      min="0"
                      step="any"
                    />
                  </div>
                </FormCol>
                <FormCol lg={12}>
                  <div className="search-form mb-0">
                    <label className="form-label">Notes</label>
                    <textarea
                      className="form-control"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={3}
                    />
                  </div>
                </FormCol>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary me-2"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary" disabled={saving}>
                {saving ? "Creating..." : "Create Transfer"}
              </button>
            </div>
          </form>
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
