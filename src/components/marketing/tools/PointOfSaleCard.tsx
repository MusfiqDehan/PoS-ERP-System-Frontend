import React from "react";
import { toolsContent } from "@/data/landing/tools";

const products = [
  { img: "/assets/products/wireless-headphones.png", name: "Wireless Headphones pro", sku: "98765478", price: "$42.33", stock: "18 in stock", stockOk: true },
  { img: "/assets/products/usbc-hub.png", name: "USB-C Hub 7-Port", sku: "12567898", price: "$29.99", stock: "12 in stock", stockOk: true },
  { img: "/assets/products/mechanical-keyboard.png", name: "Mechanical Keyboard", sku: "98765478", price: "$89.99", stock: "3 left", stockOk: false },
  { img: "/assets/products/phone-stand.png", name: "Phone Stand MagSafe", sku: "34567890", price: "$14.99", stock: "30 in stock", stockOk: true },
  { img: "/assets/products/organic-oats.png", name: "Organic Oats 1kg", sku: "65783423", price: "$4.49", stock: "30 in stock", stockOk: true },
  { img: "/assets/products/olive-oil.png", name: "Cold-Pressed Olive Oil", sku: "12349804", price: "$12.33", stock: "5 left", stockOk: false },
  { img: "/assets/products/greek-yogurt.png", name: "Greek Yogurt 500g", sku: "45678978", price: "$5.33", stock: "21 in stock", stockOk: true },
  { img: "/assets/products/coffee-beans.png", name: "Coffee Beans 500g", sku: "23456703", price: "$48.00", stock: "84 in stock", stockOk: true },
  { img: "/assets/products/vitamin-c.png", name: "Vitamin C 1000mg", sku: "78902312", price: "$12.99", stock: "2 left", stockOk: false },
  { img: "/assets/products/hand-sanitizer.png", name: "Hand Sanitizer 250ml", sku: "98765478", price: "$42.33", stock: "18 in stock", stockOk: true },
  { img: "/assets/products/omega3.png", name: "Omega-3 Fish Oil", sku: "09654788", price: "$14.99", stock: "25 in stock", stockOk: true },
  { img: "/assets/products/thermometer.png", name: "Digital Thermometer", sku: "89076543", price: "$8.99", stock: "No Stock", stockOk: false },
  { img: "/assets/products/canvas-sneakers.png", name: "Canvas Sneakers", sku: "33445566", price: "$69.99", stock: "12 in stock", stockOk: true },
  { img: "/assets/products/merino-scarf.png", name: "Merino Wool Scarf", sku: "55667788", price: "$34.90", stock: "17 in stock", stockOk: true },
  { img: "/assets/products/cotton-shirt.png", name: "Cotton Linen Shirt", sku: "11223344", price: "$49.99", stock: "No Stock", stockOk: false },
];

const categories = [
  { name: "All Products", count: "1012", active: true },
  { name: "Electronics", count: "78" },
  { name: "Grocery", count: "213" },
  { name: "Health", count: "101" },
  { name: "Clothing", count: "76" },
  { name: "Household", count: "53" },
  { name: "Baby & Care" },
];

