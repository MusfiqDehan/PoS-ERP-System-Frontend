import PageHeader from "@/components/FinanceAccounts/CashFlow/PageHeader";
import CashFlowTable from "@/components/FinanceAccounts/CashFlow/CashFlowTable";
import PageFooter from "@/components/FinanceAccounts/CashFlow/PageFooter";

export default function CashFlow() {
  return (
    <div className="page-wrapper">
      <div className="content">
        <PageHeader />
        <CashFlowTable />
      </div>
      <PageFooter />
    </div>
  );
}
