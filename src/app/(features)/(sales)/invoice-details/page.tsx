import InvoiceActionButtons from "@/components/sales/invoice-details/InvoiceActionButtons";
import InvoiceDetailsCard from "@/components/sales/invoice-details/InvoiceDetailsCard";
import PageFooter from "@/components/sales/invoice-details/PageFooter";
import PageHeader from "@/components/sales/invoice-details/PageHeader";

export default function InvoiceDetails() {
  return (
    <div className="page-wrapper">
      <div className="content">
        <PageHeader />
        <InvoiceDetailsCard />
        <InvoiceActionButtons />
      </div>
      <PageFooter />
    </div>
  );
}
