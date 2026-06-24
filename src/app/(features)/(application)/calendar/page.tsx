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
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 items-start">
            <div className="xl:col-span-4 min-[1400px]:col-span-3">
              <div className="bg-white border border-[#f1f1f1] rounded-[8px] p-3">
                <SidebarDatePicker date={date} onDateChange={setDate} />
                <DraggableEvents />
                <UpcomingEvents />
                <UpgradeBanner />
              </div>
            </div>
            <div className="xl:col-span-8 min-[1400px]:col-span-9">
              <CalendarGrid />
            </div>
          </div>
        </div>
      </div>
      <AddEventModal />
      <EventDetailsModal />
    </>
  );
}
