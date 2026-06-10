import AddIncomeModal from "@/components/FinanceAccounts/Income/AddIncomeModal";
import DeleteIncomeModal from "@/components/FinanceAccounts/Income/DeleteIncomeModal";
import EditIncomeModal from "@/components/FinanceAccounts/Income/EditIncomeModal";
import IncomeTable from "@/components/FinanceAccounts/Income/IncomeTable";
import PageFooter from "@/components/FinanceAccounts/Income/PageFooter";
import PageHeader from "@/components/FinanceAccounts/Income/PageHeader";

export default function Income() {
  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <PageHeader />
          <IncomeTable />
        </div>
        <PageFooter />
      </div>
      <AddIncomeModal />
      <EditIncomeModal />
      <DeleteIncomeModal />
    </>
  );
}
