"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";

export default function DeleteCompanyModal() {
  return (
          <div className="modal fade" id="delete_modal">
            <div className="modal-dialog modal-dialog-centered modal-sm">
              <div className="modal-content">
                <div className="modal-body text-center">
                  <span className="avatar avatar-xl bg-danger-transparent rounded-circle text-danger mb-3">
                    <i className="ti ti-trash-x fs-36" />
                  </span>
                  <h4 className="mb-1">Confirm Delete</h4>
                  <p className="mb-3">
                    You want to delete all the marked items, this cant be undone once
                    you delete.
                  </p>
                  <div className="d-flex justify-content-center">
                    <Link
                      href="#"
                      className="btn btn-secondary me-3"
                      data-bs-dismiss="modal"
                    >
                      Cancel
                    </Link>
                    <Link href="#" className="btn btn-primary" data-bs-dismiss="modal">
                      Yes, Delete
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
  );
}
