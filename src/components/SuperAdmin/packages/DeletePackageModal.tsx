"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";

export default function DeletePackageModal() {
  return (
          <div className="modal fade" id="delete_modal">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-body text-center">
                  <span className="avatar avatar-xl bg-danger-transparent rounded-circle text-danger mb-3">
                    <i className="ti ti-trash fs-36" />
                  </span>
                  <h4 className="mb-1">Delete Packages</h4>
                  <p className="mb-3">
                    Are you sure you want to delete package?
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
