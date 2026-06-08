import AddUnitModal from "@/components/Inventory/units/AddUnitModal";
import EditUnitModal from "@/components/Inventory/units/EditUnitModal";
import PageHeader from "@/components/Inventory/units/PageHeader";
import UnitsTable from "@/components/Inventory/units/UnitsTable";
import CommonDeleteModal from "@/core/common/modal/commonDeleteModal";
import CommonFooter from "@/core/common/footer/commonFooter";

export default function Units() {
  return (
    <div>
      <div className="page-wrapper">
        <div className="content">
          <PageHeader />
          <UnitsTable />
        </div>
        <CommonFooter />
      </div>
      <AddUnitModal />
      <EditUnitModal />
      <CommonDeleteModal />
    </div>
  );
}
