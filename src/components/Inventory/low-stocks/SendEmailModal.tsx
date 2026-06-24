"use client";

import Link from "next/link";

export default function SendEmailModal() {
  return (
    <div className="modal fade" id="send-email">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="p-6 text-center">
            <div className="flex justify-center mb-3">
              <span className="w-16 h-16 inline-flex items-center justify-center rounded-full bg-[#E7FBF7] text-[#0ac79e]">
                <i className="ti ti-checks text-[32px]" />
              </span>
            </div>
            <h4 className="mb-1 text-[20px] font-bold text-[#212B36]">Success</h4>
            <p className="mb-4 text-[14px] text-[#646B72]">Email Sent Successfully</p>
            <Link
              href="#"
              data-bs-dismiss="modal"
              className="inline-flex items-center justify-center px-4 py-2 rounded-[6px] bg-[#0ac79e] text-white text-[14px] font-medium hover:bg-[#089b7c] transition-colors"
            >
              Close
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
