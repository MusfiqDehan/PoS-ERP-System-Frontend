import type { DropResult } from "@hello-pangea/dnd";
import type { Dispatch, SetStateAction } from "react";
import type { ProjectColumns } from "./projectData";

export function createOnDragEnd(
  columns: ProjectColumns,
  setColumns: Dispatch<SetStateAction<ProjectColumns>>
) {
  return (result: DropResult) => {
    const { source, destination } = result as {
      source: { droppableId: keyof typeof columns; index: number };
      destination?: { droppableId: keyof typeof columns; index: number };
    };

    if (!destination) return;

    const sourceColumn = columns[source.droppableId];
    const destinationColumn = columns[destination.droppableId];
    const sourceTasks = [...sourceColumn.tasks];
    const destinationTasks = [...destinationColumn.tasks];
    const [movedTask] = sourceTasks.splice(source.index, 1);

    destinationTasks.splice(destination.index, 0, movedTask);

    setColumns({
      ...columns,
      [source.droppableId]: { ...sourceColumn, tasks: sourceTasks },
      [destination.droppableId]: {
        ...destinationColumn,
        tasks: destinationTasks,
      },
    });
  };
}

export function getModalContainer() {
  const modalElement = document.getElementById("modal-datepicker");
  return modalElement ? modalElement : document.body;
}
