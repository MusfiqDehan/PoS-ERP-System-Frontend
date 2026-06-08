import PageHeader from "@/components/Inventory/qrcode/PageHeader";
import QrCodeContent from "@/components/Inventory/qrcode/QrCodeContent";
import CommonFooter from "@/core/common/footer/commonFooter";
import QRcodeModelPopup from "@/core/modals/inventory/qrcode";

export default function Qrcode() {
  return (
    <div>
      <div className="page-wrapper notes-page-wrapper">
        <div className="content">
          <PageHeader />
          <QrCodeContent />
        </div>
        <CommonFooter />
      </div>
      <QRcodeModelPopup />
    </div>
  );
}
