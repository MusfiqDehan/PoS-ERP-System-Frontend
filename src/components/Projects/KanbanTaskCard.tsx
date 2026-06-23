"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import type { ProjectTask } from "./projectData";

type KanbanTaskCardProps = {
  task: ProjectTask;
};

export default function KanbanTaskCard({ task }: KanbanTaskCardProps) {
  const priorityClass =
    task.priority === "Low"
      ? "bg-success"
      : task.priority === "Medium"
        ? "bg-warning"
        : "bg-purple";

  return (
                                          <div className="card">
                                            <div className="card-body">
                                              <div className="d-flex align-items-center justify-content-between mb-3">
                                                <div className="d-flex align-items-center">
                                                  <span className="badge bg-outline-dark me-2">
                                                    Web Layout
                                                  </span>
                                                  <span
                                                    className={`badge ${priorityClass} badge-xs d-flex align-items-center justify-content-center`}
                                                  >
                                                    <i className="fas fa-circle fs-6 me-1" />
                                                    {task.priority}
                                                  </span>
                                                </div>
                                                <div className="dropdown">
                                                  <Link
                                                    href="#"
                                                    className="d-inline-flex align-items-center"
                                                    data-bs-toggle="dropdown"
                                                  >
                                                    <i className="ti ti-dots-vertical" />
                                                  </Link>
                                                  <ul className="dropdown-menu dropdown-menu-end p-3">
                                                    <li>
                                                      <Link
                                                        href="#"
                                                        className="dropdown-item rounded-1"
                                                      >
                                                        <i className="ti ti-edit me-2" />
                                                        Edit
                                                      </Link>
                                                    </li>
                                                    <li>
                                                      <Link
                                                        href="#"
                                                        className="dropdown-item rounded-1"
                                                        data-bs-toggle="modal"
                                                        data-inert={true}
                                                        data-bs-target="#delete_modal"
                                                      >
                                                        <i className="ti ti-trash me-2" />
                                                        Delete
                                                      </Link>
                                                    </li>
                                                  </ul>
                                                </div>
                                              </div>
                                              <div className="d-flex align-items-center mb-2">
                                                <span className="avatar avatar-xs rounded-circle bg-warning me-2">
                                                  <img
                                                    src="assets/img/icons/kanban-arrow.svg"
                                                    className="w-auto h-auto"
                                                    alt="Sortorium"
                                                  />
                                                </span>
                                                <h6 className="d-flex align-items-center">
                                                  Project Title{" "}
                                                  <span className="fs-12 ms-2 text-gray">
                                                    PRJ-154
                                                  </span>
                                                </h6>
                                              </div>
                                              <div className="d-flex align-items-center border-bottom mb-3 pb-3">
                                                <div className="me-3 pe-3 border-end">
                                                  <span className="fw-medium fs-12 d-block mb-1">
                                                    Budget
                                                  </span>
                                                  <p className="fs-12 text-dark">
                                                    $24,000
                                                  </p>
                                                </div>
                                                <div className="me-3 pe-3 border-end">
                                                  <span className="fw-medium fs-12 d-block mb-1">
                                                    Tasks
                                                  </span>
                                                  <p className="fs-12 text-dark">
                                                    12/15
                                                  </p>
                                                </div>
                                                <div className="">
                                                  <span className="fw-medium fs-12 d-block mb-1">
                                                    Due on
                                                  </span>
                                                  <p className="fs-12 text-dark">
                                                    15/04/2024
                                                  </p>
                                                </div>
                                              </div>
                                              <div className="d-flex align-items-center justify-content-between">
                                                <div className="avatar-list-stacked avatar-group-sm me-3">
                                                  <span className="avatar avatar-rounded">
                                                    <img
                                                      className="border border-white"
                                                      src="assets/img/profiles/avatar-19.jpg"
                                                      alt="img"
                                                    />
                                                  </span>
                                                  <span className="avatar avatar-rounded">
                                                    <img
                                                      className="border border-white"
                                                      src="assets/img/profiles/avatar-29.jpg"
                                                      alt="img"
                                                    />
                                                  </span>
                                                  <span className="avatar avatar-rounded">
                                                    <img
                                                      className="border border-white"
                                                      src="assets/img/profiles/avatar-16.jpg"
                                                      alt="img"
                                                    />
                                                  </span>
                                                  <span className="avatar avatar-rounded">
                                                    <img
                                                      className="border border-white"
                                                      src="assets/img/profiles/avatar-01.jpg"
                                                      alt="img"
                                                    />
                                                  </span>
                                                  <span className="avatar avatar-rounded">
                                                    <img
                                                      className="border border-white"
                                                      src="assets/img/profiles/avatar-02.jpg"
                                                      alt="img"
                                                    />
                                                  </span>
                                                  <span className="avatar avatar-rounded">
                                                    <img
                                                      className="border border-white"
                                                      src="assets/img/profiles/avatar-03.jpg"
                                                      alt="img"
                                                    />
                                                  </span>
                                                  <Link
                                                    href="#"
                                                    className="avatar avatar-rounded bg-primary fs-12 text-white"
                                                  >
                                                    1+
                                                  </Link>
                                                </div>
                                                <div className="d-flex align-items-center">
                                                  <Link
                                                    href="#"
                                                    className="d-flex align-items-center text-dark me-2"
                                                  >
                                                    <i className="ti ti-message-circle text-gray me-1" />
                                                    14
                                                  </Link>
                                                  <Link
                                                    href="#"
                                                    className="d-flex align-items-center text-dark"
                                                  >
                                                    <i className="ti ti-paperclip text-gray me-1" />
                                                    14
                                                  </Link>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
  );
}
