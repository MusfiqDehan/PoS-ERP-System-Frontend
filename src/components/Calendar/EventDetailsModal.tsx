"use client";

export default function EventDetailsModal() {
  return (
          <div className="modal fade" id="event_modal">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header modal-bg">
                  <div className="modal-title text-gray-9">
                    <span id="eventTitle" />
                  </div>
                  <button
                    type="button"
                    className="btn-close p-0 custom-btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    <i className="ti ti-x" />
                  </button>
                </div>
                <div className="modal-body">
                  <p className="d-flex align-items-center fw-medium text-black mb-3">
                    <i className="ti ti-calendar-check text-default me-2" />
                    26 Jul,2024 to 31 Jul,2024
                  </p>
                  <p className="d-flex align-items-center fw-medium text-black mb-3">
                    <i className="ti ti-calendar-check text-default me-2" />
                    11:00 AM to 12:15 PM
                  </p>
                  <p className="d-flex align-items-center fw-medium text-black mb-3">
                    <i className="ti ti-map-pin-bolt text-default me-2" />
                    Las Vegas, US
                  </p>
                  <p className="d-flex align-items-center fw-medium text-black mb-0">
                    <i className="ti ti-calendar-check text-default me-2" />A recurring
                    or repeating event is simply any event that you will occur more than
                    once on your calendar.
                  </p>
                </div>
              </div>
            </div>
          </div>
  );
}
