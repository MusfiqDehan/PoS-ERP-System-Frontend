"use client";

import { useEffect, useState } from "react";
import CommonFooter from "@/core/common/footer/commonFooter";
import AddTransferModal from "@/components/Chat/AddTransferModal";
import ChatFooter from "@/components/Chat/ChatFooter";
import ChatHeader from "@/components/Chat/ChatHeader";
import ChatMessages from "@/components/Chat/ChatMessages";
import ChatSidebar from "@/components/Chat/ChatSidebar";
import EditTransferModal from "@/components/Chat/EditTransferModal";
import ImportTransferModal from "@/components/Chat/ImportTransferModal";
import PageHeader from "@/components/Chat/PageHeader";

export default function Chat() {
  const [showEmoji, setShowEmoji] = useState(false);
  const [showEmoji2, setShowEmoji2] = useState(false);
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    document.body.classList.add("app-chat");
    return () => {
      document.body.classList.remove("app-chat");
    };
  }, []);

  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <PageHeader />
          <div className="chat-wrapper">
            <ChatSidebar onSelectChat={() => setShowChat(true)} />
            <div
              className={`chat chat-messages ${showChat ? "show" : ""}`}
              id="middle"
            >
              <div>
                <ChatHeader onClose={() => setShowChat(false)} />
                <ChatMessages />
              </div>
              <ChatFooter
                showEmoji={showEmoji}
                setShowEmoji={setShowEmoji}
                showEmoji2={showEmoji2}
                setShowEmoji2={setShowEmoji2}
              />
            </div>
          </div>
        </div>
        <CommonFooter />
      </div>
      <AddTransferModal />
      <EditTransferModal />
      <ImportTransferModal />
    </>
  );
}
