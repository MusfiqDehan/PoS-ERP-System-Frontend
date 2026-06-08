import CommonDeleteModal from "@/core/common/modal/commonDeleteModal";
import CommonFooter from "@/core/common/footer/commonFooter";
import EditLowStock from "@/core/modals/inventory/editlowstock";
import PageHeader from "@/components/Inventory/low-stocks/PageHeader";
import SendEmailModal from "@/components/Inventory/low-stocks/SendEmailModal";
import StockTabsSection from "@/components/Inventory/low-stocks/StockTabsSection";

export default function LowStocks() {
  return (
    <div>
      <div className="page-wrapper">
        <div className="content">
          <PageHeader />
          <StockTabsSection />
        </div>
        <CommonFooter />
      </div>
      <SendEmailModal />
      <EditLowStock />
      <CommonDeleteModal />
    </div>
  );
}
