import AddSubCategoryModal from "@/components/Inventory/sub-categories/AddSubCategoryModal";
import EditSubCategoryModal from "@/components/Inventory/sub-categories/EditSubCategoryModal";
import PageHeader from "@/components/Inventory/sub-categories/PageHeader";
import SubCategoryTable from "@/components/Inventory/sub-categories/SubCategoryTable";
import CommonDeleteModal from "@/core/common/modal/commonDeleteModal";
import CommonFooter from "@/core/common/footer/commonFooter";

export default function SubCategories() {
  return (
    <div>
      <div className="page-wrapper">
        <div className="content">
          <PageHeader />
          <SubCategoryTable />
        </div>
        <CommonFooter />
      </div>
      <AddSubCategoryModal />
      <EditSubCategoryModal />
      <CommonDeleteModal />
    </div>
  );
}
