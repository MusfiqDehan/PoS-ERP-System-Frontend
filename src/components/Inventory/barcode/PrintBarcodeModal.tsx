"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";

const groups = [
  {
    title: "Nike Jordan",
    cards: [
      { store: "Grocery Alpha", product: "Nike Jordan", price: "$400", img: "./assets/img/barcode/barcode-01.png" },
      { store: "Grocery Alpha", product: "Nike Jordan", price: "$400", img: "./assets/img/barcode/barcode-01.png" },
      { store: "Grocery Alpha", product: "Nike Jordan", price: "$400", img: "./assets/img/barcode/barcode-01.png" },
    ],
  },
  {
    title: "Apple Series 5 Watch",
    cards: [
      { store: "Grocery Alpha", product: "Apple Series 5 Watch", price: "$300", img: "./assets/img/barcode/barcode-02.png" },
    ],
  },
];

export default function PrintBarcodeModal() {
  return (
    <div className="modal fade" id="prints-barcode">
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="flex items-center justify-between p-4 border-b border-[#f1f1f1]">
            <h4 className="m-0 text-[18px] font-bold text-[#212B36]">Barcode</h4>
            <button
              type="button"
              data-bs-dismiss="modal"
              aria-label="Close"
              className="w-7 h-7 inline-flex items-center justify-center rounded-md bg-[#dc3545] text-white text-[16px] hover:bg-[#c82333]"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="p-4">
            <div className="flex justify-end mb-4">
              <Link
                href="#"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-[6px] bg-[#dc3545] text-white text-[14px] font-medium hover:bg-[#c82333] transition-colors"
              >
                <i className="fas fa-print" />
                Print Barcode
              </Link>
            </div>
            {groups.map((g) => (
              <div key={g.title} className="mb-5 last:mb-0">
                <h5 className="text-[15px] font-semibold text-[#212B36] border-b border-[#f1f1f1] pb-2 mb-4">
                  {g.title}
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {g.cards.map((c, i) => (
                    <div
                      key={i}
                      className="text-center border border-[#f1f1f1] rounded-md p-3"
                    >
                      <h6 className="text-[14px] font-semibold text-[#212B36]">{c.store}</h6>
                      <p className="m-0 text-[13px] text-[#646B72]">{c.product}</p>
                      <p className="mb-2 text-[13px] text-[#646B72]">Price: {c.price}</p>
                      <img src={c.img} alt="Barcode" className="mx-auto max-h-[60px]" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
