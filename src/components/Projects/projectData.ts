export type ProjectTask = {
  id: string;
  content: string;
  priority: string;
};

export type ProjectColumn = {
  title: string;
  tasks: ProjectTask[];
};

export type ProjectColumns = Record<string, ProjectColumn>;

export const initialColumns: ProjectColumns = {
  column1: {
    title: "New",
    tasks: [
      { id: "task1", content: "Task 1", priority: "Low" },
      { id: "task2", content: "Task 2", priority: "Medium" },
    ],
  },
  column2: {
    title: "Inprogress",
    tasks: [
      { id: "task3", content: "Task 3", priority: "High" },
      { id: "task4", content: "Task 4", priority: "Medium" },
      { id: "task5", content: "Task 5", priority: "High" },
    ],
  },
  column3: {
    title: "On-hold",
    tasks: [
      { id: "task6", content: "Task 5", priority: "Low" },
      { id: "task7", content: "Task 6", priority: "Low" },
    ],
  },
};

export const initialColumnsHigh: ProjectColumns = {
  column1: {
    title: "New",
    tasks: [
      { id: "task8", content: "Task 1", priority: "High" },
      { id: "task2", content: "Task 2", priority: "High" },
    ],
  },
  column2: {
    title: "Inprogress",
    tasks: [
      { id: "task9", content: "Task 3", priority: "High" },
      { id: "task10", content: "Task 4", priority: "High" },
    ],
  },
  column3: {
    title: "On-hold",
    tasks: [{ id: "task12", content: "Task 5", priority: "High" }],
  },
};

export const initialColumnsMedium: ProjectColumns = {
  column1: {
    title: "New",
    tasks: [{ id: "task14", content: "Task 1", priority: "Medium" }],
  },
  column2: {
    title: "Inprogress",
    tasks: [
      { id: "task16", content: "Task 3", priority: "Medium" },
      { id: "task17", content: "Task 4", priority: "Medium" },
      { id: "task11", content: "Task 5", priority: "Medium" },
    ],
  },
  column3: {
    title: "On-hold",
    tasks: [{ id: "task18", content: "Task 5", priority: "Medium" }],
  },
};

export const initialColumnsLow: ProjectColumns = {
  column1: {
    title: "New",
    tasks: [
      { id: "task20", content: "Task 1", priority: "Low" },
      { id: "task21", content: "Task 2", priority: "Low" },
    ],
  },
  column2: {
    title: "Inprogress",
    tasks: [
      { id: "task22", content: "Task 3", priority: "Low" },
      { id: "task23", content: "Task 4", priority: "Low" },
    ],
  },
  column3: {
    title: "On-hold",
    tasks: [{ id: "task25", content: "Task 5", priority: "Low" }],
  },
};
