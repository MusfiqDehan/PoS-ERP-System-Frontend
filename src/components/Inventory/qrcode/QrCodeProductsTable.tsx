"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { MinusCircle, PlusCircle } from "react-feather";

type QrCodeProductsTableProps = {
  onDecrement: () => void;
  onIncrement: () => void;
};

const rows = [
  {
    name: "Nike Jordan",
    sku: "PT002",
    code: "HG3FK",
    ref: "32RRR554",
    img: "assets/img/products/stock-img-02.png",
  },
];

export default function QrCodeProductsTable({
  onDecrement,
  onIncrement,
}: QrCodeProductsTableProps) {
  return (
    <div className="mt-4 rounded-[8px] border border-[#f1f1f1] bg-[#f9fafb] p-3 sm:p-4">
      <div className="overflow-x-auto rounded-md border border-[#e7e7e7] bg-white">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#e7e7e7] text-[13px] text-[#646B72]">
              <th className="px-3 py-2.5 font-semibold">Product</th>
              <th className="px-3 py-2.5 font-semibold">SKU</th>
              <th className="px-3 py-2.5 font-semibold">Code</th>
              <th className="px-3 py-2.5 font-semibold">Reference Number</th>
              <th className="px-3 py-2.5 font-semibold">Qty</th>
              <th className="px-3 py-2.5" />
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.sku} className="border-b border-[#f1f1f1] last:border-0 text-[14px] text-[#212B36]">
                <td className="px-3 py-2.5">
                  <div className="flex items-center gap-2">
                    <Link
                      href="#"
                      className="w-10 h-10 rounded-md border border-[#f1f1f1] overflow-hidden flex items-center justify-center shrink-0"
                    >
                      <img src={row.img} alt="product" className="w-full h-full object-cover" />
                    </Link>
                    <Link href="#" className="font-medium hover:text-[#0ac79e]">{row.name}</Link>
                  </div>
                </td>
                <td className="px-3 py-2.5">{row.sku}</td>
                <td className="px-3 py-2.5">{row.code}</td>
                <td className="px-3 py-2.5">{row.ref}</td>
                <td className="px-3 py-2.5">
                  <div className="inline-flex items-center border border-[#e7e7e7] rounded-md overflow-hidden">
                    <button
                      type="button"
                      onClick={onDecrement}
                      className="px-2 py-1.5 text-[#646B72] hover:bg-[#f6f6f6]"
                    >
                      <MinusCircle size={14} />
                    </button>
                    <input
                      type="text"
                      className="w-12 text-center border-x border-[#e7e7e7] py-1.5 text-[14px] focus:outline-none"
                      defaultValue={4}
                    />
                    <button
                      type="button"
                      onClick={onIncrement}
                      className="px-2 py-1.5 text-[#646B72] hover:bg-[#f6f6f6]"
                    >
                      <PlusCircle size={14} />
                    </button>
                  </div>
                </td>
                <td className="px-3 py-2.5 text-center">
                  <Link
                    data-bs-toggle="modal"
                    data-bs-target="#delete-modal"
                    href="#"
                    className="w-8 h-8 inline-flex items-center justify-center border border-[#e7e7e7] rounded text-[#646B72] hover:text-[#c80000] hover:border-[#c80000] transition-colors"
                  >
                    <i className="ti ti-trash" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
