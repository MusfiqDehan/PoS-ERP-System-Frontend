import DiscountTable from "@/components/promo/discount/DiscountTable";
import PageHeader from "@/components/promo/discount/PageHeader";
import DiscountPlanModal from "@/core/modals/coupons/discountPlanModal";
import CommonFooter from "@/core/common/footer/commonFooter";

export default function Discount() {
  return (
    <div>
      <div className="page-wrapper">
        <div className="content">
          <PageHeader />
          <DiscountTable />
        </div>
        <CommonFooter />
      </div>
      <DiscountPlanModal />
    </div>
  );
}
