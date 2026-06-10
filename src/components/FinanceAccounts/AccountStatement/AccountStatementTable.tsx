"use client";

import Table from "@/core/common/pagination/datatable";
import AccountStatementFilters from "./AccountStatementFilters";
import { accountStatementColumns } from "./columns";
import { useAccountStatement } from "./useAccountStatement";

export default function AccountStatementTable() {
  const { dataSource } = useAccountStatement();

  return (
    <>
      <AccountStatementFilters />
      <div className="card">
        <div className="card-header">
          <h4>
            Statement of Account :{" "}
            <span className="badge bg-soft-primary">HBSC - 3298784309485</span>
          </h4>
        </div>
        <div className="table-responsive">
          <Table
            columns={accountStatementColumns}
            dataSource={dataSource}
            footer={() => (
              <>
                <div className="d-flex align-items-center justify-content-between">
                  <h5>Total</h5>
                  <h5>$33268.53</h5>
                </div>
              </>
            )}
          />
        </div>
      </div>
    </>
  );
}
