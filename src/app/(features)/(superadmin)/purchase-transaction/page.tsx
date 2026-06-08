import CommonFooter from "@/core/common/footer/commonFooter";
import DeletePurchaseTransactionModal from "@/components/SuperAdmin/purchase-transaction/DeletePurchaseTransactionModal";
import PageHeader from "@/components/SuperAdmin/purchase-transaction/PageHeader";
import PurchaseTransactionsTable from "@/components/SuperAdmin/purchase-transaction/PurchaseTransactionsTable";
import ViewInvoiceModal from "@/components/SuperAdmin/purchase-transaction/ViewInvoiceModal";

export default function PurchaseTransaction() {
  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <PageHeader />
          <PurchaseTransactionsTable />
        </div>
        <CommonFooter />
      </div>
      <ViewInvoiceModal />
      <DeletePurchaseTransactionModal />
    </>
  );
}
