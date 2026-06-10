import AddExpenseModal from "@/components/FinanceAccounts/ExpenseList/AddExpenseModal";
import DeleteExpenseModal from "@/components/FinanceAccounts/ExpenseList/DeleteExpenseModal";
import EditExpenseModal from "@/components/FinanceAccounts/ExpenseList/EditExpenseModal";
import ExpenseListTable from "@/components/FinanceAccounts/ExpenseList/ExpenseListTable";
import PageFooter from "@/components/FinanceAccounts/ExpenseList/PageFooter";
import PageHeader from "@/components/FinanceAccounts/ExpenseList/PageHeader";

export default function ExpenseList() {
  return (
    <div>
      <div className="page-wrapper">
        <div className="content">
          <PageHeader />
          <ExpenseListTable />
        </div>
        <PageFooter />
      </div>
      <DeleteExpenseModal />
      <AddExpenseModal />
      <EditExpenseModal />
    </div>
  );
}
