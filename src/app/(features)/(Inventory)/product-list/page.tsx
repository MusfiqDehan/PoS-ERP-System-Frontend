import CommonFooter from "@/core/common/footer/commonFooter";
import Brand from "@/core/modals/inventory/brand";
import DeleteProductModal from "@/components/Inventory/productList/DeleteProductModal";
import PageHeader from "@/components/Inventory/productList/PageHeader";
import ProductListTable from "@/components/Inventory/productList/ProductListTable";

export default function ProductList() {
  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <PageHeader />
          <ProductListTable />
          <Brand />
        </div>
        <CommonFooter />
      </div>
      <DeleteProductModal />
    </>
  );
}
