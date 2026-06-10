import AddStockModal from "@/components/stock/managestock/AddStockModal";
import EditStockModal from "@/components/stock/managestock/EditStockModal";
import ManageStockTable from "@/components/stock/managestock/ManageStockTable";
import PageHeader from "@/components/stock/managestock/PageHeader";
import CommonDeleteModal from "@/core/common/modal/commonDeleteModal";
import CommonFooter from "@/core/common/footer/commonFooter";

export default function ManageStock() {
  return (
    <div>
      <div className="page-wrapper">
        <div className="content">
          <PageHeader />
          <ManageStockTable />
        </div>
        <CommonFooter />
      </div>
      <CommonDeleteModal />
      <AddStockModal />
      <EditStockModal />
    </div>
  );
}
