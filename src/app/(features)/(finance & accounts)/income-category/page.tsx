import AddIncomeCategoryModal from "@/components/FinanceAccounts/IncomeCategory/AddIncomeCategoryModal";
import DeleteIncomeCategoryModal from "@/components/FinanceAccounts/IncomeCategory/DeleteIncomeCategoryModal";
import EditIncomeCategoryModal from "@/components/FinanceAccounts/IncomeCategory/EditIncomeCategoryModal";
import IncomeCategoryTable from "@/components/FinanceAccounts/IncomeCategory/IncomeCategoryTable";
import PageFooter from "@/components/FinanceAccounts/IncomeCategory/PageFooter";
import PageHeader from "@/components/FinanceAccounts/IncomeCategory/PageHeader";

export default function IncomeCategory() {
  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <PageHeader />
          <IncomeCategoryTable />
        </div>
        <PageFooter />
      </div>
      <AddIncomeCategoryModal />
      <EditIncomeCategoryModal />
      <DeleteIncomeCategoryModal />
    </>
  );
}
