"use client";

import { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import CommonFooter from "@/core/common/footer/commonFooter";
import ComposeBackdrop from "@/components/Email/ComposeBackdrop";
import ComposePanel from "@/components/Email/ComposePanel";
import EmailSidebar from "@/components/Email/EmailSidebar";
import InboxHeader from "@/components/Email/InboxHeader";
import InboxList from "@/components/Email/InboxList";

export default function Email() {
  const [value, setValue] = useState(["Angela Thomas"]);
  const [show, setShow] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showMenu2, setShowMenu2] = useState(false);
  const [showMenu3, setShowMenu3] = useState(false);

  return (
    <>
      <div className="page-wrapper">
        <div className="content p-0">
          <div className="d-md-flex">
            <EmailSidebar
              onCompose={() => setShow(true)}
              showMenu={showMenu}
              setShowMenu={setShowMenu}
              showMenu2={showMenu2}
              setShowMenu2={setShowMenu2}
              showMenu3={showMenu3}
              setShowMenu3={setShowMenu3}
            />
            <div className="bg-white flex-fill border-end border-bottom mail-notifications">
              <PerfectScrollbar>
                <div className="slimscroll-active-sidebar">
                  <InboxHeader />
                  <InboxList />
                </div>
              </PerfectScrollbar>
            </div>
          </div>
          <CommonFooter />
        </div>
      </div>
      <ComposePanel
        show={show}
        onClose={() => setShow(false)}
        value={value}
        onValueChange={setValue}
      />
      <ComposeBackdrop show={show} />
    </>
  );
}
