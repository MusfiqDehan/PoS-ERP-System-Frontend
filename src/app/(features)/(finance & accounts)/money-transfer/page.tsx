import AddMoneyTransferModal from "@/components/FinanceAccounts/MoneyTransfer/AddMoneyTransferModal";
import DeleteMoneyTransferModal from "@/components/FinanceAccounts/MoneyTransfer/DeleteMoneyTransferModal";
import EditMoneyTransferModal from "@/components/FinanceAccounts/MoneyTransfer/EditMoneyTransferModal";
import MoneyTransferTable from "@/components/FinanceAccounts/MoneyTransfer/MoneyTransferTable";
import PageHeader from "@/components/FinanceAccounts/MoneyTransfer/PageHeader";
import CommonFooter from "@/core/common/footer/commonFooter";

export default function MoneyTransfer() {
  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <PageHeader />
          <MoneyTransferTable />
        </div>
        <CommonFooter />
      </div>
      <AddMoneyTransferModal />
      <EditMoneyTransferModal />
      <DeleteMoneyTransferModal />
    </>
  );
}
