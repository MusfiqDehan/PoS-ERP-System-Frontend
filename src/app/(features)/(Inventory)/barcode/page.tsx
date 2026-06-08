import BarcodeContent from "@/components/Inventory/barcode/BarcodeContent";
import PageHeader from "@/components/Inventory/barcode/PageHeader";
import PrintBarcodeModal from "@/components/Inventory/barcode/PrintBarcodeModal";
import CommonDeleteModal from "@/core/common/modal/commonDeleteModal";
import CommonFooter from "@/core/common/footer/commonFooter";

export default function Barcode() {
  return (
    <div>
      <div className="page-wrapper notes-page-wrapper">
        <div className="content">
          <PageHeader />
          <BarcodeContent />
        </div>
        <CommonFooter />
      </div>
      <PrintBarcodeModal />
      <CommonDeleteModal />
    </div>
  );
}
