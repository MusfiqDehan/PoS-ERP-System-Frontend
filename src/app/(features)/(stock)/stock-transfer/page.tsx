import AddTransferModal from "@/components/stock/stock-transfer/AddTransferModal";
import EditTransferModal from "@/components/stock/stock-transfer/EditTransferModal";
import ImportTransferModal from "@/components/stock/stock-transfer/ImportTransferModal";
import PageHeader from "@/components/stock/stock-transfer/PageHeader";
import StockTransferTable from "@/components/stock/stock-transfer/StockTransferTable";
import CommonDeleteModal from "@/core/common/modal/commonDeleteModal";
import CommonFooter from "@/core/common/footer/commonFooter";

export default function StockTransfer() {
  return (
    <div>
      <div className="page-wrapper">
        <div className="content">
          <PageHeader />
          <StockTransferTable />
        </div>
        <CommonFooter />
      </div>
      <CommonDeleteModal />
      <AddTransferModal />
      <EditTransferModal />
      <ImportTransferModal />
    </div>
  );
}
