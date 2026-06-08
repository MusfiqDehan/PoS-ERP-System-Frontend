import AddContactModal from "@/components/Contacts/AddContactModal";
import ContactsFooter from "@/components/Contacts/ContactsFooter";
import ContactsTable from "@/components/Contacts/ContactsTable";
import DeleteContactModal from "@/components/Contacts/DeleteContactModal";
import EditContactModal from "@/components/Contacts/EditContactModal";
import PageHeader from "@/components/Contacts/PageHeader";

export default function Contacts() {
  return (
    <div>
      <div className="page-wrapper">
        <div className="content">
          <PageHeader />
          <ContactsTable />
        </div>
        <ContactsFooter />
      </div>
      <AddContactModal />
      <EditContactModal />
      <DeleteContactModal />
    </div>
  );
}
