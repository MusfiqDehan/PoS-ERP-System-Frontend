import PageHeader from "@/components/FinanceAccounts/TrialBalance/PageHeader";
import TrialBalanceTable from "@/components/FinanceAccounts/TrialBalance/TrialBalanceTable";
import CommonFooter from "@/core/common/footer/commonFooter";

export default function TrialBalance() {
  return (
    <div>
      <div className="page-wrapper">
        <div className="content">
          <PageHeader />
          <TrialBalanceTable />
        </div>
        <CommonFooter />
      </div>
    </div>
  );
}
