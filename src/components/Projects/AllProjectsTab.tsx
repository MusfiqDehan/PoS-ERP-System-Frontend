"use client";

import type { DropResult } from "@hello-pangea/dnd";
import type { ProjectColumns } from "./projectData";
import KanbanBoard from "./KanbanBoard";

type AllProjectsTabProps = {
  columns: ProjectColumns;
  onDragEnd: (result: DropResult) => void;
};

export default function AllProjectsTab({
  columns,
  onDragEnd,
}: AllProjectsTabProps) {
  return (
              <div
                className="tab-pane fade show active"
                id="pills-home"
                role="tabpanel"
              >
                <div>
                  <div>
                    <KanbanBoard columns={columns} onDragEnd={onDragEnd} />
                  </div>
                </div>
              </div>
  );
}
