import AddWarrantyModal from "@/components/Inventory/warranty/AddWarrantyModal";
import EditWarrantyModal from "@/components/Inventory/warranty/EditWarrantyModal";
import PageHeader from "@/components/Inventory/warranty/PageHeader";
import WarrantyTable from "@/components/Inventory/warranty/WarrantyTable";
import CommonDeleteModal from "@/core/common/modal/commonDeleteModal";
import CommonFooter from "@/core/common/footer/commonFooter";

export default function Warranty() {
  return (
    <div>
      <div className="page-wrapper">
        <div className="content">
          <PageHeader />
          <WarrantyTable />
        </div>
        <CommonFooter />
      </div>
      <AddWarrantyModal />
      <EditWarrantyModal />
      <CommonDeleteModal />
    </div>
  );
}
