"use client";

import type { DropResult } from "@hello-pangea/dnd";
import type { ProjectColumns } from "./projectData";
import KanbanBoard from "./KanbanBoard";

type HighPriorityTabProps = {
  columns: ProjectColumns;
  onDragEnd: (result: DropResult) => void;
};

export default function HighPriorityTab({
  columns,
  onDragEnd,
}: HighPriorityTabProps) {
  return (
              <div
                className="tab-pane fade"
                id="pills-contact"
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
