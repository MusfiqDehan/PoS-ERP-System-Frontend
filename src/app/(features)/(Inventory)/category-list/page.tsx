import AddCategoryModal from "@/components/Inventory/category-list/AddCategoryModal";
import CategoryListTable from "@/components/Inventory/category-list/CategoryListTable";
import PageHeader from "@/components/Inventory/category-list/PageHeader";
import CommonDeleteModal from "@/core/common/modal/commonDeleteModal";
import CommonFooter from "@/core/common/footer/commonFooter";
import EditCategoryList from "@/core/modals/inventory/editcategorylist";

export default function CategoryList() {
  return (
    <div>
      <div className="page-wrapper">
        <div className="content">
          <PageHeader />
          <CategoryListTable />
        </div>
        <CommonFooter />
      </div>
      <AddCategoryModal />
      <EditCategoryList />
      <CommonDeleteModal />
    </div>
  );
}
