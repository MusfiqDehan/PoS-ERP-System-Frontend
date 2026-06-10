import PageFooter from "@/components/sales/sale-return/PageFooter";
import PageHeader from "@/components/sales/sale-return/PageHeader";
import SalesReturnTable from "@/components/sales/sale-return/SalesReturnTable";
import CommonDeleteModal from "@/core/common/modal/commonDeleteModal";
import AddSalesReturns from "@/core/modals/sales/addsalesreturns";
import EditSalesRetuens from "@/core/modals/sales/editsalesretuens";

export default function SaleReturn() {
  return (
    <div>
      <div className="page-wrapper">
        <div className="content">
          <PageHeader />
          <SalesReturnTable />
        </div>
        <PageFooter />
      </div>
      <AddSalesReturns />
      <EditSalesRetuens />
      <CommonDeleteModal />
    </div>
  );
}
