import PageHeader from "@/components/sales/pos-orders/PageHeader";
import PosOrderTable from "@/components/sales/pos-orders/PosOrderTable";
import CommonDeleteModal from "@/core/common/modal/commonDeleteModal";
import CommonFooter from "@/core/common/footer/commonFooter";
import OnlineorderModal from "@/components/sales/online-orders/onlineorderModal";

export default function PosOrders() {
  return (
    <div>
      <div className="page-wrapper">
        <div className="content">
          <PageHeader />
          <PosOrderTable />
        </div>
        <CommonFooter />
      </div>
      <OnlineorderModal />
      <CommonDeleteModal />
    </div>
  );
}
