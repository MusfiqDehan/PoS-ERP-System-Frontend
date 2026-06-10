import OnlineOrderTable from "@/components/sales/online-orders/OnlineOrderTable";
import PageHeader from "@/components/sales/online-orders/PageHeader";
import CommonDeleteModal from "@/core/common/modal/commonDeleteModal";
import CommonFooter from "@/core/common/footer/commonFooter";
import OnlineorderModal from "@/components/sales/online-orders/onlineorderModal";

export default function OnlineOrder() {
  return (
    <div>
      <div className="page-wrapper">
        <div className="content">
          <PageHeader />
          <OnlineOrderTable />
        </div>
        <CommonFooter />
      </div>
      <OnlineorderModal />
      <CommonDeleteModal />
    </div>
  );
}
