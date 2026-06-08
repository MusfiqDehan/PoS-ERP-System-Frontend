"use client";

import { Calendar } from "primereact/calendar";

type SidebarDatePickerProps = {
  date: Date | null;
  onDateChange: (value: Date | null) => void;
};

export default function SidebarDatePicker({
  date,
  onDateChange,
}: SidebarDatePickerProps) {
  return (
                      <div className="border-bottom mb-4">
                        <Calendar
                          className="datepickers pb-4"
                          value={date}
                          onChange={(e: Date | null) => onDateChange(e)}
                          inline={true}
                        />
                      </div>
  );
}
