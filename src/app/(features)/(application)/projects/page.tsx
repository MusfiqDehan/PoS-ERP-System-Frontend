"use client";

import { useMemo, useState } from "react";
import AllProjectsTab from "@/components/Projects/AllProjectsTab";
import HighPriorityTab from "@/components/Projects/HighPriorityTab";
import LowPriorityTab from "@/components/Projects/LowPriorityTab";
import MediumPriorityTab from "@/components/Projects/MediumPriorityTab";
import PageHeader from "@/components/Projects/PageHeader";
import ProjectsCardHeader from "@/components/Projects/ProjectsCardHeader";
import ProjectsFilters from "@/components/Projects/ProjectsFilters";
import { createOnDragEnd } from "@/components/Projects/kanbanUtils";
import {
  initialColumns,
  initialColumnsHigh,
  initialColumnsLow,
  initialColumnsMedium,
} from "@/components/Projects/projectData";

export default function Projects() {
  const [columns, setColumns] = useState(initialColumns);
  const [columnsHigh, setColumnsHigh] = useState(initialColumnsHigh);
  const [columnsMedium, setColumnsMedium] = useState(initialColumnsMedium);
  const [columnsLow, setColumnsLow] = useState(initialColumnsLow);

  const onDragEndAll = useMemo(
    () => createOnDragEnd(columns, setColumns),
    [columns]
  );
  const onDragEndHigh = useMemo(
    () => createOnDragEnd(columnsHigh, setColumnsHigh),
    [columnsHigh]
  );
  const onDragEndMedium = useMemo(
    () => createOnDragEnd(columnsMedium, setColumnsMedium),
    [columnsMedium]
  );
  const onDragEndLow = useMemo(
    () => createOnDragEnd(columnsLow, setColumnsLow),
    [columnsLow]
  );

  return (
    <div className="page-wrapper">
      <div className="content">
        <PageHeader />
        <div className="card">
          <ProjectsCardHeader />
          <div className="card-body">
            <ProjectsFilters />
            <div className="tab-content" id="pills-tabContent">
              <AllProjectsTab columns={columns} onDragEnd={onDragEndAll} />
              <HighPriorityTab columns={columnsHigh} onDragEnd={onDragEndHigh} />
              <MediumPriorityTab
                columns={columnsMedium}
                onDragEnd={onDragEndMedium}
              />
              <LowPriorityTab columns={columnsLow} onDragEnd={onDragEndLow} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
