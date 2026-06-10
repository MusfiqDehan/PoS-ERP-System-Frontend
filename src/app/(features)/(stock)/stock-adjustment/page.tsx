import AddAdjustmentModal from "@/components/stock/stock-adjustment/AddAdjustmentModal";
import EditAdjustmentModal from "@/components/stock/stock-adjustment/EditAdjustmentModal";
import PageHeader from "@/components/stock/stock-adjustment/PageHeader";
import StockAdjustmentTable from "@/components/stock/stock-adjustment/StockAdjustmentTable";
import ViewNotesModal from "@/components/stock/stock-adjustment/ViewNotesModal";
import CommonFooter from "@/core/common/footer/commonFooter";

export default function StockAdjustment() {
  return (
    <div>
      <div className="page-wrapper">
        <div className="content">
          <PageHeader />
          <StockAdjustmentTable />
        </div>
        <CommonFooter />
      </div>
      <AddAdjustmentModal />
      <EditAdjustmentModal />
      <ViewNotesModal />
    </div>
  );
}
