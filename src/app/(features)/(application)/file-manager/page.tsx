import AddMemberModal from "@/components/FileManager/AddMemberModal";
import CloudStorageCard from "@/components/FileManager/CloudStorageCard";
import CreateFolderModal from "@/components/FileManager/CreateFolderModal";
import DropboxCard from "@/components/FileManager/DropboxCard";
import FilesTable from "@/components/FileManager/FilesTable";
import GoogleDriveCard from "@/components/FileManager/GoogleDriveCard";
import InternalStorageCard from "@/components/FileManager/InternalStorageCard";
import PageHeader from "@/components/FileManager/PageHeader";
import PreviewPanel from "@/components/FileManager/PreviewPanel";
import QuickAccess from "@/components/FileManager/QuickAccess";
import RecentFiles from "@/components/FileManager/RecentFiles";
import RecentFolders from "@/components/FileManager/RecentFolders";
import SidebarNav from "@/components/FileManager/SidebarNav";
import StorageDetails from "@/components/FileManager/StorageDetails";
import UpgradeBanner from "@/components/FileManager/UpgradeBanner";

export default function FileManager() {
  return (
    <>
      <div className="page-wrapper file-manager">
        <div className="content">
          <PageHeader />
          <div className="row">
            <DropboxCard />
            <GoogleDriveCard />
            <CloudStorageCard />
            <InternalStorageCard />
          </div>
          <div className="row">
            <div className="col-xl-3 theiaStickySidebar">
              <SidebarNav />
              <StorageDetails />
              <UpgradeBanner />
            </div>
            <div className="col-xl-9">
              <QuickAccess />
              <RecentFolders />
              <RecentFiles />
              <FilesTable />
            </div>
          </div>
        </div>
      </div>
      <PreviewPanel />
      <CreateFolderModal />
      <AddMemberModal />
    </>
  );
}
