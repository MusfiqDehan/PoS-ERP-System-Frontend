"use client";

const times = [
  "07 PM", "06 PM", "05 PM", "04 PM", "03 PM", "02 PM",
  "01 PM", "12 PM", "11 AM", "10 AM", "09 AM", "08 AM",
];
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// Indices (into `times`) where the store is busy — rendered in the dark accent.
const busy: Record<string, number[]> = {
  Mon: [7, 10, 11],
  Tue: [7, 10, 11],
  Wed: [7, 10, 11],
  Thu: [10],
  Fri: [4],
  Sat: [0, 1, 8],
  Sun: [0, 1, 8],
};

const CELL = 22;

export default function CustomersHeatmap() {
  return (
    <div className="card flex-fill mb-0" style={{ borderColor: "#f1f1f1", borderRadius: 8 }}>
      <div className="card-body">
        <div
          className="d-flex align-items-center justify-content-between gap-2 pb-3 mb-3"
          style={{ borderBottom: "1.5px dashed #e7e7e7" }}
        >
          <h5 className="mb-0 fw-semibold" style={{ color: "#333", fontSize: 18 }}>
            When customers shop
          </h5>
          <button
            type="button"
            className="d-inline-flex align-items-center gap-2 bg-white rounded"
            style={{ border: "1px solid #e7e7e7", padding: "6px 12px", fontSize: 14, color: "#666" }}
          >
            <i className="ti ti-calendar" /> Weekly <i className="ti ti-chevron-down" />
          </button>
        </div>

        <div className="d-flex" style={{ gap: 8 }}>
          <div className="d-flex flex-column" style={{ gap: 5, width: 48 }}>
            {times.map((time) => (
              <span
                key={time}
                style={{ height: CELL, lineHeight: `${CELL}px`, color: "#666", fontSize: 14, textAlign: "right" }}
              >
                {time}
              </span>
            ))}
            <span style={{ height: CELL }} />
          </div>

          <div className="d-flex flex-fill position-relative" style={{ gap: 2 }}>
            {days.map((day) => (
              <div key={day} className="d-flex flex-column flex-fill" style={{ gap: 5 }}>
                {times.map((time, index) => (
                  <span
                    key={time}
                    style={{
                      height: CELL,
                      borderRadius: 4,
                      background: busy[day].includes(index) ? "#089b7c" : "#e7fbf7",
                    }}
                  />
                ))}
                <span style={{ height: CELL, lineHeight: `${CELL}px`, color: "#666", fontSize: 14, textAlign: "center" }}>
                  {day}
                </span>
              </div>
            ))}

            {/* "297 Orders" hover marker from the design */}
            <div className="position-absolute" style={{ top: 16, left: "14%" }}>
              <div
                className="position-relative"
                style={{
                  background: "#fff",
                  border: "1px solid #e7e7e7",
                  borderRadius: 4,
                  padding: "6px 12px",
                  boxShadow: "0px 4px 12px rgba(0,0,0,0.06)",
                }}
              >
                <span className="fw-semibold" style={{ color: "#333", fontSize: 14, whiteSpace: "nowrap" }}>
                  297 Orders
                </span>
                <span
                  className="position-absolute"
                  style={{
                    bottom: -5,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 0,
                    height: 0,
                    borderLeft: "6px solid transparent",
                    borderRight: "6px solid transparent",
                    borderTop: "6px solid #fff",
                  }}
                />
              </div>
            </div>
            <div
              className="position-absolute d-flex align-items-center justify-content-center"
              style={{ top: 56, left: "26%", width: 16, height: 16, borderRadius: "50%", background: "#e7e7e7" }}
            >
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#089b7c", border: "2px solid #fff" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
