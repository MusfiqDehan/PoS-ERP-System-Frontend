import React from "react";
import { toolsContent } from "@/data/landing/tools";

const branches = [
  { sn: "1.", name: "Mirpur-12", code: "DHK-01", city: "Dhaka", sales: "$221,840", target: "220.0k", achievement: 100.8, achievementText: "+0.8%", positive: true, margin: "21.4%", txns: "388", basket: "$572", stockValue: "5.21M", status: "Open", alerts: "2 Alerts" },
  { sn: "2.", name: "Mirpur-10", code: "DHK-02", city: "Dhaka", sales: "$184,250", target: "200.0k", achievement: 92.1, achievementText: "-7.9%", positive: false, margin: "18.2%", txns: "412", basket: "$447", stockValue: "4.82M", status: "Open", alerts: "2 Alerts" },
  { sn: "3.", name: "Uttara-07", code: "DHK-04", city: "Dhaka", sales: "$162,110", target: "180.0k", achievement: 90.1, achievementText: "-9.9%", positive: false, margin: "21.4%", txns: "351", basket: "$462", stockValue: "4.11M", status: "Open", alerts: "2 Alerts" },
  { sn: "4.", name: "Gulshan-01", code: "DHK-05", city: "Dhaka", sales: "$141,060", target: "150.0k", achievement: 94.0, achievementText: "-6.0%", positive: false, margin: "21.4%", txns: "309", basket: "$456", stockValue: "3.92M", status: "Open", alerts: "2 Alerts" },
  { sn: "5.", name: "Rajshahi-03", code: "RAJ-01", city: "Rajshahi", sales: "$119,720", target: "130.0k", achievement: 92.1, achievementText: "-7.9%", positive: false, margin: "21.4%", txns: "282", basket: "$424", stockValue: "3.64M", status: "Open", alerts: "2 Alerts" },
  { sn: "6.", name: "Banani-02", code: "DHK-08", city: "Dhaka", sales: "$94,420", target: "160.0k", achievement: 61.5, achievementText: "-38.5%", positive: false, margin: "17.1%", txns: "224", basket: "$439", stockValue: "3.38M", status: "Open", alerts: "2 Alerts" },
  { sn: "7.", name: "Agrabad-01", code: "CTG-01", city: "Chittagong", sales: "$98,420", target: "100.0k", achievement: 88.9, achievementText: "-11.1%", positive: false, margin: "21.4%", txns: "198", basket: "$449", stockValue: "2.71M", status: "Open", alerts: "2 Alerts" },
  { sn: "8.", name: "Khulna-01", code: "KHL-02", city: "Khulna", sales: "$76,210", target: "90.0k", achievement: 84.7, achievementText: "-15.3%", positive: false, margin: "21.4%", txns: "174", basket: "$438", stockValue: "2.44M", status: "Close", alerts: "0 Alerts" },
];

const filters = ["Sales", "Target", "Margin", "Stock"];

const colHeadings = ["SN", "Brach", "City", "Sales Today", "Target", "Achievement", "Margin", "Txns", "Basket", "Stock Value", "Status"];

const colWidths = [20, 88, 88, 108, 88, 120, 68, 64, 80, 85, 104];

