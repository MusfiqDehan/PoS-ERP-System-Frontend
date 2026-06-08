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
              <div className="col-xxl-9 col-xl-8 theiaStickySidebar">
                <div className="stickybar">
                  <div className="card border-0">
                    <div className="card-body">
                      <FullCalendar
                        plugins={[
                          dayGridPlugin,
                          timeGridPlugin,
                          interactionPlugin,
                        ]}
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
                  </div>
                </div>
  
              </div>
  );
}
