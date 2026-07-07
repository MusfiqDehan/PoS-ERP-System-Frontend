"use client";

import { useState, FormEvent } from "react";
import Select from "react-select";
import FormCol from "@/core/common/form/FormCol";
import type { BranchOption, WarehouseOption, ProductOption } from "@/hooks/stock/useManageStocks";

type Props = {
  branches: BranchOption[];
  warehouses: WarehouseOption[];
  products: ProductOption[];
  onSubmit: (payload: {
    location_type: "branch" | "warehouse";
    branch?: string;
    warehouse?: string;
    product: string;
    qty_alert?: string;
  }) => Promise<boolean>;
};

export default function AddStockModal({ branches, warehouses, products, onSubmit }: Props) {
  const [locationType, setLocationType] = useState<"branch" | "warehouse">("branch");
  const [branch, setBranch] = useState<string>("");
  const [warehouse, setWarehouse] = useState<string>("");
  const [product, setProduct] = useState<string>("");
  const [qtyAlert, setQtyAlert] = useState<string>("10");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!product) return;
    setSubmitting(true);
    const ok = await onSubmit({
      location_type: locationType,
      branch: locationType === "branch" ? branch : undefined,
      warehouse: locationType === "warehouse" ? warehouse : undefined,
      product,
      qty_alert: qtyAlert,
    });
    setSubmitting(false);
    if (ok) {
      setProduct("");
      setBranch("");
      setWarehouse("");
      setQtyAlert("10");
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
            <div className="page-title"><h4>Add Stock</h4></div>
            <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="row">
                <FormCol lg={12}>
                  <div className="mb-3">
                    <label className="form-label">Location Type <span className="text-danger">*</span></label>
                    <select className="form-select" value={locationType} onChange={(e) => setLocationType(e.target.value as "branch" | "warehouse")}>
                      <option value="branch">Branch</option>
                      <option value="warehouse">Warehouse</option>
                    </select>
                  </div>
                </FormCol>
                {locationType === "branch" && (
                  <FormCol lg={12}>
                    <div className="mb-3">
                      <label className="form-label">Branch <span className="text-danger">*</span></label>
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
                      <label className="form-label">Warehouse <span className="text-danger">*</span></label>
                      <Select
                        classNamePrefix="react-select"
                        options={warehouseOptions}
                        placeholder="Select Warehouse"
                        value={warehouseOptions.find((o) => o.value === warehouse) ?? null}
                        onChange={(opt) => setWarehouse(opt?.value ?? "")}
                      />
                    </div>
                  </FormCol>
                )}
                <FormCol lg={12}>
                  <div className="mb-3">
                    <label className="form-label">Product <span className="text-danger">*</span></label>
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
                    <label className="form-label">Alert Quantity</label>
                    <input type="number" className="form-control" value={qtyAlert} onChange={(e) => setQtyAlert(e.target.value)} min="0" />
                  </div>
                </FormCol>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary me-2" data-bs-dismiss="modal">Cancel</button>
              <button type="submit" className="btn btn-primary" disabled={submitting || !product}>
                {submitting ? "Adding..." : "Add Stock"}
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
