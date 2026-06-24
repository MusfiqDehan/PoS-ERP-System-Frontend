"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useRef } from "react";
import { calendarEvents } from "@/components/Calendar/calendarEvents";

export default function CalendarGrid() {
  const calendarRef = useRef(null);

  const handleEventClick = () => {
    // Bootstrap event detail modal is wired separately in the template
  };

  return (
    <div className="bg-white border border-[#f1f1f1] rounded-[8px] p-4">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={calendarEvents}
        headerToolbar={{
          start: "today,prev,next",
          center: "title",
          end: "dayGridMonth,dayGridWeek,dayGridDay",
        }}
        eventClick={handleEventClick}
        ref={calendarRef}
      />
    </div>
  );
}
