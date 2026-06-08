"use client";

import { Draggable, Droppable } from "@hello-pangea/dnd";
import Link from "next/link";
import type { ProjectColumn } from "./projectData";
import KanbanTaskCard from "./KanbanTaskCard";

type KanbanColumnProps = {
  columnId: string;
  column: ProjectColumn;
};

export default function KanbanColumn({ columnId, column }: KanbanColumnProps) {
  const softColorClass =
    column.title === "New"
      ? "bg-soft-pink"
      : column.title === "Inprogress"
        ? "bg-soft-skyblue"
        : "bg-soft-danger";
  const dotColorClass =
    column.title === "New"
      ? "bg-pink"
      : column.title === "Inprogress"
        ? "bg-skyblue"
        : "bg-danger";

  return (
                          <div className="p-3 rounded bg-transparent-secondary w-100 me-3">
                            <Droppable key={columnId} droppableId={columnId}>
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.droppableProps}
                                >
                                  <div className="bg-white p-2 rounded mb-2">
                                    <div className="d-flex align-items-center justify-content-between">
                                      <div className="d-flex align-items-center">
                                        <span
                                          className={`${softColorClass} p-1 d-flex rounded-circle me-2`}
                                        >
                                          <span
                                            className={`${dotColorClass} rounded-circle d-block p-1`}
                                          />
                                        </span>
                                        <h5 className="me-2">{column.title}</h5>
                                        <span className="badge bg-light rounded-pill">
                                          02
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
                                  </div>

                                  {column.tasks.map((task, index) => (
                                    <Draggable
                                      key={task.id}
                                      draggableId={task.id}
                                      index={index}
                                    >
                                      {(dragProvided) => (
                                        <div
                                          ref={dragProvided.innerRef}
                                          {...dragProvided.draggableProps}
                                          {...dragProvided.dragHandleProps}
                                          className="kanban-task bg-white p-2 mb-2 rounded shadow-sm"
                                        >
                                          <KanbanTaskCard task={task} />
                                        </div>
                                      )}
                                    </Draggable>
                                  ))}
                                  {provided.placeholder}
                                  <div className="pt-2">
                                    <Link
                                      href="#"
                                      className="btn btn-white border border-dashed d-flex align-items-center justify-content-center"
                                    >
                                      <i className="ti ti-plus me-2" />
                                      New Project
                                    </Link>
                                  </div>
                                </div>
                              )}
                            </Droppable>
                          </div>
  );
}
