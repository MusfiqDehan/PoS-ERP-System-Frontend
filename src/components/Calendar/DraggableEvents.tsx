"use client";

import Link from "next/link";

export default function DraggableEvents() {
  return (
                      <div className="border-bottom pb-4 mb-4">
                        <div className="d-flex align-items-center justify-content-between mb-2">
                          <h5>Event </h5>
                          <Link
                            href="#"
                            className="link-primary"
                            data-bs-toggle="modal" data-inert={true}
                            data-bs-target="#add_event"
                          >
                            <i className="ti ti-square-rounded-plus-filled fs-16" />
                          </Link>
                        </div>
                        <p className="fs-12 mb-2">
                          Drag and drop your event or click in the calendar
                        </p>
                        <div id="external-events">
                          <div
                            className="fc-event bg-transparent-success mb-1"
                            data-event='{ "title": "Team Events" }'
                            data-event-classname="bg-transparent-success"
                          >
                            <i className="ti ti-square-rounded text-success me-2" />
                            Team Events
                          </div>
                          <div
                            className="fc-event bg-transparent-warning mb-1"
                            data-event='{ "title": "Team Events" }'
                            data-event-classname="bg-transparent-warning"
                          >
                            <i className="ti ti-square-rounded text-warning me-2" />
                            Work
                          </div>
                          <div
                            className="fc-event bg-transparent-danger mb-1"
                            data-event='{ "title": "External" }'
                            data-event-classname="bg-transparent-danger"
                          >
                            <i className="ti ti-square-rounded text-danger me-2" />
                            External
                          </div>
                          <div
                            className="fc-event bg-transparent-skyblue mb-1"
                            data-event='{ "title": "Projects" }'
                            data-event-classname="bg-transparent-skyblue"
                          >
                            <i className="ti ti-square-rounded text-skyblue me-2" />
                            Projects
                          </div>
                          <div
                            className="fc-event bg-transparent-purple mb-1"
                            data-event='{ "title": "Applications" }'
                            data-event-classname="bg-transparent-purple"
                          >
                            <i className="ti ti-square-rounded text-purple me-2" />
                            Applications
                          </div>
                          <div
                            className="fc-event bg-transparent-info mb-0"
                            data-event='{ "title": "Desgin" }'
                            data-event-classname="bg-transparent-info"
                          >
                            <i className="ti ti-square-rounded text-info me-2" />
                            Desgin
                          </div>
                        </div>
                      </div>
  );
}
