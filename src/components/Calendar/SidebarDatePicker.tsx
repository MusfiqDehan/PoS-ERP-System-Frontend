"use client";

import { Calendar } from "primereact/calendar";

type SidebarDatePickerProps = {
  date: Date | null;
  onDateChange: (value: Date | null) => void;
};

export default function SidebarDatePicker({ date, onDateChange }: SidebarDatePickerProps) {
  return (
    <div className="border-b border-[#f1f1f1] mb-4 pb-4">
      <Calendar
        className="datepickers"
        value={date}
        onChange={(e) => onDateChange((e.value as Date) ?? null)}
        inline={true}
      />
    </div>
  );
}
