"use client";

import { PermissionGuard } from "@/components/auth/PermissionGuard";
import AddExpenseCategoryModal from "@/components/FinanceAccounts/ExpenseCategory/AddExpenseCategoryModal";
import AddStoreModal from "@/components/FinanceAccounts/ExpenseCategory/AddStoreModal";
import DeleteExpenseModal from "@/components/FinanceAccounts/ExpenseCategory/DeleteExpenseModal";
import EditExpenseCategoryModal from "@/components/FinanceAccounts/ExpenseCategory/EditExpenseCategoryModal";
import EditStoreModal from "@/components/FinanceAccounts/ExpenseCategory/EditStoreModal";
import ExpenseCategoryTable from "@/components/FinanceAccounts/ExpenseCategory/ExpenseCategoryTable";
import PageFooter from "@/components/FinanceAccounts/ExpenseCategory/PageFooter";
import PageHeader from "@/components/FinanceAccounts/ExpenseCategory/PageHeader";

export default function ExpenseCategory() {
  return (
    <PermissionGuard featureKey="expenses">
      <div>
        <div className="page-wrapper">
          <div className="content">
            <PageHeader />
            <ExpenseCategoryTable />
          </div>
          <PageFooter />
          <AddStoreModal />
          <EditStoreModal />
        </div>
        <AddExpenseCategoryModal />
        <EditExpenseCategoryModal />
        <DeleteExpenseModal />
      </div>
    </PermissionGuard>
  );
}