export function PointOfSaleCard() {
  return (
    <div className="lg:col-span-3 bg-[#F8F8F8] rounded-lg border-[1.3px] border-[#F5F5F5] p-6 md:p-8 flex flex-col overflow-hidden group hover:border-[#089B7C] hover:shadow-lg transition-all duration-300">
      <h3 className="!text-[26px] md:!text-[28px] !font-medium text-black mb-3 leading-tight" style={{ fontFamily: "'Google Sans', 'Roboto', sans-serif" }}>
        {toolsContent.card1.title}
      </h3>
      <p className="text-[#666] text-base leading-[1.5] max-w-lg mb-8" style={{ fontFamily: "'Google Sans', 'Roboto', sans-serif" }}>
        {toolsContent.card1.description}
      </p>

      <div className="mt-auto bg-white border-[1.3px] border-[#F1F1F1] rounded-lg overflow-hidden">
        <div className="px-4 pt-4 pb-3">
          <p className="text-[#333] text-base font-semibold mb-4 leading-none" style={{ fontFamily: "'Urbanist', sans-serif" }}>
            {toolsContent.card1.mockupHeader}
          </p>

          {/* Search + Action Bar */}
          <div className="flex gap-3 items-center mb-3 flex-wrap">
            <div className="flex-1 min-w-[160px] flex items-center border border-[#E7E7E7] rounded h-10 shadow-[0px_4px_60px_0px_rgba(231,231,231,0.48)] overflow-hidden">
              <div className="flex items-center gap-[5px] pl-2.5 flex-1">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                <span className="text-[#666] text-sm font-medium leading-[18px] truncate" style={{ fontFamily: "'Urbanist', sans-serif" }}>
                  Search Product
                </span>
              </div>
              <div className="bg-[#E7E7E7] rounded-sm size-7 flex items-center justify-center mr-1 shrink-0">
                <span className="text-[#666] text-sm font-medium leading-[18px]" style={{ fontFamily: "'Urbanist', sans-serif" }}>⌘K</span>
              </div>
            </div>

            <button className="flex items-center gap-1 border border-[#E7E7E7] rounded h-10 px-3 shadow-[0px_4px_60px_0px_rgba(231,231,231,0.48)] hover:bg-gray-50 shrink-0">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="4" y="3" width="13" height="14" rx="1.5" stroke="#999" strokeWidth="1.5"/><path d="M6 7h8M6 10h8M6 13h5" stroke="#999" strokeWidth="1.2"/></svg>
              <span className="text-[#666] text-sm font-medium leading-[18px]" style={{ fontFamily: "'Urbanist', sans-serif" }}>Scan</span>
            </button>

            <button className="flex items-center gap-1 border border-[#E7E7E7] rounded h-10 px-3 shadow-[0px_4px_60px_0px_rgba(231,231,231,0.48)] hover:bg-gray-50 shrink-0">
              <div className="grid grid-cols-2 gap-[2px] size-4">
                <div className="bg-[#999] rounded-[1px]" /><div className="bg-[#999] rounded-[1px]" />
                <div className="bg-[#999] rounded-[1px]" /><div className="bg-[#999] rounded-[1px]" />
              </div>
              <span className="text-[#666] text-sm font-medium leading-[18px]" style={{ fontFamily: "'Urbanist', sans-serif" }}>Category</span>
            </button>

            <button className="flex items-center gap-1 border border-[#E7E7E7] rounded h-10 px-3 shadow-[0px_4px_60px_0px_rgba(231,231,231,0.48)] hover:bg-gray-50 shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
              <span className="text-[#666] text-sm font-medium leading-[18px]" style={{ fontFamily: "'Urbanist', sans-serif" }}>Brand</span>
            </button>

            <button className="border border-[#E7E7E7] rounded size-10 flex items-center justify-center shadow-[0px_4px_60px_0px_rgba(231,231,231,0.48)] hover:bg-gray-50 relative shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
              <span className="absolute top-[calc(50%-8px)] right-[calc(50%-8px)] size-2.5 bg-[#C80000] rounded-full" />
            </button>
          </div>

          {/* Category Pills */}
          <div className="flex gap-3 overflow-x-auto pb-0.5">
            {categories.map((cat) => (
              <button
                key={cat.name}
                className={`flex items-center gap-1 px-3 py-2 rounded text-sm font-medium leading-[18px] shrink-0 transition-colors ${
                  cat.active
                    ? "bg-[#E7FBF7] text-[#089B7C] drop-shadow-[0px_4px_30px_rgba(231,231,231,0.48)]"
                    : "border border-[#E7E7E7] text-[#666] shadow-[0px_4px_60px_0px_rgba(231,231,231,0.48)] hover:bg-gray-50"
                }`}
                style={{ fontFamily: "'Urbanist', sans-serif" }}
              >
                {cat.name}
                {cat.count &&
                  <span className={`px-2 py-0.5 rounded-sm text-sm font-medium leading-[18px] ${cat.active ? "bg-[#089B7C] text-white" : "bg-[#F1F1F1] text-[#666]"}`} style={{ fontFamily: "'Urbanist', sans-serif" }}>
                    {cat.count}
                  </span>
                }
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid — images clipped to half height, card height reduced */}
        <div className="px-4 pb-3">
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5">
            {products.map((item) => (
              <div key={item.name + item.sku} className="bg-white rounded p-2">
                <div className="bg-[#F6F6F6] rounded h-10 overflow-hidden">
                  <img src={item.img} alt={item.name} className="w-full h-20 object-cover" loading="lazy" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scrollbar */}
        <div className="px-4 pb-4">
          <div className="h-1.5 bg-[#F1F1F1] rounded-full">
            <div className="h-full w-[15%] bg-[#089B7C] rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
