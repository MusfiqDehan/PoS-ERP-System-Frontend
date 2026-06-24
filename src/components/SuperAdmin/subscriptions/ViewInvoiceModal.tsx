"use client";
/* eslint-disable @next/next/no-img-element */

export default function ViewInvoiceModal() {
  return (
    <div className="modal fade" id="view_invoice">
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content relative">
          <button
            type="button"
            data-bs-dismiss="modal"
            aria-label="Close"
            className="absolute top-4 right-4 w-7 h-7 inline-flex items-center justify-center rounded-md text-[#646B72] hover:bg-[#f6f6f6]"
          >
            <i className="ti ti-x" />
          </button>
          <div className="p-6 sm:p-8">
            <div className="flex justify-between items-start flex-wrap gap-4 mb-5">
              <img src="assets/img/brand/sortorium-logo.png" className="max-w-[160px]" alt="logo" />
              <div className="text-right">
                <h5 className="text-[18px] font-bold text-[#212B36] mb-1">Invoice</h5>
                <p className="m-0 text-[13px] text-[#646B72] flex items-center justify-end gap-1">
                  <i className="ti ti-file-invoice" /> INV0287
                </p>
                <p className="m-0 text-[13px] text-[#646B72] flex items-center justify-end gap-1">
                  <i className="ti ti-calendar" /> Issue date : 12 Sep 2024
                </p>
                <p className="m-0 text-[13px] text-[#646B72] flex items-center justify-end gap-1">
                  <i className="ti ti-calendar" /> Due date : 12 Oct 2024
                </p>
              </div>
            </div>

            <div className="flex justify-between flex-wrap gap-4 mb-5">
              <div>
                <p className="text-[15px] font-medium text-[#212B36] mb-2">Invoice From :</p>
                <p className="m-0 text-[14px] text-[#646B72]">SmartHR</p>
                <p className="m-0 text-[14px] text-[#646B72]">367 Hillcrest Lane, Irvine, California, United States</p>
                <p className="m-0 text-[14px] text-[#646B72]">smarthr@example.com</p>
              </div>
              <div className="sm:text-right">
                <p className="text-[15px] font-medium text-[#212B36] mb-2">Invoice To :</p>
                <p className="m-0 text-[14px] text-[#646B72]">BrightWave Innovations</p>
                <p className="m-0 text-[14px] text-[#646B72]">367 Hillcrest Lane, Irvine, California, United States</p>
                <p className="m-0 text-[14px] text-[#646B72]">michael@example.com</p>
              </div>
            </div>

            <div className="overflow-x-auto mb-5 border border-[#f1f1f1] rounded-md">
              <table className="w-full text-[14px]">
                <thead>
                  <tr className="bg-[#f8f9fa] text-[#212B36] text-left">
                    <th className="p-3 font-semibold">Plan</th>
                    <th className="p-3 font-semibold">Billing Cycle</th>
                    <th className="p-3 font-semibold">Created Date</th>
                    <th className="p-3 font-semibold">Expiring On</th>
                    <th className="p-3 font-semibold text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="text-[#646B72]">
                    <td className="p-3">Advanced (Monthly)</td>
                    <td className="p-3">30 Days</td>
                    <td className="p-3">12 Sep 2024</td>
                    <td className="p-3">12 Oct 2024</td>
                    <td className="p-3 text-right font-semibold text-[#212B36]">$200</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex justify-between flex-wrap gap-6 mb-5">
              <div>
                <h6 className="text-[14px] font-semibold text-[#212B36] mb-3">Payment info:</h6>
                <p className="m-0 text-[14px] text-[#646B72]">Credit Card - 123***********789</p>
                <div className="flex items-center justify-between gap-8 mt-1">
                  <p className="m-0 text-[14px] text-[#646B72]">Amount</p>
                  <p className="m-0 text-[14px] font-medium text-[#212B36]">$200.00</p>
                </div>
              </div>
              <div className="min-w-[220px]">
                <div className="flex items-center justify-between mb-1">
                  <p className="m-0 text-[14px] font-medium text-[#212B36]">Sub Total</p>
                  <p className="m-0 text-[14px] text-[#646B72]">$200.00</p>
                </div>
                <div className="flex items-center justify-between mb-1">
                  <p className="m-0 text-[14px] font-medium text-[#212B36]">Tax</p>
                  <p className="m-0 text-[14px] text-[#646B72]">$0.00</p>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-[#f1f1f1]">
                  <p className="m-0 text-[14px] font-semibold text-[#212B36]">Total</p>
                  <p className="m-0 text-[14px] font-semibold text-[#212B36]">$200.00</p>
                </div>
              </div>
            </div>

            <div className="border border-[#f1f1f1] rounded-md p-4">
              <p className="text-[14px] font-medium text-[#212B36] mb-2">Terms &amp; Conditions:</p>
              <p className="text-[12px] text-[#646B72] flex items-start gap-1 mb-2">
                <i className="ti ti-point-filled text-[#0ac79e] mt-[2px]" /> All payments must be made according to the agreed schedule. Late payments may incur additional fees.
              </p>
              <p className="text-[12px] text-[#646B72] flex items-start gap-1 m-0">
                <i className="ti ti-point-filled text-[#0ac79e] mt-[2px]" /> We are not liable for any indirect, incidental, or consequential damages, including loss of profits, revenue, or data.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
