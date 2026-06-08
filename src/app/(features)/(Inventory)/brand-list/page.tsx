import AddBrandModal from "@/components/Inventory/brand-list/AddBrandModal";
import BrandListTable from "@/components/Inventory/brand-list/BrandListTable";
import EditBrandModal from "@/components/Inventory/brand-list/EditBrandModal";
import PageHeader from "@/components/Inventory/brand-list/PageHeader";
import CommonDeleteModal from "@/core/common/modal/commonDeleteModal";
import CommonFooter from "@/core/common/footer/commonFooter";

export default function BrandList() {
  return (
    <div>
      <div className="page-wrapper">
        <div className="content">
          <PageHeader />
          <BrandListTable />
        </div>
        <CommonFooter />
      </div>
      <AddBrandModal />
      <EditBrandModal />
      <CommonDeleteModal />
    </div>
  );
}
