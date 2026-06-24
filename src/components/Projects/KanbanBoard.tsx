"use client";

import { DragDropContext, type DropResult } from "@hello-pangea/dnd";
import type { ProjectColumns } from "./projectData";
import KanbanColumn from "./KanbanColumn";

type KanbanBoardProps = {
  columns: ProjectColumns;
  onDragEnd: (result: DropResult) => void;
};

export default function KanbanBoard({ columns, onDragEnd }: KanbanBoardProps) {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex items-start gap-4 overflow-x-auto pb-4">
        {Object.entries(columns).map(([columnId, column]) => (
          <KanbanColumn key={columnId} columnId={columnId} column={column} />
        ))}
      </div>
    </DragDropContext>
  );
}
