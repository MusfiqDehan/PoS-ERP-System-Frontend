"use client";

import { useState, FormEvent } from "react";
import Select from "react-select";
import FormCol from "@/core/common/form/FormCol";
import type {
  BranchOption,
  ProductOption,
  WarehouseOption,
} from "@/hooks/stock/useStockAdjustments";
import type { CreateStockAdjustmentPayload } from "@/lib/stock";

type Props = {
  branches: BranchOption[];
  warehouses: WarehouseOption[];
  products: ProductOption[];
  saving?: boolean;
  onSubmit: (payload: CreateStockAdjustmentPayload) => Promise<boolean>;
};

export default function AddAdjustmentModal({
  branches,
  warehouses,
  products,
  saving,
  onSubmit,
}: Props) {
  const [locationType, setLocationType] = useState<"branch" | "warehouse">("branch");
  const [branch, setBranch] = useState("");
  const [warehouse, setWarehouse] = useState("");
  const [product, setProduct] = useState("");
  const [quantityAfter, setQuantityAfter] = useState("");
  const [reason, setReason] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError(null);
    if (!product || !quantityAfter) {
      setFormError("Product and quantity are required.");
      return;
    }
    if (locationType === "branch" && !branch) {
      setFormError("Branch is required.");
      return;
    }
    if (locationType === "warehouse" && !warehouse) {
      setFormError("Warehouse is required.");
      return;
    }
    const ok = await onSubmit({
      branch: locationType === "branch" ? branch : undefined,
      warehouse: locationType === "warehouse" ? warehouse : undefined,
      product,
      quantity_after: quantityAfter,
      reason,
    });
    if (ok) {
      setProduct("");
      setBranch("");
      setWarehouse("");
      setQuantityAfter("");
      setReason("");
      closeBsModal("add-units");
    }
  };

  const branchOptions = branches.map((b) => ({ value: b.value, label: b.label }));
  const warehouseOptions = warehouses.map((w) => ({ value: w.value, label: w.label }));
  const productOptions = products.map((p) => ({ value: p.value, label: p.label }));

  return (
    <div className="modal fade" id="add-units">
      <div className="modal-dialog modal-dialog-centered stock-adjust-modal">
        <div className="modal-content">
          <div className="modal-header">
            <div className="page-title">
              <h4>Add Adjustment</h4>
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
                      Location Type <span className="text-danger">*</span>
                    </label>
                    <select
                      className="form-select"
                      value={locationType}
                      onChange={(e) =>
                        setLocationType(e.target.value as "branch" | "warehouse")
                      }
                    >
                      <option value="branch">Branch (Shop)</option>
                      <option value="warehouse">Warehouse</option>
                    </select>
                  </div>
                </FormCol>
                {locationType === "branch" && (
                  <FormCol lg={12}>
                    <div className="mb-3">
                      <label className="form-label">
                        Shop / Branch <span className="text-danger">*</span>
                      </label>
                      <Select
                        classNamePrefix="react-select"
                        options={branchOptions}
                        placeholder="Select Branch"
                        value={branchOptions.find((o) => o.value === branch) ?? null}
                        onChange={(opt) => setBranch(opt?.value ?? "")}
                      />
                    </div>
                  </FormCol>
                )}
                {locationType === "warehouse" && (
                  <FormCol lg={12}>
                    <div className="mb-3">
                      <label className="form-label">
                        Warehouse <span className="text-danger">*</span>
                      </label>
                      <Select
                        classNamePrefix="react-select"
                        options={warehouseOptions}
                        placeholder="Select Warehouse"
                        value={
                          warehouseOptions.find((o) => o.value === warehouse) ?? null
                        }
                        onChange={(opt) => setWarehouse(opt?.value ?? "")}
                      />
                    </div>
                  </FormCol>
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
                      New Quantity <span className="text-danger">*</span>
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      value={quantityAfter}
                      onChange={(e) => setQuantityAfter(e.target.value)}
                      min="0"
                      step="any"
                    />
                  </div>
                </FormCol>
                <FormCol lg={12}>
                  <div className="summer-description-box">
                    <label className="form-label">Reason / Notes</label>
                    <textarea
                      className="form-control"
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
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
                {saving ? "Creating..." : "Create Adjustment"}
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
