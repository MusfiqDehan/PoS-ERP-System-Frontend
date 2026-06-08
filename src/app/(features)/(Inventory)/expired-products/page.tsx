import CommonDeleteModal from "@/core/common/modal/commonDeleteModal";
import CommonFooter from "@/core/common/footer/commonFooter";
import EditExpiredProductModal from "@/components/Inventory/expired-products/EditExpiredProductModal";
import ExpiredProductsTable from "@/components/Inventory/expired-products/ExpiredProductsTable";
import PageHeader from "@/components/Inventory/expired-products/PageHeader";

export default function ExpiredProducts() {
  return (
    <div>
      <div className="page-wrapper">
        <div className="content">
          <PageHeader />
          <ExpiredProductsTable />
        </div>
        <CommonFooter />
      </div>
      <EditExpiredProductModal />
      <CommonDeleteModal />
    </div>
  );
}
