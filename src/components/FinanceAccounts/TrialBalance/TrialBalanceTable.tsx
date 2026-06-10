"use client";

import TrialBalanceFilters from "./TrialBalanceFilters";
import { trialBalanceColumns } from "./columns";

export default function TrialBalanceTable() {
  return (
    <div className="card table-list-card bg-transparent border-0">
      <TrialBalanceFilters />
      <div className="card-body">
        <div className="table-responsive">
          <table className="table datanew">
            <thead>
              <tr>
                {trialBalanceColumns.map((column) => (
                  <th key={column.key}>{column.title}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border-1 fw-bold text-gray-9">Assets</td>
                <td className="p-2 border-1" />
                <td className="p-2 border-1" />
              </tr>
              <tr>
                <td className="p-2 border-1">Cash in register</td>
                <td className="p-2 border-1">$5,000</td>
                <td className="p-2 border-1" />
              </tr>
              <tr>
                <td className="p-2 border-1">Bank Accounts</td>
                <td className="p-2 border-1">$12,000</td>
                <td className="p-2 border-1" />
              </tr>
              <tr>
                <td className="p-2 border-1">Accounts Receivable</td>
                <td className="p-2 border-1">$3,000</td>
                <td className="p-2 border-1" />
              </tr>
              <tr>
                <td className="p-2 border-1">Inventory (POS stock)</td>
                <td className="p-2 border-1">$10,000</td>
                <td className="p-2 border-1" />
              </tr>
              <tr className="border-bottom">
                <td className="p-2 border-1 fw-bold text-gray-9">
                  Total Assets
                </td>
                <td className="p-2 border-1 fw-bold text-gray-9">$37,000</td>
                <td className="p-2 border-1" />
              </tr>
              <tr>
                <td className="p-2 border-1 fw-bold text-gray-9">
                  Liabilities
                </td>
                <td className="p-2 border-1" />
                <td className="p-2 border-1" />
              </tr>
              <tr>
                <td className="p-2 border-1">Accounts Payable</td>
                <td className="p-2 border-1" />
                <td className="p-2 border-1">$2,000</td>
              </tr>
              <tr>
                <td className="p-2 border-1">Short-term Loans</td>
                <td className="p-2 border-1" />
                <td className="p-2 border-1">$4,000</td>
              </tr>
              <tr>
                <td className="p-2 border-1">Sales Tax Payable</td>
                <td className="p-2 border-1" />
                <td className="p-2 border-1">$500</td>
              </tr>
              <tr>
                <td className="p-2 border-1">Wages Payable</td>
                <td className="p-2 border-1" />
                <td className="p-2 border-1">$1,200</td>
              </tr>
              <tr>
                <td className="p-2 border-1 fw-bold text-gray-9">
                  Total Assets
                </td>
                <td className="p-2 border-1" />
                <td className="p-2 border-1 fw-bold text-gray-9">$20,700</td>
              </tr>
              <tr>
                <td className="bg-secondary-transparent text-gray-9 fw-bold p-3">
                  Total
                </td>
                <td className="bg-secondary-transparent text-gray-9 fw-bold p-3">
                  $37,000
                </td>
                <td className="bg-secondary-transparent text-gray-9 fw-bold p-3">
                  $37,000
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
