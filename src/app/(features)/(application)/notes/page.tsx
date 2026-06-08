"use client";

import { useState } from "react";
import CommonFooter from "@/core/common/footer/commonFooter";
import NotesModal from "@/core/modals/applications/notesModal";
import AllNotesGrid from "@/components/Notes/AllNotesGrid";
import ImportantNotesCarousel from "@/components/Notes/ImportantNotesCarousel";
import ImportantNotesTab from "@/components/Notes/ImportantNotesTab";
import NotesSidebar from "@/components/Notes/NotesSidebar";
import NotesToolbar from "@/components/Notes/NotesToolbar";
import PageHeader from "@/components/Notes/PageHeader";
import NotesPagination from "@/components/Notes/NotesPagination";
import TrashNotesTab from "@/components/Notes/TrashNotesTab";

export default function Notes() {
  const [isOpen] = useState(false);

  return (
    <>
      <div
        className={`page-wrapper notes-page-wrapper ${
          isOpen ? "notes-tag-left" : ""
        }`}
      >
        <div className="content">
          <PageHeader />
          <div className="row">
            <NotesSidebar />
            <div className="col-xl-9 budget-role-notes">
              <NotesToolbar />
              <div className="tab-content" id="v-pills-tabContent2">
                <div
                  className="tab-pane fade active show"
                  id="v-pills-profile"
                  role="tabpanel"
                  aria-labelledby="v-pills-profile-tab"
                >
                  <ImportantNotesCarousel />
                  <AllNotesGrid />
                </div>
                <ImportantNotesTab />
                <TrashNotesTab />
              </div>
              <NotesPagination />
            </div>
          </div>
        </div>
        <CommonFooter />
      </div>
      <NotesModal />
    </>
  );
}