export function MultiBranchCard() {
  return (
    <div className="lg:col-span-2 bg-[#F8F8F8] rounded-lg border-[1.3px] border-[#F5F5F5] p-6 md:p-8 flex flex-col overflow-hidden group hover:border-[#089B7C] hover:shadow-lg transition-all duration-300">
      <h3 className="!text-[26px] md:!text-[28px] !font-medium text-black mb-3 leading-tight" style={{ fontFamily: "'Google Sans', 'Roboto', sans-serif" }}>
        {toolsContent.card3.title}
      </h3>
      <p className="text-[#666] text-base leading-[1.5] mb-8" style={{ fontFamily: "'Google Sans', 'Roboto', sans-serif" }}>
        {toolsContent.card3.description}
      </p>

      <div className="mt-auto bg-white border-[1.3px] border-[#F1F1F1] rounded-lg overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 pt-4 pb-3 flex-wrap gap-2">
          <p className="text-[#333] text-lg font-semibold leading-none" style={{ fontFamily: "'Urbanist', sans-serif" }}>
            {toolsContent.card3.mockupHeader}
          </p>
          <div className="flex gap-1">
            {filters.map((f, i) => (
              <button
                key={f}
                className={`px-4 py-2 rounded text-sm font-medium leading-none ${
                  i === 0 ? "bg-[#E7FBF7] text-[#089B7C]" : "border border-[#E7E7E7] text-[#666] hover:bg-gray-50"
                }`}
                style={{ fontFamily: "'Urbanist', sans-serif" }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Table — clipped to show header + 4 rows only */}
        <div className="overflow-x-auto overflow-y-hidden" style={{ maxHeight: 195 }}>
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-t border-b border-[#089B7C]/30">
                {colHeadings.map((h, i) => (
                  <th
                    key={h}
                    className="py-2.5 px-0 text-left text-[#333] text-base font-semibold leading-none first:pl-4 last:pr-4"
                    style={{ fontFamily: "'Urbanist', sans-serif", width: colWidths[i], minWidth: colWidths[i] }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {branches.map((branch) => (
                <tr key={branch.sn} className="border-b border-[#E7E7E7]">
                  <td className="py-3 pl-4 text-[#666] text-sm font-medium leading-none" style={{ fontFamily: "'Urbanist', sans-serif", width: 20 }}>
                    {branch.sn}
                  </td>
                  <td className="py-3" style={{ width: 88 }}>
                    <p className="text-[#333] text-sm font-semibold leading-none" style={{ fontFamily: "'Urbanist', sans-serif" }}>{branch.name}</p>
                    <p className="text-[#646B72] text-xs font-medium leading-none mt-0.5" style={{ fontFamily: "'Urbanist', sans-serif" }}>{branch.code}</p>
                  </td>
                  <td className="py-3 text-sm text-[#666] leading-none" style={{ width: 88, fontFamily: "'Geist', sans-serif" }}>
                    {branch.city}
                  </td>
                  <td className="py-3 text-sm font-medium text-[#089B7C] leading-none" style={{ width: 108, fontFamily: "'Urbanist', sans-serif" }}>
                    {branch.sales}
                  </td>
                  <td className="py-3 text-sm text-[#666] leading-none" style={{ width: 88, fontFamily: "'Geist', sans-serif" }}>
                    {branch.target}
                  </td>
                  <td className="py-3" style={{ width: 120 }}>
                    <div className="relative h-6 rounded overflow-hidden">
                      <div className={`absolute h-1 rounded-sm top-[10px] left-0 w-[70px] ${branch.positive ? "bg-[#E7FBF7]" : "bg-[#E7E7E7]"}`}>
                        <div
                          className={`absolute left-0 top-0 h-full rounded-sm ${branch.positive ? "bg-[#089B7C]" : "bg-[#E5950D]"}`}
                          style={{ width: `${Math.min(branch.achievement, 100)}%` }}
                        />
                      </div>
                      <span
                        className={`absolute text-sm font-medium leading-none top-[4px] left-[78px] ${branch.positive ? "text-[#666]" : "text-[#E5950D]"}`}
                        style={{ fontFamily: "'Urbanist', sans-serif" }}
                      >
                        {branch.achievementText}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 text-sm text-[#666] leading-none" style={{ width: 68, fontFamily: "'Geist', sans-serif" }}>
                    {branch.margin}
                  </td>
                  <td className="py-3 text-sm text-[#666] leading-none" style={{ width: 64, fontFamily: "'Geist', sans-serif" }}>
                    {branch.txns}
                  </td>
                  <td className="py-3 text-sm text-[#666] leading-none" style={{ width: 80, fontFamily: "'Geist', sans-serif" }}>
                    {branch.basket}
                  </td>
                  <td className="py-3 text-sm text-[#666] leading-none" style={{ width: 85, fontFamily: "'Geist', sans-serif" }}>
                    {branch.stockValue}
                  </td>
                  <td className="py-3" style={{ width: 104 }}>
                    <div className="flex items-center gap-1 text-sm leading-none" style={{ fontFamily: "'Geist', sans-serif" }}>
                      <span className={branch.status === "Open" ? "text-[#666]" : "text-[#C80303]"}>{branch.status}</span>
                      <span className="text-[#C80303]">{branch.alerts}</span>
                    </div>
                  </td>
                  <td className="py-3 pr-4">
                    <button className="flex items-center gap-0.5 text-sm text-[#089B7C] leading-none hover:underline" style={{ fontFamily: "'Geist', sans-serif" }}>
                      View
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
