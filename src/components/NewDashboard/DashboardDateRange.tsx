"use client";

import ImageWithBasePath from "@/core/common/image-with-base-path";
import moment from "moment";
import { useState } from "react";
import { DateRangePicker } from "react-bootstrap-daterangepicker";
import "bootstrap-daterangepicker/daterangepicker.css";

export default function DashboardDateRange() {
  const [state, setState] = useState({
    start: moment().subtract(6, "days"),
    end: moment(),
  });

  const handleCallback = (start: moment.Moment, end: moment.Moment) => {
    setState({ start, end });
  };

  const label = `${state.start.format("DD MMMM YYYY")} - ${state.end.format("DD MMMM YYYY")}`;

  return (
    <DateRangePicker
      initialSettings={{
        startDate: state.start.toDate(),
        endDate: state.end.toDate(),
        ranges: {
          Today: [moment().toDate(), moment().toDate()],
          Yesterday: [
            moment().subtract(1, "days").toDate(),
            moment().subtract(1, "days").toDate(),
          ],
          "Last 7 Days": [
            moment().subtract(6, "days").toDate(),
            moment().toDate(),
          ],
          "Last 30 Days": [
            moment().subtract(29, "days").toDate(),
            moment().toDate(),
          ],
          "This Month": [
            moment().startOf("month").toDate(),
            moment().endOf("month").toDate(),
          ],
          "Last Month": [
            moment().subtract(1, "month").startOf("month").toDate(),
            moment().subtract(1, "month").endOf("month").toDate(),
          ],
        },
      }}
      onCallback={handleCallback}
    >
      <button type="button" className="dashboard-page-header__date-picker">
        <ImageWithBasePath
          src="assets/img/dashboard/page-header/calendar.png"
          alt=""
          width={18}
          height={18}
          className="dashboard-page-header__date-icon"
        />
        <span className="dashboard-page-header__date-label">{label}</span>
      </button>
    </DateRangePicker>
  );
}
