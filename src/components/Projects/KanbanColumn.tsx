"use client";

import { Draggable, Droppable } from "@hello-pangea/dnd";
import Link from "next/link";
import type { ProjectColumn } from "./projectData";
import KanbanTaskCard from "./KanbanTaskCard";

type KanbanColumnProps = {
  columnId: string;
  column: ProjectColumn;
};

const colorMap: Record<string, { soft: string; dot: string }> = {
  New: { soft: "#fdeff5", dot: "#e84a8a" },
  Inprogress: { soft: "#eaf4fe", dot: "#3aa0f4" },
};

export default function KanbanColumn({ columnId, column }: KanbanColumnProps) {
  const c = colorMap[column.title] || { soft: "#fff0f0", dot: "#dc3545" };

  return (
    <div className="shrink-0 w-[320px] p-3 rounded-lg bg-[#f6f7f9]">
      <Droppable key={columnId} droppableId={columnId}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <div className="bg-white p-2 rounded-md mb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="p-1 inline-flex rounded-full" style={{ background: c.soft }}>
                    <span className="block w-2 h-2 rounded-full" style={{ background: c.dot }} />
                  </span>
                  <h5 className="m-0 text-[15px] font-semibold text-[#212B36]">{column.title}</h5>
                  <span className="inline-flex items-center justify-center px-2 py-[1px] rounded-full bg-[#f1f5f6] text-[#646B72] text-[12px]">
                    02
                  </span>
                </div>
                <div className="dropdown">
                  <Link href="#" data-bs-toggle="dropdown" className="inline-flex items-center text-[#646B72]">
                    <i className="ti ti-dots-vertical" />
                  </Link>
                  <ul className="dropdown-menu dropdown-menu-end p-2">
                    <li>
                      <Link href="#" className="dropdown-item rounded-1"><i className="ti ti-edit me-2" />Edit</Link>
                    </li>
                    <li>
                      <Link href="#" className="dropdown-item rounded-1" data-bs-toggle="modal" data-inert={true} data-bs-target="#delete_modal">
                        <i className="ti ti-trash me-2" />Delete
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {column.tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(dragProvided) => (
                  <div
                    ref={dragProvided.innerRef}
                    {...dragProvided.draggableProps}
                    {...dragProvided.dragHandleProps}
                    className="mb-3"
                  >
                    <KanbanTaskCard task={task} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}

            <Link
              href="#"
              className="flex items-center justify-center gap-2 w-full py-2 rounded-md border border-dashed border-[#cfd4da] text-[#646B72] text-[14px] hover:border-[#0ac79e] hover:text-[#0ac79e] transition-colors"
            >
              <i className="ti ti-plus" /> New Project
            </Link>
          </div>
        )}
      </Droppable>
    </div>
  );
}
