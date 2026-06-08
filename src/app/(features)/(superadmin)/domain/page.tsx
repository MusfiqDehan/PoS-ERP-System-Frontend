import CommonFooter from "@/core/common/footer/commonFooter";
import DeleteDomainModal from "@/components/SuperAdmin/domain/DeleteDomainModal";
import DomainApprovedModal from "@/components/SuperAdmin/domain/DomainApprovedModal";
import DomainPendingModal from "@/components/SuperAdmin/domain/DomainPendingModal";
import DomainRejectedModal from "@/components/SuperAdmin/domain/DomainRejectedModal";
import DomainTable from "@/components/SuperAdmin/domain/DomainTable";
import PageHeader from "@/components/SuperAdmin/domain/PageHeader";

export default function Domain() {
  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <PageHeader />
          <DomainTable />
        </div>
        <CommonFooter />
      </div>
      <DomainApprovedModal />
      <DomainPendingModal />
      <DomainRejectedModal />
      <DeleteDomainModal />
    </>
  );
}
