"use client";

import type { DropResult } from "@hello-pangea/dnd";
import type { ProjectColumns } from "./projectData";
import KanbanBoard from "./KanbanBoard";

type LowPriorityTabProps = {
  columns: ProjectColumns;
  onDragEnd: (result: DropResult) => void;
};

export default function LowPriorityTab({
  columns,
  onDragEnd,
}: LowPriorityTabProps) {
  return (
              <div
                className="tab-pane fade"
                id="pills-low"
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
