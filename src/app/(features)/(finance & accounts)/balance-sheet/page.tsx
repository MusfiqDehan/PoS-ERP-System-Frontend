import PageHeader from "@/components/FinanceAccounts/BalanceSheet/PageHeader";
import BalanceSheetTable from "@/components/FinanceAccounts/BalanceSheet/BalanceSheetTable";
import CommonFooter from "@/core/common/footer/commonFooter";

export default function BalanceSheet() {
  return (
    <div className="page-wrapper">
      <div className="content">
        <PageHeader />
        <BalanceSheetTable />
      </div>
      <CommonFooter />
    </div>
  );
}
