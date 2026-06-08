"use client";

import Link from "next/link";

export default function SendEmailModal() {
  return (
      <div className="modal fade" id="send-email">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="success-email-send modal-body .custom-modal-body text-center">
              <span className="rounded-circle d-inline-flex p-2 bg-success-transparent mb-2">
                <i className="ti ti-checks fs-24 text-success" />
              </span>
              <h4 className="fs-20 fw-semibold">Success</h4>
              <p>Email Sent Successfully</p>
              <Link
                href="#"
                className="btn btn-primary p-1 px-2 fs-13 fw-normal"
                data-bs-dismiss="modal"
              >
                Close
              </Link>
            </div>
          </div>
        </div>
      </div>
  );
}
