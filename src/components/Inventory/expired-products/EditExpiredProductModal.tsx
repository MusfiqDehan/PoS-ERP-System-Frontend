"use client";

import DateField from "@/core/common/form/DateField";
import SelectField from "@/core/common/form/SelectField";
import TextField from "@/core/common/form/TextField";
import { ProductName } from "@/core/common/selectOption/selectOption";
import { Calendar } from "react-feather";
import Link from "next/link";

export default function EditExpiredProductModal() {
  return (
      <div className="modal fade" id="add-units">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="page-wrapper-new p-0">
              <div className="content">
                <div className="modal-header">
                  <div className="page-title">
                    <h4>Edit Expired Product</h4>
                  </div>
                  <button
                    type="button"
                    className="close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="row">
                      <div className="col-lg-12">
                        <TextField label="SKU" required />
                      </div>
                      <div className="col-lg-12">
                        <SelectField
                          label="Product Name"
                          required
                          options={ProductName}
                          classNamePrefix="react-select"
                        />
                      </div>
                      <div className="col-lg-12">
                        <DateField
                          label="Manufacturer Date"
                          required
                          icon={<Calendar className="info-img" />}
                        />
                      </div>
                      <div className="col-lg-12">
                        <DateField
                          label="Expiry Date"
                          required
                          icon={<Calendar className="info-img" />}
                        />
                      </div>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn me-2 btn-secondary fs-13 fw-medium p-2 px-3"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <Link
                    href="#"
                    data-bs-dismiss="modal"
                    className="btn btn-primary fs-13 fw-medium p-2 px-3"
                  >
                    Save Changes
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
