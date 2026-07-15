import React from "react";
import { toolsContent } from "@/data/landing/tools";

const lowStockItems = [
  { img: "/assets/products/vacuum-cleaner.png", name: "Vacuum Cleaner Robot", sku: "ID : 9400047", stock: "10" },
  { img: "/assets/products/dell-xps.png", name: "Dell XPS 13", sku: "ID : 66581478", stock: "03" },
  { img: "/assets/products/kitchenaid-mixer.png", name: "KitchenAid Stand Mixer", sku: "ID : 3255699", stock: "05" },
  { img: "/assets/products/levis-jacket.png", name: "Levi's Trucker Jacket", sku: "ID : 1245886", stock: "02" },
  { img: "/assets/products/lays-classic.png", name: "Lay's Classic", sku: "ID : 3655867", stock: "09" },
];

export function InventoryCard() {
  return (
    <div className="lg:col-span-2 bg-[#F8F8F8] rounded-lg border-[1.3px] border-[#F5F5F5] p-6 md:p-8 flex flex-col overflow-hidden group hover:border-[#089B7C] hover:shadow-lg transition-all duration-300">
      <h3 className="!text-[26px] md:!text-[28px] !font-medium text-black mb-3 leading-tight" style={{ fontFamily: "'Google Sans', 'Roboto', sans-serif" }}>
        {toolsContent.card2.title}
      </h3>
      <p className="text-[#666] text-base leading-[1.5] mb-8" style={{ fontFamily: "'Google Sans', 'Roboto', sans-serif" }}>
        {toolsContent.card2.description}
      </p>

      <div className="mt-auto bg-white border-[1.3px] border-[#F1F1F1] rounded-lg overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b-[1.5px] border-dashed border-[#E7E7E7]">
          <p className="text-[#333] text-lg font-semibold leading-none" style={{ fontFamily: "'Urbanist', sans-serif" }}>
            {toolsContent.card2.mockupHeader}
          </p>
          <button className="border border-[#E7E7E7] rounded-sm px-3 py-1.5 text-[#666] text-sm font-medium leading-none hover:bg-gray-50" style={{ fontFamily: "'Urbanist', sans-serif" }}>
            View All
          </button>
        </div>

        {/* Product List */}
        <div className="px-4 py-4 space-y-6">
          {lowStockItems.map((item) => (
            <div key={item.sku} className="flex items-center gap-2">
              <div className="size-12 bg-[#F6F6F6] rounded overflow-hidden shrink-0">
                <img src={item.img} alt={item.name} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[#333] text-sm font-semibold truncate leading-none mb-1" style={{ fontFamily: "'Urbanist', sans-serif" }}>
                  {item.name}
                </p>
                <p className="text-[#666] text-sm font-medium leading-none" style={{ fontFamily: "'Urbanist', sans-serif" }}>
                  {item.sku}
                </p>
              </div>
              <div className="text-right shrink-0 w-[62px]">
                <p className="text-[#666] text-sm font-medium leading-none mb-1" style={{ fontFamily: "'Urbanist', sans-serif" }}>
                  In Stock
                </p>
                <span className="inline-block w-full bg-[#FFF0F0] text-[#C80000] text-base font-semibold text-center py-1 leading-none" style={{ fontFamily: "'Urbanist', sans-serif" }}>
                  {item.stock}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
