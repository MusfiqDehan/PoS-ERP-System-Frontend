"use client";

import { useState } from "react";
import AddEventModal from "@/components/Calendar/AddEventModal";
import CalendarGrid from "@/components/Calendar/CalendarGrid";
import DraggableEvents from "@/components/Calendar/DraggableEvents";
import EventDetailsModal from "@/components/Calendar/EventDetailsModal";
import PageHeader from "@/components/Calendar/PageHeader";
import SidebarDatePicker from "@/components/Calendar/SidebarDatePicker";
import UpcomingEvents from "@/components/Calendar/UpcomingEvents";
import UpgradeBanner from "@/components/Calendar/UpgradeBanner";

export default function Calender() {
  const [date, setDate] = useState<Date | null>(null);

  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <PageHeader />
          <div className="row">
            <div className="col-xxl-3 col-xl-4 theiaStickySidebar">
              <div className="stickybar">
                <div className="card">
                  <div className="card-body p-3">
                    <SidebarDatePicker date={date} onDateChange={setDate} />
                    <DraggableEvents />
                    <UpcomingEvents />
                    <UpgradeBanner />
                  </div>
                </div>
              </div>
            </div>
            <CalendarGrid />
          </div>
        </div>
      </div>
      <AddEventModal />
      <EventDetailsModal />
    </>
  );
}
