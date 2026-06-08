import AddVariantAttributeModal from "@/components/Inventory/variant-attributes/AddVariantAttributeModal";
import EditVariantAttributeModal from "@/components/Inventory/variant-attributes/EditVariantAttributeModal";
import PageHeader from "@/components/Inventory/variant-attributes/PageHeader";
import VariantAttributeTable from "@/components/Inventory/variant-attributes/VariantAttributeTable";
import CommonDeleteModal from "@/core/common/modal/commonDeleteModal";
import CommonFooter from "@/core/common/footer/commonFooter";

export default function VariantAttributes() {
  return (
    <div>
      <div className="page-wrapper">
        <div className="content">
          <PageHeader />
          <VariantAttributeTable />
        </div>
        <CommonFooter />
      </div>
      <AddVariantAttributeModal />
      <EditVariantAttributeModal />
      <CommonDeleteModal />
    </div>
  );
}
