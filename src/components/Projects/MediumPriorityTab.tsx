"use client";

import type { DropResult } from "@hello-pangea/dnd";
import type { ProjectColumns } from "./projectData";
import KanbanBoard from "./KanbanBoard";

type MediumPriorityTabProps = {
  columns: ProjectColumns;
  onDragEnd: (result: DropResult) => void;
};

export default function MediumPriorityTab({
  columns,
  onDragEnd,
}: MediumPriorityTabProps) {
  return (
              <div
                className="tab-pane fade"
                id="pills-medium"
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
